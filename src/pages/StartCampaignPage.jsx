import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCampaign, hasSupabaseConfig } from "../lib/supabase";

function StartCampaignPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    organizer: "",
    contactEmail: "",
    cities: "",
    plasticCollected: "",
    joinedPeople: "",
    socialFollowers: "",
    nextDrive: "",
    description: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasSupabaseConfig) {
      setStatus("Add your Supabase project settings before campaigns can be created globally.");
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
        social_followers: Number(formState.socialFollowers) || 0,
        next_drive: formState.nextDrive,
        description: formState.description,
      });

      navigate("/campaigns");
    } catch (error) {
      setStatus(error.message || "Could not create the campaign. Please try again.");
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

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "28px",
          border: "1px solid #eee",
          boxShadow: "0 16px 34px rgba(0, 0, 0, 0.08)",
        }}
      >
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
              required
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span>Social media followers</span>
            <input
              type="number"
              min="0"
              name="socialFollowers"
              value={formState.socialFollowers}
              onChange={handleChange}
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
            rows="6"
            required
            placeholder="Explain what the campaign is doing, who it is for, and why people should join."
            style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc", resize: "vertical" }}
          />
        </label>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            type="submit"
            style={{
              border: "none",
              borderRadius: "999px",
              background: "#8b0000",
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
              border: "1px solid #d8b7aa",
              borderRadius: "999px",
              background: "#fff7f4",
              color: "#8b0000",
              padding: "12px 22px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Back to Campaigns
          </button>
        </div>
        {status ? (
          <p style={{ marginTop: "16px", color: "#8b0000", fontWeight: "600" }}>{status}</p>
        ) : null}
      </form>
    </div>
  );
}

export default StartCampaignPage;
