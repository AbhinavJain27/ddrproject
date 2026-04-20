import React, { useEffect, useState } from "react";
import {
  createPickupRequest,
  fetchPickupRequests,
  hasSupabaseConfig,
  updatePickupRequest,
  uploadPickupPhoto,
} from "../lib/supabase";
import ImagePreviewModal from "../components/ImagePreviewModal";

const RAGMAN_ACCEPTED_KEY = "ragman-accepted-ids";

function getMyAcceptedIds() {
  try {
    return JSON.parse(localStorage.getItem(RAGMAN_ACCEPTED_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveMyAcceptedId(id) {
  const ids = getMyAcceptedIds();
  if (!ids.includes(id)) {
    localStorage.setItem(RAGMAN_ACCEPTED_KEY, JSON.stringify([...ids, id]));
  }
}

const STATUS_STYLES = {
  pending: { background: "#fff8e1", color: "#b45309", border: "1px solid #fde68a" },
  accepted: { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
  collected: { background: "#ecfdf5", color: "#065f46", border: "1px solid #6ee7b7" },
};

const STATUS_LABELS = {
  pending: "Awaiting Pickup",
  accepted: "Ragman Assigned",
  collected: "Collected",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span
      style={{
        ...style,
        borderRadius: "999px",
        padding: "4px 12px",
        fontSize: "0.78rem",
        fontWeight: "700",
        letterSpacing: "0.3px",
        display: "inline-block",
      }}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: "12px",
        padding: "12px 28px",
        fontWeight: "700",
        fontSize: "1rem",
        cursor: "pointer",
        background: active ? "#146c43" : "transparent",
        color: active ? "#fff" : "#146c43",
        transition: "all 0.2s ease",
        boxShadow: active ? "0 4px 14px rgba(20,108,67,0.22)" : "none",
      }}
    >
      {label}
    </button>
  );
}

function FilterButton({ label, active, count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active ? "2px solid #146c43" : "2px solid #e0e0e0",
        borderRadius: "999px",
        padding: "7px 18px",
        fontWeight: "600",
        fontSize: "0.88rem",
        cursor: "pointer",
        background: active ? "#eefaf1" : "#fff",
        color: active ? "#146c43" : "#555",
        transition: "all 0.15s ease",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            background: active ? "#146c43" : "#e0e0e0",
            color: active ? "#fff" : "#666",
            borderRadius: "999px",
            padding: "1px 8px",
            fontSize: "0.78rem",
            fontWeight: "700",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function RequestCard({ request, onImageClick }) {
  const date = new Date(request.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      style={{
        minWidth: "300px",
        maxWidth: "300px",
        background: "#fff",
        borderRadius: "18px",
        border: "1px solid #eee",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
        flexShrink: 0,
        scrollSnapAlign: "start",
      }}
    >
      {request.image_url ? (
        <img
          src={request.image_url}
          alt={request.area}
          onClick={() => onImageClick({ src: request.image_url, alt: request.area })}
          style={{
            display: "block",
            width: "100%",
            height: "180px",
            objectFit: "cover",
            cursor: "zoom-in",
            background: "#f4f4f4",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "80px",
            background: "linear-gradient(135deg, #eefaf1 0%, #d1fae5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
          }}
        >
          🗑️
        </div>
      )}
      <div style={{ padding: "16px" }}>
        <div style={{ marginBottom: "10px" }}>
          <StatusBadge status={request.status} />
        </div>
        <h3 style={{ color: "#146c43", marginBottom: "4px", fontSize: "1rem" }}>{request.area}</h3>
        <p style={{ color: "#555", fontSize: "0.85rem", marginBottom: "8px", lineHeight: "1.5" }}>
          {request.address}
        </p>
        <p style={{ color: "#333", fontSize: "0.85rem", marginBottom: "4px" }}>
          <strong>Garbage:</strong> {request.garbage_description}
        </p>
        <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: 0 }}>Posted on {date}</p>
      </div>
    </article>
  );
}

function PickupRequestsPage() {
  const [activeTab, setActiveTab] = useState("request");
  const [requests, setRequests] = useState([]);
  const [ragmanFilter, setRagmanFilter] = useState("pending");
  const [pageStatus, setPageStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [acceptingId, setAcceptingId] = useState(null);
  const [collectingId, setCollectingId] = useState(null);
  const [ragmanForm, setRagmanForm] = useState({ name: "", contact: "" });
  const [ragmanFormStatus, setRagmanFormStatus] = useState("");
  const [myAcceptedIds, setMyAcceptedIds] = useState(() => getMyAcceptedIds());

  const [formState, setFormState] = useState({
    requesterName: "",
    contactPhone: "",
    area: "",
    address: "",
    garbageDescription: "",
    notes: "",
    photo: null,
  });

  useEffect(() => {
    let ignore = false;

    async function loadRequests() {
      if (!hasSupabaseConfig) {
        setPageStatus("Supabase is not configured yet. Connect your project to see live requests.");
        return;
      }
      try {
        const rows = await fetchPickupRequests();
        if (!ignore) {
          setRequests(rows);
          setPageStatus("");
        }
      } catch {
        if (!ignore) {
          setPageStatus("Could not load pickup requests right now. Please try again later.");
        }
      }
    }

    loadRequests();
    return () => { ignore = true; };
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormState((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    if (!hasSupabaseConfig) {
      setSubmitStatus("Add your Supabase project settings before requests can be submitted.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("");
    try {
      const imageUrl = formState.photo ? await uploadPickupPhoto(formState.photo) : "";
      const created = await createPickupRequest({
        requester_name: formState.requesterName,
        contact_phone: formState.contactPhone,
        area: formState.area,
        address: formState.address,
        garbage_description: formState.garbageDescription,
        notes: formState.notes || null,
        image_url: imageUrl || null,
        status: "pending",
      });
      setRequests((prev) => [created, ...prev]);
      setFormState({
        requesterName: "",
        contactPhone: "",
        area: "",
        address: "",
        garbageDescription: "",
        notes: "",
        photo: null,
      });
      e.target.reset();
      setSubmitStatus("Your pickup request has been submitted. A ragman will accept it soon.");
    } catch (err) {
      setSubmitStatus(err.message || "Could not submit the request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptRequest = async (e) => {
    e.preventDefault();
    if (!ragmanForm.name.trim() || !ragmanForm.contact.trim()) {
      setRagmanFormStatus("Please enter your name and contact number.");
      return;
    }
    if (!hasSupabaseConfig) {
      setRagmanFormStatus("Supabase is not configured.");
      return;
    }
    setRagmanFormStatus("Saving...");
    try {
      const updated = await updatePickupRequest(acceptingId, {
        status: "accepted",
        ragman_name: ragmanForm.name.trim(),
        ragman_contact: ragmanForm.contact.trim(),
        accepted_at: new Date().toISOString(),
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === acceptingId ? { ...r, ...updated } : r))
      );
      saveMyAcceptedId(acceptingId);
      setMyAcceptedIds(getMyAcceptedIds());
      setAcceptingId(null);
      setRagmanForm({ name: "", contact: "" });
      setRagmanFormStatus("");
    } catch (err) {
      setRagmanFormStatus(err.message || "Could not accept the request. Please try again.");
    }
  };

  const handleMarkCollected = async (id) => {
    if (!hasSupabaseConfig) return;
    setCollectingId(id);
    try {
      const updated = await updatePickupRequest(id, {
        status: "collected",
        collected_at: new Date().toISOString(),
      });
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updated } : r))
      );
    } catch {
      // silent — user can retry
    } finally {
      setCollectingId(null);
    }
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const acceptedCount = requests.filter((r) => r.status === "accepted").length;
  const collectedCount = requests.filter((r) => r.status === "collected").length;

  const filteredRequests =
    ragmanFilter === "all" ? requests : requests.filter((r) => r.status === ragmanFilter);

  const recentRequests = requests.slice(0, 12);

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "40px 20px 120px" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #146c43 0%, #1c8c57 100%)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.8rem",
            marginBottom: "16px",
            boxShadow: "0 8px 20px rgba(20,108,67,0.25)",
          }}
        >
          🗑️
        </div>
        <h1 style={{ color: "#1f2d3d", marginBottom: "12px", fontSize: "2rem" }}>
          Garbage Pickup Requests
        </h1>
        <p style={{ maxWidth: "680px", margin: "0 auto", color: "#555", lineHeight: "1.7", fontSize: "1.05rem" }}>
          Residents can request garbage pickup from their location. Ragmen can browse open
          requests, accept a job, and mark it collected once done.
        </p>
      </div>

      {pageStatus && (
        <div
          style={{
            background: "#fff8e1",
            border: "1px solid #fde68a",
            borderRadius: "12px",
            padding: "14px 18px",
            marginBottom: "24px",
            color: "#92400e",
            fontWeight: "500",
          }}
        >
          {pageStatus}
        </div>
      )}

      {/* Tab Switcher */}
      <div
        style={{
          display: "inline-flex",
          background: "#f0f9f4",
          borderRadius: "16px",
          padding: "6px",
          marginBottom: "36px",
          border: "1px solid #c6f0d8",
        }}
      >
        <TabButton
          label="🏠  Request Pickup"
          active={activeTab === "request"}
          onClick={() => setActiveTab("request")}
        />
        <TabButton
          label="👷  Ragman Portal"
          active={activeTab === "ragman"}
          onClick={() => setActiveTab("ragman")}
        />
      </div>

      {/* ── REQUEST PICKUP TAB ── */}
      {activeTab === "request" && (
        <div>
          {/* Recent requests preview */}
          {recentRequests.length > 0 && (
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ color: "#1f2d3d", marginBottom: "16px" }}>Recent Pickup Requests</h2>
              <div
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "18px",
                  paddingBottom: "10px",
                  scrollSnapType: "x mandatory",
                }}
              >
                {recentRequests.map((req) => (
                  <RequestCard
                    key={req.id}
                    request={req}
                    onImageClick={setSelectedImage}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Submit Request Form */}
          <section
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid #eee",
              boxShadow: "0 16px 40px rgba(0,0,0,0.07)",
            }}
          >
            <h2 style={{ color: "#1f2d3d", marginBottom: "8px" }}>Submit a Pickup Request</h2>
            <p style={{ color: "#666", lineHeight: "1.7", marginBottom: "24px" }}>
              Fill in your details and describe the garbage. A ragman in your area will accept and
              collect it.
            </p>

            {submitStatus && (
              <div
                style={{
                  background: submitStatus.includes("submitted") ? "#ecfdf5" : "#fef2f2",
                  border: `1px solid ${submitStatus.includes("submitted") ? "#6ee7b7" : "#fca5a5"}`,
                  borderRadius: "12px",
                  padding: "12px 16px",
                  marginBottom: "20px",
                  color: submitStatus.includes("submitted") ? "#065f46" : "#991b1b",
                  fontWeight: "600",
                }}
              >
                {submitStatus}
              </div>
            )}

            <form onSubmit={handleSubmitRequest}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontWeight: "600", color: "#374151" }}>Your Name</span>
                  <input
                    type="text"
                    name="requesterName"
                    value={formState.requesterName}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. Ramesh Kumar"
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontWeight: "600", color: "#374151" }}>Phone Number</span>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formState.contactPhone}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. 98XXXXXXXX"
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontWeight: "600", color: "#374151" }}>Area / Locality</span>
                  <input
                    type="text"
                    name="area"
                    value={formState.area}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. Hauz Khas, New Delhi"
                    style={inputStyle}
                  />
                </label>

                <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontWeight: "600", color: "#374151" }}>Garbage Type</span>
                  <input
                    type="text"
                    name="garbageDescription"
                    value={formState.garbageDescription}
                    onChange={handleFormChange}
                    required
                    placeholder="e.g. Plastic bottles, mixed waste"
                    style={inputStyle}
                  />
                </label>
              </div>

              <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                <span style={{ fontWeight: "600", color: "#374151" }}>Full Address</span>
                <textarea
                  name="address"
                  value={formState.address}
                  onChange={handleFormChange}
                  rows="3"
                  required
                  placeholder="House/flat number, street, landmark — be specific so the ragman can find it."
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                <span style={{ fontWeight: "600", color: "#374151" }}>
                  Additional Notes <span style={{ fontWeight: "400", color: "#888" }}>(optional)</span>
                </span>
                <textarea
                  name="notes"
                  value={formState.notes}
                  onChange={handleFormChange}
                  rows="2"
                  placeholder="Best time to come, access instructions, approximate quantity…"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                <span style={{ fontWeight: "600", color: "#374151" }}>
                  Upload a Photo <span style={{ fontWeight: "400", color: "#888" }}>(optional)</span>
                </span>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleFormChange}
                  style={{ ...inputStyle, background: "#fffaf8" }}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                style={primaryButtonStyle(isSubmitting)}
              >
                {isSubmitting ? "Submitting…" : "Submit Pickup Request"}
              </button>
            </form>
          </section>
        </div>
      )}

      {/* ── RAGMAN PORTAL TAB ── */}
      {activeTab === "ragman" && (
        <div>
          {/* Info Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
              border: "1px solid #6ee7b7",
              borderRadius: "20px",
              padding: "24px 28px",
              marginBottom: "32px",
              display: "flex",
              alignItems: "flex-start",
              gap: "18px",
            }}
          >
            <span style={{ fontSize: "2.2rem", lineHeight: 1 }}>👷</span>
            <div>
              <h2 style={{ color: "#065f46", marginBottom: "6px", fontSize: "1.25rem" }}>
                Welcome, Ragman!
              </h2>
              <p style={{ color: "#047857", margin: 0, lineHeight: "1.6" }}>
                Browse open pickup requests from residents in your area. Accept a request to let
                them know you're coming, then mark it collected once you've picked up the garbage.
                Your name and contact will be shared with the requester.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            {[
              { label: "Pending", count: pendingCount, color: "#b45309", bg: "#fff8e1", border: "#fde68a" },
              { label: "Accepted", count: acceptedCount, color: "#1d4ed8", bg: "#eff6ff", border: "#bfdbfe" },
              { label: "Collected", count: collectedCount, color: "#065f46", bg: "#ecfdf5", border: "#6ee7b7" },
            ].map(({ label, count, color, bg, border }) => (
              <div
                key={label}
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: "16px",
                  padding: "20px 24px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", fontWeight: "800", color }}>{count}</div>
                <div style={{ color, fontWeight: "600", fontSize: "0.9rem" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
            <FilterButton
              label="All"
              active={ragmanFilter === "all"}
              count={requests.length}
              onClick={() => setRagmanFilter("all")}
            />
            <FilterButton
              label="Pending"
              active={ragmanFilter === "pending"}
              count={pendingCount}
              onClick={() => setRagmanFilter("pending")}
            />
            <FilterButton
              label="Accepted"
              active={ragmanFilter === "accepted"}
              count={acceptedCount}
              onClick={() => setRagmanFilter("accepted")}
            />
            <FilterButton
              label="Collected"
              active={ragmanFilter === "collected"}
              count={collectedCount}
              onClick={() => setRagmanFilter("collected")}
            />
          </div>

          {/* Request Cards */}
          {filteredRequests.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#888",
                background: "#fafafa",
                borderRadius: "20px",
                border: "1px dashed #ddd",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📭</div>
              <p style={{ margin: 0, fontWeight: "600" }}>
                No {ragmanFilter === "all" ? "" : ragmanFilter} requests at the moment.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredRequests.map((req) => {
                const isMineAccepted = myAcceptedIds.includes(req.id);
                const date = new Date(req.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                const isAcceptingThis = acceptingId === req.id;

                return (
                  <div
                    key={req.id}
                    style={{
                      background: "#fff",
                      borderRadius: "20px",
                      border: `1px solid ${isAcceptingThis ? "#6ee7b7" : "#eee"}`,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}
                  >
                    {req.image_url && (
                      <img
                        src={req.image_url}
                        alt={req.area}
                        onClick={() => setSelectedImage({ src: req.image_url, alt: req.area })}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          cursor: "zoom-in",
                          background: "#f4f4f4",
                        }}
                      />
                    )}

                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                        <StatusBadge status={req.status} />
                        <span style={{ color: "#aaa", fontSize: "0.78rem" }}>{date}</span>
                      </div>

                      <h3 style={{ color: "#146c43", marginBottom: "4px", fontSize: "1.05rem" }}>
                        {req.area}
                      </h3>
                      <p style={{ color: "#444", fontSize: "0.88rem", marginBottom: "10px", lineHeight: "1.5" }}>
                        {req.address}
                      </p>

                      <div
                        style={{
                          background: "#f9fafb",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          marginBottom: "12px",
                          fontSize: "0.88rem",
                        }}
                      >
                        <div style={{ color: "#555", marginBottom: "4px" }}>
                          <strong>Garbage:</strong> {req.garbage_description}
                        </div>
                        {req.notes && (
                          <div style={{ color: "#777" }}>
                            <strong>Notes:</strong> {req.notes}
                          </div>
                        )}
                      </div>

                      <div style={{ fontSize: "0.85rem", color: "#555", marginBottom: "14px" }}>
                        <div>
                          <strong>Requester:</strong> {req.requester_name}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                          <strong>Phone:</strong>
                          <a href={`tel:${req.contact_phone}`} style={{ color: "#146c43" }}>
                            {req.contact_phone}
                          </a>
                        </div>
                      </div>

                      {req.status === "accepted" && req.ragman_name && (
                        <div
                          style={{
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            marginBottom: "14px",
                            fontSize: "0.85rem",
                            color: "#1d4ed8",
                          }}
                        >
                          <strong>Assigned Ragman:</strong> {req.ragman_name}
                          {req.ragman_contact && (
                            <>
                              {" · "}
                              <a href={`tel:${req.ragman_contact}`} style={{ color: "#1d4ed8" }}>
                                {req.ragman_contact}
                              </a>
                            </>
                          )}
                        </div>
                      )}

                      {req.status === "collected" && (
                        <div
                          style={{
                            background: "#ecfdf5",
                            border: "1px solid #6ee7b7",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            marginBottom: "14px",
                            fontSize: "0.85rem",
                            color: "#065f46",
                          }}
                        >
                          ✅ Collected by {req.ragman_name || "ragman"} on{" "}
                          {req.collected_at
                            ? new Date(req.collected_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "unknown date"}
                        </div>
                      )}

                      {/* Accept Request: inline form */}
                      {req.status === "pending" && !isAcceptingThis && (
                        <button
                          type="button"
                          onClick={() => {
                            setAcceptingId(req.id);
                            setRagmanFormStatus("");
                          }}
                          style={{
                            ...primaryButtonStyle(false),
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          Accept This Request
                        </button>
                      )}

                      {isAcceptingThis && (
                        <form onSubmit={handleAcceptRequest} style={{ marginTop: "4px" }}>
                          <p style={{ color: "#146c43", fontWeight: "600", marginBottom: "12px", fontSize: "0.9rem" }}>
                            Enter your details to accept:
                          </p>
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={ragmanForm.name}
                            onChange={(e) => setRagmanForm((p) => ({ ...p, name: e.target.value }))}
                            required
                            style={{ ...inputStyle, marginBottom: "10px", width: "100%", boxSizing: "border-box" }}
                          />
                          <input
                            type="tel"
                            placeholder="Your Contact Number"
                            value={ragmanForm.contact}
                            onChange={(e) => setRagmanForm((p) => ({ ...p, contact: e.target.value }))}
                            required
                            style={{ ...inputStyle, marginBottom: "10px", width: "100%", boxSizing: "border-box" }}
                          />
                          {ragmanFormStatus && (
                            <p style={{ color: ragmanFormStatus === "Saving..." ? "#146c43" : "#dc2626", fontSize: "0.85rem", marginBottom: "10px" }}>
                              {ragmanFormStatus}
                            </p>
                          )}
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              type="submit"
                              style={{ ...primaryButtonStyle(ragmanFormStatus === "Saving..."), flex: 1 }}
                              disabled={ragmanFormStatus === "Saving..."}
                            >
                              {ragmanFormStatus === "Saving..." ? "Saving…" : "Confirm Acceptance"}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setAcceptingId(null); setRagmanFormStatus(""); }}
                              style={{
                                border: "1px solid #ddd",
                                borderRadius: "999px",
                                padding: "10px 16px",
                                background: "#fff",
                                color: "#555",
                                cursor: "pointer",
                                fontWeight: "600",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      {req.status === "accepted" && isMineAccepted && (
                        <button
                          type="button"
                          disabled={collectingId === req.id}
                          onClick={() => handleMarkCollected(req.id)}
                          style={{
                            border: "none",
                            borderRadius: "999px",
                            background: collectingId === req.id ? "#ccc" : "#065f46",
                            color: "#fff",
                            padding: "10px 20px",
                            fontWeight: "700",
                            cursor: collectingId === req.id ? "wait" : "pointer",
                            width: "100%",
                            fontSize: "0.95rem",
                          }}
                        >
                          {collectingId === req.id ? "Updating…" : "✅ Mark as Collected"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <ImagePreviewModal
        show={Boolean(selectedImage)}
        onHide={() => setSelectedImage(null)}
        src={selectedImage?.src}
        alt={selectedImage?.alt}
      />
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "0.95rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

function primaryButtonStyle(disabled) {
  return {
    border: "none",
    borderRadius: "999px",
    background: disabled ? "#9ca3af" : "#146c43",
    color: "#fff",
    padding: "12px 24px",
    fontWeight: "700",
    cursor: disabled ? "wait" : "pointer",
    fontSize: "0.95rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "background 0.15s",
  };
}

export default PickupRequestsPage;
