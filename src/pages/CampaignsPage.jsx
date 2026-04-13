import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchCampaigns,
  fetchUserCampaignMemberships,
  hasSupabaseConfig,
  joinCampaign,
  leaveCampaign,
  syncUserActiveCampaignCount,
  syncUserPlasticCollectedTotal,
  updateCampaign,
  updateCampaignMembership,
} from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

function parsePlasticCollected(value) {
  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  const normalized = String(value).replace(/,/g, "");
  const match = normalized.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function formatPlasticCollected(value) {
  const normalizedValue = Number.isFinite(value) ? value : 0;
  return `${normalizedValue.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })} kg`;
}

function CampaignsPage() {
  const { user, session } = useAuth();
  const isAuthenticated = Boolean(user?.id && session?.access_token);
  const [campaigns, setCampaigns] = useState([]);
  const [status, setStatus] = useState("");
  const [joinedCampaignIds, setJoinedCampaignIds] = useState([]);
  const [membershipsByCampaignId, setMembershipsByCampaignId] = useState({});
  const [contributionInputs, setContributionInputs] = useState({});
  const [joiningCampaignId, setJoiningCampaignId] = useState("");
  const [removingCampaignId, setRemovingCampaignId] = useState("");
  const [savingContributionId, setSavingContributionId] = useState("");
  const [userContributionTotal, setUserContributionTotal] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadCampaigns() {
      if (!hasSupabaseConfig) {
        setStatus("Supabase is not configured yet, so placeholder campaigns are being shown.");
        return;
      }

      try {
        const [campaignRows, membershipRows] = await Promise.all([
          fetchCampaigns(),
          user?.id && session?.access_token
            ? fetchUserCampaignMemberships(user.id, session.access_token)
            : Promise.resolve([]),
        ]);

        if (!ignore) {
          setCampaigns(campaignRows);
          setJoinedCampaignIds(membershipRows.map((membership) => String(membership.campaign_id)));
          setMembershipsByCampaignId(
            Object.fromEntries(membershipRows.map((membership) => [String(membership.campaign_id), membership]))
          );
          setContributionInputs(
            Object.fromEntries(
              membershipRows.map((membership) => [
                String(membership.campaign_id),
                String(membership.contribution_kg ?? ""),
              ])
            )
          );
          setUserContributionTotal(
            membershipRows.reduce((sum, membership) => sum + (Number(membership.contribution_kg) || 0), 0)
          );
          setStatus("");
        }
      } catch (error) {
        if (!ignore) {
          setStatus(error.message || "Could not load live campaigns right now.");
        }
      }
    }

    loadCampaigns();

    return () => {
      ignore = true;
    };
  }, [session?.access_token, user?.id]);

  const visibleCampaigns = campaigns;
  const activeCampaignsForUser = campaigns.filter((campaign) => {
    const campaignId = String(campaign.id);
    const ownedByUser = campaign.owner_user_id === user?.id && campaign.is_active !== false;
    const joinedByUser = joinedCampaignIds.includes(campaignId);
    return ownedByUser || joinedByUser;
  });

  const handleJoinCampaign = async (campaign) => {
    const campaignId = String(campaign.id);

    if (!user?.id || !session?.access_token) {
      setStatus("Please sign in again to join campaigns.");
      return;
    }

    if (joinedCampaignIds.includes(campaignId)) {
      setStatus("This campaign is already in your active campaigns.");
      return;
    }

    setJoiningCampaignId(campaignId);
    setStatus("");

    try {
      const createdMembership = await joinCampaign(
        {
          user_id: user.id,
          campaign_id: campaignId,
        },
        session.access_token
      );

      const updatedCampaign = await updateCampaign(
        {
          id: campaign.id,
          joined_people: Math.max(0, Number(campaign.joined_people ?? campaign.joinedPeople ?? 0) + 1),
        },
        session.access_token
      );

      await syncUserActiveCampaignCount(user.id, session.access_token, {
        email: user.email || null,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      });
      const totalResult = await syncUserPlasticCollectedTotal(user.id, session.access_token, {
        email: user.email || null,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      });

      setJoinedCampaignIds((current) => [...current, campaignId]);
      setMembershipsByCampaignId((current) => ({
        ...current,
        [campaignId]: createdMembership || {
          ...(current[campaignId] || {}),
          campaign_id: campaign.id,
          contribution_kg: 0,
        },
      }));
      setContributionInputs((current) => ({
        ...current,
        [campaignId]: "0",
      }));
      setUserContributionTotal(totalResult.total);
      if (updatedCampaign) {
        setCampaigns((current) =>
          current.map((currentCampaign) =>
            String(currentCampaign.id) === campaignId ? { ...currentCampaign, ...updatedCampaign } : currentCampaign
          )
        );
      }
    } catch (error) {
      setStatus(error.message || "Could not join this campaign right now.");
    } finally {
      setJoiningCampaignId("");
    }
  };

  const handleRemoveCampaign = async (campaign) => {
    const campaignId = String(campaign.id);

    if (!user?.id || !session?.access_token) {
      setStatus("Please sign in again to manage your campaigns.");
      return;
    }

    if (!joinedCampaignIds.includes(campaignId)) {
      setStatus("This campaign is not currently linked to your account.");
      return;
    }

    setRemovingCampaignId(campaignId);
    setStatus("");

    try {
      const existingContribution = Number(membershipsByCampaignId[campaignId]?.contribution_kg) || 0;
      await leaveCampaign(user.id, campaignId, session.access_token);

      const updatedCampaign = await updateCampaign(
        {
          id: campaign.id,
          joined_people: Math.max(0, Number(campaign.joined_people ?? campaign.joinedPeople ?? 0) - 1),
          plastic_collected: formatPlasticCollected(
            Math.max(
              0,
              parsePlasticCollected(campaign.plastic_collected || campaign.plasticCollected) - existingContribution
            )
          ),
        },
        session.access_token
      );

      await syncUserActiveCampaignCount(user.id, session.access_token, {
        email: user.email || null,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      });
      const totalResult = await syncUserPlasticCollectedTotal(user.id, session.access_token, {
        email: user.email || null,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      });

      setJoinedCampaignIds((current) => current.filter((id) => id !== campaignId));
      setMembershipsByCampaignId((current) => {
        const next = { ...current };
        delete next[campaignId];
        return next;
      });
      setContributionInputs((current) => {
        const next = { ...current };
        delete next[campaignId];
        return next;
      });
      setUserContributionTotal(totalResult.total);
      if (updatedCampaign) {
        setCampaigns((current) =>
          current.map((currentCampaign) =>
            String(currentCampaign.id) === campaignId ? { ...currentCampaign, ...updatedCampaign } : currentCampaign
          )
        );
      }
    } catch (error) {
      setStatus(error.message || "Could not remove this campaign right now.");
    } finally {
      setRemovingCampaignId("");
    }
  };

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "40px 20px 120px" }}>
      <div style={{ marginBottom: "28px", textAlign: "center" }}>
        <h1 style={{ color: "#1f2d3d", marginBottom: "12px" }}>Start or Join a Plastic Campaign</h1>
        <p style={{ maxWidth: "820px", margin: "0 auto", color: "#555", lineHeight: "1.7" }}>
          Explore active campaigns, compare where they operate, and see how much plastic each effort
          has already recovered. If none of them feel right for you, you can launch your own from
          the section below.
        </p>
      </div>

      <section
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "24px",
          border: "1px solid #e4efe7",
          boxShadow: "0 16px 32px rgba(20, 108, 67, 0.08)",
          marginBottom: "28px",
        }}
      >
        <h2 style={{ color: "#1f2d3d", marginBottom: "10px" }}>Your Active Campaigns</h2>
        <p style={{ color: "#666", lineHeight: "1.7", marginBottom: "16px" }}>
          {isAuthenticated
            ? "These are the campaigns currently linked to your account."
            : "Sign in to view the campaigns linked to your account."}
        </p>
        {isAuthenticated ? (
          <p style={{ color: "#146c43", lineHeight: "1.7", marginBottom: "16px", fontWeight: "600" }}>
            Your total collected contribution: {formatPlasticCollected(userContributionTotal)}
          </p>
        ) : null}

        {isAuthenticated && activeCampaignsForUser.length > 0 ? (
          <div style={{ display: "grid", gap: "12px" }}>
            {activeCampaignsForUser.map((campaign) => (
              <div
                key={`active-${campaign.id}`}
                style={{
                  background: "#f4fbf6",
                  borderRadius: "16px",
                  padding: "16px",
                  border: "1px solid #d7eadc",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <strong style={{ display: "block", color: "#146c43", marginBottom: "6px" }}>
                      {campaign.name}
                    </strong>
                    <span style={{ color: "#555" }}>
                      {campaign.cities.join(", ")} | {campaign.plastic_collected || campaign.plasticCollected}
                    </span>
                    {campaign.owner_user_id === user?.id ? null : (
                      <div
                        style={{
                          marginTop: "12px",
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          alignItems: "end",
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            color: "#146c43",
                            fontWeight: "600",
                          }}
                        >
                          <span>My contribution (in kgs)</span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={contributionInputs[String(campaign.id)] ?? ""}
                            onChange={(event) =>
                              setContributionInputs((current) => ({
                                ...current,
                                [String(campaign.id)]: event.target.value,
                              }))
                            }
                            style={{
                              padding: "10px 12px",
                              borderRadius: "10px",
                              border: "1px solid #cfe3d5",
                              minWidth: "180px",
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={async () => {
                            const campaignId = String(campaign.id);
                            const membership = membershipsByCampaignId[campaignId];

                            if (!membership || !user?.id || !session?.access_token) {
                              setStatus("Please sign in again to save your contribution.");
                              return;
                            }

                            const nextContribution = Number(contributionInputs[campaignId]);

                            if (Number.isNaN(nextContribution) || nextContribution < 0) {
                              setStatus("Enter a valid non-negative contribution amount.");
                              return;
                            }

                            const previousContribution = Number(membership.contribution_kg) || 0;
                            const delta = nextContribution - previousContribution;

                            setSavingContributionId(campaignId);
                            setStatus("");

                            try {
                              const updatedMembership = await updateCampaignMembership(
                                membership.id,
                                { contribution_kg: nextContribution },
                                session.access_token
                              );

                              const updatedCampaign = await updateCampaign(
                                {
                                  id: campaign.id,
                                  plastic_collected: formatPlasticCollected(
                                    Math.max(
                                      0,
                                      parsePlasticCollected(
                                        campaign.plastic_collected || campaign.plasticCollected
                                      ) + delta
                                    )
                                  ),
                                },
                                session.access_token
                              );

                              const totalResult = await syncUserPlasticCollectedTotal(
                                user.id,
                                session.access_token,
                                {
                                  email: user.email || null,
                                  full_name:
                                    user.user_metadata?.full_name || user.user_metadata?.name || null,
                                }
                              );

                              if (updatedMembership) {
                                setMembershipsByCampaignId((current) => ({
                                  ...current,
                                  [campaignId]: updatedMembership,
                                }));
                              }

                              if (updatedCampaign) {
                                setCampaigns((current) =>
                                  current.map((currentCampaign) =>
                                    String(currentCampaign.id) === campaignId
                                      ? { ...currentCampaign, ...updatedCampaign }
                                      : currentCampaign
                                  )
                                );
                              }

                              setUserContributionTotal(totalResult.total);
                            } catch (error) {
                              setStatus(error.message || "Could not save your contribution right now.");
                            } finally {
                              setSavingContributionId("");
                            }
                          }}
                          disabled={savingContributionId === String(campaign.id)}
                          style={{
                            border: "none",
                            borderRadius: "999px",
                            background: "#146c43",
                            color: "#fff",
                            padding: "10px 18px",
                            fontWeight: "700",
                            cursor: savingContributionId === String(campaign.id) ? "default" : "pointer",
                            opacity: savingContributionId === String(campaign.id) ? 0.75 : 1,
                          }}
                        >
                          {savingContributionId === String(campaign.id) ? "Saving..." : "Save"}
                        </button>
                      </div>
                    )}
                  </div>
                  {campaign.owner_user_id === user?.id ? (
                    <span style={{ color: "#146c43", fontWeight: "700" }}>Owner</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRemoveCampaign(campaign)}
                      disabled={removingCampaignId === String(campaign.id)}
                      style={{
                        border: "1px solid #cfe3d5",
                        borderRadius: "999px",
                        background: "#fff",
                        color: "#146c43",
                        padding: "8px 16px",
                        fontWeight: "700",
                        cursor: removingCampaignId === String(campaign.id) ? "default" : "pointer",
                        opacity: removingCampaignId === String(campaign.id) ? 0.75 : 1,
                      }}
                    >
                      {removingCampaignId === String(campaign.id) ? "Removing..." : "Remove"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, color: "#666" }}>
            {isAuthenticated
              ? "You do not have any active campaigns yet. Start one below and it will appear here."
              : "No campaign list is shown here until you sign in."}
          </p>
        )}
      </section>

      <div style={{ display: "grid", gap: "18px", marginBottom: "42px" }}>
        {status ? (
          <p style={{ margin: 0, color: "#8b0000", fontWeight: "600" }}>{status}</p>
        ) : null}
        {visibleCampaigns.length > 0 ? visibleCampaigns.map((campaign) => {
          const campaignId = String(campaign.id);
          const isJoined = joinedCampaignIds.includes(campaignId);
          const isOwned = campaign.owner_user_id === user?.id && campaign.is_active !== false;
          const isRemoving = removingCampaignId === campaignId;
          const buttonLabel = isOwned
            ? "Your Campaign"
            : isJoined
              ? "Joined"
              : "Join Campaign";

          return (
          <article
            key={campaignId}
            style={{
              background: "#fff",
              borderRadius: "22px",
              padding: "24px",
              border: "1px solid #eee",
              boxShadow: "0 16px 32px rgba(0, 0, 0, 0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2 style={{ color: "#146c43", marginBottom: "8px" }}>{campaign.name}</h2>
                <p style={{ margin: 0, color: "#666" }}>Organized by {campaign.organizer}</p>
              </div>
              <button
                type="button"
                onClick={() => handleJoinCampaign(campaign)}
                disabled={isJoined || isOwned || isRemoving || joiningCampaignId === campaignId}
                style={{
                  border: "none",
                  borderRadius: "999px",
                  background: isJoined || isOwned ? "#9bcdae" : "#146c43",
                  color: "#fff",
                  padding: "10px 18px",
                  fontWeight: "700",
                  cursor: isJoined || isOwned || joiningCampaignId === campaignId ? "default" : "pointer",
                  opacity: joiningCampaignId === campaignId ? 0.75 : 1,
                }}
              >
                {joiningCampaignId === campaignId ? "Joining..." : buttonLabel}
              </button>
              {isJoined && !isOwned ? (
                <button
                  type="button"
                  onClick={() => handleRemoveCampaign(campaign)}
                  disabled={isRemoving || joiningCampaignId === campaignId}
                  style={{
                    border: "1px solid #cfe3d5",
                    borderRadius: "999px",
                    background: "#fff",
                    color: "#146c43",
                    padding: "10px 18px",
                    fontWeight: "700",
                    cursor: isRemoving || joiningCampaignId === campaignId ? "default" : "pointer",
                    opacity: isRemoving ? 0.75 : 1,
                  }}
                >
                  {isRemoving ? "Removing..." : "Remove"}
                </button>
              ) : null}
            </div>

            <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "18px" }}>{campaign.description}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "14px",
              }}
            >
              <div style={{ background: "#f4fbf6", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#146c43", marginBottom: "6px" }}>Cities</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.cities.join(", ")}</span>
              </div>
              <div style={{ background: "#f4fbf6", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#146c43", marginBottom: "6px" }}>Plastic Collected</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.plastic_collected || campaign.plasticCollected}</span>
              </div>
              <div style={{ background: "#f4fbf6", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#146c43", marginBottom: "6px" }}>People Joined</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.joined_people ?? campaign.joinedPeople}</span>
              </div>
              <div style={{ background: "#f4fbf6", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#146c43", marginBottom: "6px" }}>Next Drive</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.next_drive || campaign.nextDrive}</span>
              </div>
            </div>
          </article>
          );
        }) : (
          <div
            style={{
              background: "#fff",
              borderRadius: "22px",
              padding: "24px",
              border: "1px solid #eee",
              boxShadow: "0 16px 32px rgba(0, 0, 0, 0.07)",
              color: "#666",
              lineHeight: "1.7",
            }}
          >
            No live campaigns are available yet. Add campaigns in Supabase or create one from this app
            to make the list appear here.
          </div>
        )}
      </div>

      <section
        style={{
          background: "linear-gradient(135deg, #eefaf1 0%, #fff 100%)",
          borderRadius: "24px",
          padding: "28px",
          border: "1px solid #d9ecdf",
          boxShadow: "0 16px 32px rgba(20, 108, 67, 0.08)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#1f2d3d", marginBottom: "10px" }}>Looking to Start a Campaign?</h2>
        <p style={{ maxWidth: "760px", margin: "0 auto 20px", color: "#5b5b5b", lineHeight: "1.7" }}>
          If you scrolled through the list and still did not find the campaign you want, start your
          own here. Add the key details and it will appear back on this campaign page.
        </p>
        <Link
          to="/campaigns/start"
          style={{
            display: "inline-block",
            textDecoration: "none",
            background: "#146c43",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "999px",
            fontWeight: "700",
          }}
        >
          Start a Campaign
        </Link>
      </section>
    </div>
  );
}

export default CampaignsPage;
