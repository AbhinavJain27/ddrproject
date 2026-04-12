import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchCampaigns, hasSupabaseConfig } from '../lib/supabase'

const actions = [
  {
    title: "Track Your Impact",
    description:
      "Tell us how much plastic you collected and help us measure real impact.",
    to: "/achievers",
  },
  {
    title: "Report Plastic Accumulation",
    description:
      "Highlight areas where plastic waste is piling up so action can be planned faster.",
    to: "/reports",
  },
  {
    title: "Start/Join A Plastic Campaign",
    description:
      "Bring people together for collection drives, awareness work, and long-term change.",
    to: "/campaigns",
  },
]

function parsePlasticCollected(value) {
  if (typeof value === "number") {
    return value
  }

  if (!value) {
    return 0
  }

  const normalized = String(value).replace(/,/g, "")
  const match = normalized.match(/[\d.]+/)
  return match ? Number(match[0]) : 0
}

const HomePage = () => {
  const [leaderboardCampaigns, setLeaderboardCampaigns] = useState([])
  const [leaderboardStatus, setLeaderboardStatus] = useState("")

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      if (!hasSupabaseConfig) {
        if (!ignore) {
          setLeaderboardCampaigns([])
          setLeaderboardStatus("Connect Supabase to show the live campaign leaderboard.")
        }
        return
      }

      try {
        const campaigns = await fetchCampaigns()
        const sortedCampaigns = [...campaigns].sort((left, right) => {
          return parsePlasticCollected(right.plastic_collected) - parsePlasticCollected(left.plastic_collected)
        })

        if (!ignore) {
          setLeaderboardCampaigns(sortedCampaigns)
          setLeaderboardStatus("")
        }
      } catch {
        if (!ignore) {
          setLeaderboardCampaigns([])
          setLeaderboardStatus("Could not load the live campaign leaderboard right now.")
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

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
            marginBottom: "14px",
            color: "#316a50",
            fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontWeight: "2000",
            letterSpacing: "0.03em",
            lineHeight: "1.05",
            textShadow: "0 10px 24px rgba(20, 108, 67, 0.12)",
          }}
        >
          Plastic Waste Management
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
                background: "linear-gradient(180deg, #f2fbf5 0%, #fff 100%)",
                border: "1px solid #d5eadb",
                borderRadius: "20px",
                padding: "22px",
                boxShadow: "0 12px 24px rgba(20, 108, 67, 0.08)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#146c43",
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
          {leaderboardStatus ? (
            <p style={{ margin: 0, padding: "18px 20px", color: "#666" }}>{leaderboardStatus}</p>
          ) : leaderboardCampaigns.length > 0 ? (
            leaderboardCampaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px minmax(200px, 1.3fr) minmax(140px, 0.9fr) minmax(140px, 0.9fr)",
                  gap: "16px",
                  alignItems: "center",
                  padding: "18px 20px",
                  borderBottom:
                    index === leaderboardCampaigns.length - 1 ? "none" : "1px solid #f1f1f1",
                  background: index === 0 ? "#eefaf1" : "#fff",
                }}
              >
                <strong style={{ color: "#146c43", fontSize: "1.1rem" }}>#{index + 1}</strong>
                <div>
                  <span style={{ color: "#2c3e50", fontWeight: "600", display: "block" }}>
                    {campaign.name}
                  </span>
                  <span style={{ color: "#666", fontSize: "0.95rem" }}>
                    {campaign.cities?.join(", ")}
                  </span>
                </div>
                <span style={{ color: "#444" }}>
                  {campaign.plastic_collected || campaign.plasticCollected}
                </span>
                <span style={{ color: "#666" }}>
                  {campaign.joined_people ?? campaign.joinedPeople} joined
                </span>
              </div>
            ))
          ) : (
            <p style={{ margin: 0, padding: "18px 20px", color: "#666" }}>
              No campaigns are available in the leaderboard yet.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage;
