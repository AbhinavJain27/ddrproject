import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormPanel from "../components/AuthFormPanel";
import { useAuth } from "../context/AuthContext";

function AuthPage() {
  const navigate = useNavigate();
  const { user, session, loading } = useAuth();
  const isAuthenticated = Boolean(user?.id && session?.access_token);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

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
            boxShadow: "0 24px 48px rgba(23, 62, 40, 0.1)",
            border: "1px solid #e0efe5",
          }}
        >
          <AuthFormPanel
            onSuccess={() => {
              navigate("/", { replace: true });
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default AuthPage;
