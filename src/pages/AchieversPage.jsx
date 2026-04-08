import React, { useEffect, useState } from "react";
import {
  createAchieverEntry,
  fetchAchievers,
  hasSupabaseConfig,
  uploadAchieverPhoto,
} from "../lib/supabase";

const Section = ({ id, title, children }) => (
  <section
    id={id}
    style={{
      marginBottom: "40px",
      scrollMarginTop: "90px",
    }}
  >
    <h2 style={{ color: "#2c3e50", marginBottom: "14px" }}>{title}</h2>
    <div style={{ lineHeight: "1.7", color: "#444" }}>{children}</div>
  </section>
);

const starterTestimonies = [
  {
    id: "starter-1",
    name: "Aarav",
    role: "Student volunteer",
    image: "/aakash.jpg",
    image_url: "/aakash.jpg",
    quote:
      "Picking up plastic waste made the problem feel real. It is not just litter on the roadside; it affects animals, drains, and the dignity of the places we live in.",
    testimony:
      "Picking up plastic waste made the problem feel real. It is not just litter on the roadside; it affects animals, drains, and the dignity of the places we live in.",
  },
  {
    id: "starter-2",
    name: "Meera",
    role: "Weekend cleanup participant",
    image: "/kavya.jpg",
    image_url: "/kavya.jpg",
    quote:
      "The biggest change for me was realizing how small habits build into large impact. Carrying my own bottle and refusing single-use items now feels like a responsibility, not an inconvenience.",
    testimony:
      "The biggest change for me was realizing how small habits build into large impact. Carrying my own bottle and refusing single-use items now feels like a responsibility, not an inconvenience.",
  },
];

function AchieversPage() {
  const [submittedTestimonies, setSubmittedTestimonies] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    role: "",
    testimony: "",
    photo: null,
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadAchievers() {
      if (!hasSupabaseConfig) {
        setStatus("Supabase is not configured yet, so the page is showing placeholder achievers.");
        return;
      }

      setIsLoading(true);

      try {
        const rows = await fetchAchievers();
        if (!ignore) {
          setSubmittedTestimonies(
            rows.map((row) => ({
              ...row,
              quote: row.testimony,
              image: row.image_url || "/home.png",
            }))
          );
          setStatus("");
        }
      } catch (error) {
        if (!ignore) {
          setStatus("Could not load live achievers right now, so placeholder cards are being shown.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadAchievers();

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
      setStatus("Add your Supabase project settings before live submissions can create new achiever cards.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const imageUrl = await uploadAchieverPhoto(formState.photo);
      const createdRow = await createAchieverEntry({
        name: formState.name,
        role: formState.role || "Community contributor",
        testimony: formState.testimony,
        image_url: imageUrl,
      });

      setSubmittedTestimonies((current) => [
        {
          ...createdRow,
          quote: createdRow.testimony,
          image: createdRow.image_url || "/home.png",
        },
        ...current,
      ]);
      setStatus("Thanks for sharing your journey. Your achiever card has been added.");
      setFormState({
        name: "",
        role: "",
        testimony: "",
        photo: null,
      });
      event.target.reset();
    } catch (error) {
      setStatus(error.message || "Something went wrong while sending your story. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleTestimonies = [...starterTestimonies, ...submittedTestimonies];

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 120px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "18px" }}>Achievers</h1>
      <p
        style={{
          maxWidth: "760px",
          margin: "0 auto 32px",
          textAlign: "center",
          color: "#555",
          lineHeight: "1.7",
        }}
      >
        This space celebrates people who act against plastic pollution. It highlights the spirit of
        cleanup drives, everyday plastic-conscious choices, and personal stories that can inspire
        more people to participate.
      </p>

      <Section id="achievers-hero" title="People Taking Action">
        <img
          src="/hardikimages/image 11.png"
          alt="Plastic pollution awareness visual"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "820px",
            margin: "0 auto 18px",
            borderRadius: "18px",
            boxShadow: "0 14px 32px rgba(0, 0, 0, 0.16)",
          }}
        />
        <p style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          Every cleanup effort sends a clear message: plastic waste is not someone else&apos;s
          problem. Community action, awareness, and responsible disposal all work together to create
          visible change.
        </p>
      </Section>

      <Section id="achievers-testimonies" title="What People Feel About Plastic Waste">
        {isLoading ? (
          <p style={{ marginBottom: "16px", color: "#666" }}>Loading live achievers...</p>
        ) : null}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "18px",
            paddingBottom: "10px",
            scrollSnapType: "x mandatory",
          }}
        >
          {visibleTestimonies.map((item) => (
            <article
              key={item.id || item.name}
              style={{
                minWidth: "280px",
                maxWidth: "280px",
                background: "#fff7f4",
                border: "1px solid #f0d7ce",
                borderRadius: "16px",
                padding: "18px",
                boxShadow: "0 8px 20px rgba(139, 0, 0, 0.08)",
                scrollSnapAlign: "start",
                flexShrink: 0,
              }}
            >
              <img
                src={item.image || item.image_url || "/home.png"}
                alt={item.name}
                style={{
                  display: "block",
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              />
              <p style={{ marginBottom: "16px", color: "#4b3a34" }}>
                &ldquo;{item.quote || item.testimony}&rdquo;
              </p>
              <strong style={{ display: "block", color: "#8b0000" }}>{item.name}</strong>
              <span style={{ color: "#6e625d", fontSize: "14px" }}>{item.role}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section id="share-journey" title="Send Us Your Journey With Plastic">
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "24px",
            boxShadow: "0 16px 32px rgba(0, 0, 0, 0.08)",
            border: "1px solid #eee",
          }}
        >
          <p style={{ marginBottom: "18px" }}>
            Share your photograph and your testimony with us. This helps us review stories and add
            selected journeys to the website in the future.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span>Your role</span>
                <input
                  type="text"
                  name="role"
                  value={formState.role}
                  onChange={handleChange}
                  placeholder="Student volunteer, community member, organizer..."
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              <span>Upload your photograph</span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                style={{
                  padding: "10px",
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  background: "#fffaf8",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
              <span>Your testimony</span>
              <textarea
                name="testimony"
                value={formState.testimony}
                onChange={handleChange}
                rows="6"
                required
                placeholder="Tell us what you learned, felt, or changed because of plastic awareness or cleanup work."
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid #ccc",
                  resize: "vertical",
                }}
              />
            </label>

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
              {isSubmitting ? "Submitting..." : "Send us your journey with plastic"}
            </button>
          </form>

          {status ? (
            <p style={{ marginTop: "16px", color: "#8b0000", fontWeight: "600" }}>{status}</p>
          ) : null}
        </div>
      </Section>
    </div>
  );
}

export default AchieversPage;
