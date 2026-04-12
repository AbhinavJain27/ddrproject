import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthFormPanel({ onSuccess, compact = false }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("signin");
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setStatus("");
  }, [mode]);

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
          setStatus("Your account was created. Confirm your email before continuing.");
          return;
        }
      } else {
        await signIn({
          email: formState.email,
          password: formState.password,
        });
      }

      setFormState({
        fullName: "",
        email: "",
        password: "",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setStatus(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      style={{
        background: "#fff",
        borderRadius: compact ? "24px" : "28px",
        padding: compact ? "26px" : "30px",
        boxShadow: compact
          ? "0 20px 44px rgba(23, 62, 40, 0.14)"
          : "0 24px 48px rgba(23, 62, 40, 0.1)",
        border: "1px solid #e0efe5",
      }}
    >
      <div style={{ display: "flex", gap: "10px", marginBottom: "22px", flexWrap: "wrap" }}>
        {[
          { id: "signin", label: "Sign in" },
          { id: "signup", label: "Sign up" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
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
          ? "Confirm your identity to continue with campaign actions."
          : "Create your account to start and manage campaigns linked to your profile."}
      </p>

      <form onSubmit={handleSubmit}>
        {mode === "signup" ? (
          <label
            style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}
          >
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
          {isSubmitting ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      {status ? <p style={{ marginTop: "16px", color: "#146c43", fontWeight: "600" }}>{status}</p> : null}
    </section>
  );
}

export default AuthFormPanel;
