import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("signin");
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
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
    setIsSubmitting(true);
    setStatus("");

    try {
      if (mode === "signup") {
        const result = await signUp(formState);
        if (result.requiresEmailConfirmation) {
          setStatus("Your account was created. Turn off email confirmation in Supabase Email settings if you want users to enter immediately.");
        }
      } else {
        await signIn({
          email: formState.email,
          password: formState.password,
        });
      }
    } catch (error) {
      setStatus(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 20px",
        background:
          "radial-gradient(circle at top left, rgba(31, 154, 93, 0.22), transparent 36%), linear-gradient(135deg, #eefaf1 0%, #f7fcf8 45%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "980px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "22px",
          alignItems: "stretch",
        }}
      >
        <section
          style={{
            background: "linear-gradient(180deg, #146c43 0%, #0f5132 100%)",
            color: "#fff",
            borderRadius: "28px",
            padding: "32px",
            boxShadow: "0 26px 54px rgba(15, 81, 50, 0.24)",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              marginBottom: "18px",
            }}
          >
            PM
          </div>
          <h1 style={{ fontSize: "2.2rem", marginBottom: "14px" }}>Plastic Action Hub</h1>
          <p style={{ lineHeight: "1.8", opacity: 0.92, marginBottom: "16px" }}>
            Sign in to explore campaigns, report plastic accumulation, and contribute your own
            cleanup journey.
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "18px",
            }}
          >
            <strong style={{ display: "block", marginBottom: "8px" }}>Why sign in?</strong>
            <p style={{ margin: 0, lineHeight: "1.7", opacity: 0.88 }}>
              Your account lets the platform remember your campaigns and unlock a personal active
              campaigns section on the campaign page.
            </p>
          </div>
        </section>

        <section
          style={{
            background: "#fff",
            borderRadius: "28px",
            padding: "30px",
            boxShadow: "0 24px 48px rgba(23, 62, 40, 0.1)",
            border: "1px solid #e0efe5",
          }}
        >
          <div style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
            {[
              { id: "signin", label: "Sign in" },
              { id: "signup", label: "Sign up" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMode(item.id);
                  setStatus("");
                }}
                style={{
                  border: "none",
                  borderRadius: "999px",
                  padding: "11px 18px",
                  fontWeight: "700",
                  cursor: "pointer",
                  background: mode === item.id ? "#146c43" : "#edf7f0",
                  color: mode === item.id ? "#fff" : "#146c43",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <h2 style={{ color: "#1f2d3d", marginBottom: "10px" }}>
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p style={{ color: "#5b5b5b", lineHeight: "1.7", marginBottom: "22px" }}>
            {mode === "signin"
              ? "Sign in to continue into the platform."
              : "Create your account to enter the platform, join campaigns, and manage your own active campaign listings."}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                <span>Full name</span>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                  required
                  style={{
                    padding: "12px 14px",
                    borderRadius: "14px",
                    border: "1px solid #cfe3d5",
                    background: "#fbfefc",
                  }}
                />
              </label>
            ) : null}

            <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              <span>Email address</span>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                style={{
                  padding: "12px 14px",
                  borderRadius: "14px",
                  border: "1px solid #cfe3d5",
                  background: "#fbfefc",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
                minLength={6}
                style={{
                  padding: "12px 14px",
                  borderRadius: "14px",
                  border: "1px solid #cfe3d5",
                  background: "#fbfefc",
                }}
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "999px",
                background: "#146c43",
                color: "#fff",
                padding: "13px 20px",
                fontWeight: "800",
                cursor: isSubmitting ? "wait" : "pointer",
                opacity: isSubmitting ? 0.85 : 1,
              }}
            >
              {isSubmitting
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
            </button>
          </form>

          {status ? (
            <p style={{ marginTop: "16px", color: "#146c43", fontWeight: "600" }}>{status}</p>
          ) : null}
        </section>
      </div>
    </div>
  );
}

export default AuthPage;
