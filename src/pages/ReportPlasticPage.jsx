import React, { useEffect, useState } from "react";
import {
  createPlasticReport,
  fetchPlasticReports,
  hasSupabaseConfig,
  uploadReportPhoto,
} from "../lib/supabase";

const starterReports = [
  {
    id: "report-1",
    reporter_name: "Aditi",
    area: "Yamuna Bank",
    address: "Near the service road beside the riverfront walkway, New Delhi",
    image_url: "/hardikimages/image 11.png",
  },
  {
    id: "report-2",
    reporter_name: "Rahul",
    area: "Versova stretch",
    address: "Public beach access lane near the fishing colony, Mumbai",
    image_url: "/hardikimages/image 12.png",
  },
  {
    id: "report-3",
    reporter_name: "Sneha",
    area: "Koramangala drain edge",
    address: "Near the 5th Block junction stormwater drain, Bengaluru",
    image_url: "/hardikimages/image 14.png",
  },
];

function ReportPlasticPage() {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    reporterName: "",
    area: "",
    address: "",
    photo: null,
  });

  useEffect(() => {
    let ignore = false;

    async function loadReports() {
      if (!hasSupabaseConfig) {
        setStatus("Supabase is not configured yet, so placeholder reports are being shown.");
        return;
      }

      try {
        const rows = await fetchPlasticReports();
        if (!ignore) {
          setReports(rows);
          setStatus("");
        }
      } catch {
        if (!ignore) {
          setStatus("Could not load live reports right now, so placeholder reports are being shown.");
        }
      }
    }

    loadReports();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasSupabaseConfig) {
      setStatus("Add your Supabase project settings before live reports can be submitted.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const imageUrl = await uploadReportPhoto(formState.photo);
      const createdRow = await createPlasticReport({
        reporter_name: formState.reporterName,
        area: formState.area,
        address: formState.address,
        image_url: imageUrl,
      });

      setReports((current) => [createdRow, ...current]);
      setFormState({
        reporterName: "",
        area: "",
        address: "",
        photo: null,
      });
      event.target.reset();
      setStatus("Your plastic accumulation report has been added.");
    } catch (error) {
      setStatus(error.message || "Could not submit the report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleReports = [...starterReports, ...reports];

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "40px 20px 120px" }}>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h1 style={{ color: "#1f2d3d", marginBottom: "12px" }}>Report Plastic Accumulation</h1>
        <p style={{ maxWidth: "800px", margin: "0 auto", color: "#555", lineHeight: "1.7" }}>
          Help spotlight locations where plastic waste is building up. Browse recent reports below,
          then submit a new one with the area, exact address, and a photo of the surroundings.
        </p>
      </div>

      {status ? (
        <p style={{ marginBottom: "18px", color: "#146c43", fontWeight: "600" }}>{status}</p>
      ) : null}

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#1f2d3d", marginBottom: "16px" }}>Recent Plastic Spot Reports</h2>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "18px",
            paddingBottom: "10px",
            scrollSnapType: "x mandatory",
          }}
        >
          {visibleReports.map((report) => (
            <article
              key={report.id}
              style={{
                minWidth: "320px",
                maxWidth: "320px",
                background: "#fff",
                borderRadius: "18px",
                border: "1px solid #eee",
                overflow: "hidden",
                boxShadow: "0 16px 32px rgba(0, 0, 0, 0.08)",
                flexShrink: 0,
                scrollSnapAlign: "start",
              }}
            >
              <img
                src={report.image_url}
                alt={report.area}
                style={{
                  display: "block",
                  width: "100%",
                  height: "210px",
                  objectFit: "cover",
                  background: "#f4f4f4",
                }}
              />
              <div style={{ padding: "18px" }}>
                <h3 style={{ color: "#146c43", marginBottom: "8px" }}>{report.area}</h3>
                <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "12px" }}>{report.address}</p>
                <p style={{ margin: 0, color: "#666", fontWeight: "600" }}>
                  Posted by {report.reporter_name}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "28px",
          border: "1px solid #eee",
          boxShadow: "0 16px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h2 style={{ color: "#1f2d3d", marginBottom: "14px" }}>Submit a New Report</h2>
        <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "20px" }}>
          Add your name, the area you noticed, the exact address, and a photo that helps people
          understand the situation on the ground.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span>Your name</span>
              <input
                type="text"
                name="reporterName"
                value={formState.reporterName}
                onChange={handleChange}
                required
                style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <span>Area</span>
              <input
                type="text"
                name="area"
                value={formState.area}
                onChange={handleChange}
                required
                placeholder="Example: Rohini Sector 11"
                style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc" }}
              />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            <span>Address</span>
            <textarea
              name="address"
              value={formState.address}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Write the exact location so volunteers can identify it easily."
              style={{ padding: "12px 14px", borderRadius: "12px", border: "1px solid #ccc", resize: "vertical" }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            <span>Upload a photo of the surroundings</span>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "12px",
                border: "1px solid #ccc",
                background: "#fffaf8",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
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
          >
            {isSubmitting ? "Submitting..." : "Submit Plastic Report"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default ReportPlasticPage;
