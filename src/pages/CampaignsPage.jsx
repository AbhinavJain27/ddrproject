import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCampaigns, hasSupabaseConfig } from "../lib/supabase";

const fallbackCampaigns = [
  {
    id: "campaign-1",
    name: "Delhi Riverfront Cleanup",
    organizer: "Green Delhi Circle",
    contact_email: "",
    cities: ["New Delhi", "Noida", "Ghaziabad"],
    plastic_collected: "1,420 kg",
    joined_people: 186,
    social_followers: 3400,
    next_drive: "Sunday, 14 April",
    description:
      "A recurring cleanup and awareness campaign focused on riverbanks, neighborhood drains, and public parks across NCR.",
  },
  {
    id: "campaign-2",
    name: "Mumbai Beach Plastic Drive",
    organizer: "Coastline Collective",
    contact_email: "",
    cities: ["Mumbai", "Navi Mumbai"],
    plastic_collected: "2,110 kg",
    joined_people: 254,
    social_followers: 5100,
    next_drive: "Saturday, 20 April",
    description:
      "Weekend drives focused on beach litter removal, segregation awareness, and sorting collected plastic for recycling partners.",
  },
  {
    id: "campaign-3",
    name: "Bengaluru Campus Reuse Week",
    organizer: "Circular Campus Network",
    contact_email: "",
    cities: ["Bengaluru"],
    plastic_collected: "860 kg",
    joined_people: 119,
    social_followers: 2200,
    next_drive: "Friday, 19 April",
    description:
      "A city-campus collaboration that mixes cleanup events, reusable alternatives, and volunteer-led awareness workshops.",
  },
];

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadCampaigns() {
      if (!hasSupabaseConfig) {
        setStatus("Supabase is not configured yet, so placeholder campaigns are being shown.");
        return;
      }

      try {
        const rows = await fetchCampaigns();
        if (!ignore) {
          setCampaigns(rows);
          setStatus("");
        }
      } catch {
        if (!ignore) {
          setStatus("Could not load live campaigns right now, so placeholder campaigns are being shown.");
        }
      }
    }

    loadCampaigns();

    return () => {
      ignore = true;
    };
  }, []);

  const visibleCampaigns = [...fallbackCampaigns, ...campaigns];

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

      <div style={{ display: "grid", gap: "18px", marginBottom: "42px" }}>
        {status ? (
          <p style={{ margin: 0, color: "#8b0000", fontWeight: "600" }}>{status}</p>
        ) : null}
        {visibleCampaigns.map((campaign) => (
          <article
            key={campaign.id}
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
                <h2 style={{ color: "#8b0000", marginBottom: "8px" }}>{campaign.name}</h2>
                <p style={{ margin: 0, color: "#666" }}>Organized by {campaign.organizer}</p>
              </div>
              <button
                type="button"
                style={{
                  border: "none",
                  borderRadius: "999px",
                  background: "#8b0000",
                  color: "#fff",
                  padding: "10px 18px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Join Campaign
              </button>
            </div>

            <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "18px" }}>{campaign.description}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "14px",
              }}
            >
              <div style={{ background: "#fff7f4", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#8b0000", marginBottom: "6px" }}>Cities</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.cities.join(", ")}</span>
              </div>
              <div style={{ background: "#fff7f4", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#8b0000", marginBottom: "6px" }}>Plastic Collected</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.plastic_collected || campaign.plasticCollected}</span>
              </div>
              <div style={{ background: "#fff7f4", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#8b0000", marginBottom: "6px" }}>People Joined</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.joined_people ?? campaign.joinedPeople}</span>
              </div>
              <div style={{ background: "#fff7f4", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#8b0000", marginBottom: "6px" }}>Social Followers</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.social_followers ?? campaign.socialFollowers}</span>
              </div>
              <div style={{ background: "#fff7f4", borderRadius: "16px", padding: "14px" }}>
                <strong style={{ display: "block", color: "#8b0000", marginBottom: "6px" }}>Next Drive</strong>
                <span style={{ color: "#4a4a4a" }}>{campaign.next_drive || campaign.nextDrive}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section
        style={{
          background: "linear-gradient(135deg, #fff6ef 0%, #fff 100%)",
          borderRadius: "24px",
          padding: "28px",
          border: "1px solid #f2ddd2",
          boxShadow: "0 16px 32px rgba(139, 0, 0, 0.08)",
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
            background: "#8b0000",
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
