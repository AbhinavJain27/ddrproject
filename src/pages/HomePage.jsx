import React from 'react'
import { Link } from 'react-router-dom'

const actions = [
  {
    title: "Share your views",
    description:
      "Tell us what plastic awareness, cleanup drives, and better habits mean to you.",
    to: "/achievers",
  },
  {
    title: "Report Plastic Accumulation",
    description:
      "Highlight areas where plastic waste is piling up so action can be planned faster.",
  },
  {
    title: "Start/Join A Plastic Campaign",
    description:
      "Bring people together for collection drives, awareness work, and long-term change.",
  },
]

const leaderboard = [
  { name: "Aarav", plasticCollected: "142 kg", campaigns: 12 },
  { name: "Meera", plasticCollected: "127 kg", campaigns: 10 },
  { name: "Rohan", plasticCollected: "113 kg", campaigns: 9 },
  { name: "Nisha", plasticCollected: "96 kg", campaigns: 8 },
  { name: "Dev", plasticCollected: "81 kg", campaigns: 7 },
]

const HomePage = () => {
  return (
    <div
      style={{
        maxWidth: "1180px",
        margin: "0 auto",
        padding: "36px 20px 120px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "28px",
        }}
      >
        <h1
          style={{
            marginBottom: "12px",
            color: "#1f2d3d",
            fontSize: "clamp(2rem, 4vw, 3.4rem)",
          }}
        >
          Plastic Action Hub
        </h1>
        <p
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            color: "#555",
            lineHeight: "1.7",
            fontSize: "1.05rem",
          }}
        >
          Learn, report, and mobilize around plastic waste management while recognizing the people
          creating the biggest impact in cleanup campaigns.
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "18px",
          boxShadow: "0 18px 36px rgba(0, 0, 0, 0.08)",
          marginBottom: "30px",
        }}
      >
        <img
          src="/home.png"
          alt="Plastic uses and action overview"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            borderRadius: "18px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
          marginBottom: "36px",
        }}
      >
        {actions.map((action, index) => {
          const content = (
            <article
              style={{
                height: "100%",
                background: "linear-gradient(180deg, #fff8f4 0%, #fff 100%)",
                border: "1px solid #f0ddd3",
                borderRadius: "20px",
                padding: "22px",
                boxShadow: "0 12px 24px rgba(139, 0, 0, 0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#8b0000",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  marginBottom: "16px",
                }}
              >
                {index + 1}
              </div>
              <h3 style={{ color: "#2c3e50", marginBottom: "12px", fontSize: "1.2rem" }}>
                {action.title}
              </h3>
              <p style={{ color: "#555", lineHeight: "1.7", marginBottom: 0 }}>
                {action.description}
              </p>
            </article>
          )

          if (action.to) {
            return (
              <Link
                key={action.title}
                to={action.to}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {content}
              </Link>
            )
          }

          return <div key={action.title}>{content}</div>
        })}
      </div>

      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            marginBottom: "18px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ marginBottom: "6px", color: "#1f2d3d" }}>Campaign Leaderboard</h2>
            <p style={{ margin: 0, color: "#666" }}>
              People with the highest total plastic collected across all campaigns appear on top.
            </p>
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 18px 36px rgba(0, 0, 0, 0.08)",
            border: "1px solid #eee",
          }}
        >
          {leaderboard.map((person, index) => (
            <div
              key={person.name}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 160px 120px",
                gap: "16px",
                alignItems: "center",
                padding: "18px 20px",
                borderBottom: index === leaderboard.length - 1 ? "none" : "1px solid #f1f1f1",
                background: index === 0 ? "#fff7e8" : "#fff",
              }}
            >
              <strong style={{ color: "#8b0000", fontSize: "1.1rem" }}>#{index + 1}</strong>
              <span style={{ color: "#2c3e50", fontWeight: "600" }}>{person.name}</span>
              <span style={{ color: "#444" }}>{person.plasticCollected}</span>
              <span style={{ color: "#666" }}>{person.campaigns} campaigns</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage;
