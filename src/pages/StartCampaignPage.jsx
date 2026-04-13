import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCampaign,
  hasSupabaseConfig,
  syncUserActiveCampaignCount,
} from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

function StartCampaignPage() {
  const navigate = useNavigate();
  const { user, session, loading } = useAuth();
  const [formState, setFormState] = useState({
    name: "",
    organizer: "",
    contactEmail: "",
    cities: "",
    plasticCollected: "",
    joinedPeople: "",
    nextDrive: "",
    description: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeCampaignCount, setActiveCampaignCount] = useState(0);
  const [isSyncingCount, setIsSyncingCount] = useState(false);
  const isAuthenticated = Boolean(user?.id && session?.access_token);

  useEffect(() => {
    if (!isAuthenticated) {
      setActiveCampaignCount(0);
      setIsSyncingCount(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let ignore = false;

    async function loadActiveCampaignCount() {
      if (!isAuthenticated || !hasSupabaseConfig) {
        if (!ignore) {
          setActiveCampaignCount(0);
          setIsSyncingCount(false);
        }
        return;
      }

      if (!ignore) {
        setIsSyncingCount(true);
      }

      try {
        const { count } = await syncUserActiveCampaignCount(user.id, session.access_token, {
          email: user.email || null,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        });

        if (!ignore) {
          setActiveCampaignCount(count);
        }
      } catch {
        if (!ignore) {
          setStatus("We could not sync your active campaign count right now.");
        }
      } finally {
        if (!ignore) {
          setIsSyncingCount(false);
        }
      }
    }

    loadActiveCampaignCount();

    return () => {
      ignore = true;
    };
  }, [isAuthenticated, session?.access_token, user?.email, user?.id, user?.user_metadata]);

  const requestIdentityConfirmation = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setStatus("Please confirm your identity to use campaign tools.");
      return true;
    }

    return false;
  };

  const handleChange = (event) => {
    if (requestIdentityConfirmation()) {
      return;
    }

    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (requestIdentityConfirmation()) {
      return;
    }

    if (!hasSupabaseConfig) {
      setStatus("Add your Supabase project settings before campaigns can be created globally.");
      return;
    }

    if (!user?.id || !session?.access_token) {
      setStatus("Please sign in again before creating a campaign.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      await createCampaign({
        name: formState.name,
        organizer: formState.organizer,
        contact_email: formState.contactEmail,
        cities: formState.cities.split(",").map((city) => city.trim()).filter(Boolean),
        plastic_collected: formState.plasticCollected,
        joined_people: Number(formState.joinedPeople) || 0,
        next_drive: formState.nextDrive,
        description: formState.description,
        owner_user_id: user.id,
        is_active: true,
      }, session.access_token);

      const { count } = await syncUserActiveCampaignCount(user.id, session.access_token, {
        email: user.email || null,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      });
      setActiveCampaignCount(count);

      navigate("/campaigns");
    } catch (error) {
      setStatus(
        error.message ||
          "Could not create the campaign. Please check the Supabase campaign insert policy and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "920px", margin: "0 auto", padding: "40px 20px 120px" }}>
      <div style={{ textAlign: "center", marginBottom: "26px" }}>
        <h1 style={{ color: "#1f2d3d", marginBottom: "12px" }}>Start a Plastic Campaign</h1>
        <p style={{ color: "#5b5b5b", lineHeight: "1.7", maxWidth: "760px", margin: "0 auto" }}>
          Add the essential campaign details below. After submission, your campaign will appear on
          the campaign listing page in this browser so people can discover and join it.
        </p>
      </div>

      <section
        style={{
          background: "linear-gradient(135deg, #eefaf1 0%, #ffffff 100%)",
          borderRadius: "24px",
          padding: "24px",
          border: "1px solid #d9ecdf",
          boxShadow: "0 16px 32px rgba(20, 108, 67, 0.08)",
          marginBottom: "22px",
        }}
      >
        <h2 style={{ color: "#1f2d3d", marginBottom: "10px" }}>Your active campaign count</h2>
        <p style={{ margin: 0, color: "#5b5b5b", lineHeight: "1.7" }}>
          {loading
            ? "Checking your account..."
            : isAuthenticated
              ? isSyncingCount
                ? "Syncing your active campaign count..."
                : `You currently have ${activeCampaignCount} active campaign${activeCampaignCount === 1 ? "" : "s"} linked to your profile.`
              : "Sign in to see your active campaign count."}
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        onFocusCapture={() => {
          requestIdentityConfirmation();
        }}
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "28px",
          border: "1px solid #eee",
          boxShadow: "0 16px 34px rgba(0, 0, 0, 0.08)",
        }}
      >
        {!isAuthenticated ? (
          <div
            style={{
              background: "#f4fbf6",
              border: "1px solid #d7eadc",
              color: "#146c43",
              borderRadius: "16px",
              padding: "14px 16px",
              marginBottom: "18px",
              lineHeight: "1.7",
            }}
          >
            You can view this page freely. The moment you try to type or submit the form, a sign-in
            window will open so we can connect the campaign to your account.
          </div>
        ) : null}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Campaign name</span>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              onClick={() => requestIdentityConfirmation()}
              required
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Organizer name</span>
            <input
              type="text"
              name="organizer"
              value={formState.organizer}
              onChange={handleChange}
              onClick={() => requestIdentityConfirmation()}
              required
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Contact email</span>
            <input
              type="email"
              name="contactEmail"
              value={formState.contactEmail}
              onChange={handleChange}
              onClick={() => requestIdentityConfirmation()}
              required
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Cities</span>
            <input
              type="text"
              name="cities"
              value={formState.cities}
              onChange={handleChange}
              onClick={() => requestIdentityConfirmation()}
              required
              placeholder="Delhi, Noida, Gurugram"
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Plastic already collected</span>
            <input
              type="text"
              name="plasticCollected"
              value={formState.plasticCollected}
              onChange={handleChange}
              onClick={() => requestIdentityConfirmation()}
              required
              placeholder="250 kg"
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>People already joined</span>
            <input
              type="number"
              min="0"
              name="joinedPeople"
              value={formState.joinedPeople}
              onChange={handleChange}
              onClick={() => requestIdentityConfirmation()}
              required
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Next drive date or time</span>
            <input
              type="text"
              name="nextDrive"
              value={formState.nextDrive}
              onChange={handleChange}
              onClick={() => requestIdentityConfirmation()}
              required
              placeholder="Sunday, 28 April"
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          <span>Campaign description</span>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            onClick={() => requestIdentityConfirmation()}
            rows="6"
            required
            placeholder="Explain what the campaign is doing, who it is for, and why people should join."
            style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc", resize: "vertical" }}
          />
        </label>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="submit"
            onClick={() => requestIdentityConfirmation()}
            style={{
              border: "none",
              borderRadius: "999px",
              background: "#146c43",
              color: "#fff",
              padding: "12px 22px",
              fontWeight: "700",
              cursor: isSubmitting ? "wait" : "pointer",
              opacity: isSubmitting ? 0.8 : 1,
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/campaigns")}
            style={{
              border: "1px solid #cfe3d5",
              borderRadius: "999px",
              background: "#f4fbf6",
              color: "#146c43",
              padding: "12px 22px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Back to Campaigns
          </button>
        </div>
        {status ? (
          <p style={{ marginTop: "16px", color: "#146c43", fontWeight: "600" }}>{status}</p>
        ) : null}
      </form>

      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          setStatus("Identity confirmed. You can now use the campaign form.");
        }}
      />
    </div>
  );
}

export default StartCampaignPage;
