import React, { useState } from "react";

const Footer = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://formspree.io/f/xjgparlg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        alert("Message sent!");
        setMessage(""); 
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert("Error sending message");
    }
  };

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(135deg, #8B0000, #a52a2a)",
        color: "#fff",
        textAlign: "center",
        padding: "12px 10px",
        zIndex: 1000,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
        © {new Date().getFullYear()} IIT Delhi | All Rights Reserved
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          name="message"
          placeholder="Drop a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{
            padding: "8px 12px",
            borderRadius: "20px",
            border: "none",
            outline: "none",
            width: "260px",
            maxWidth: "70%",
            fontSize: "14px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            background: "#fff",
            color: "#8B0000",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
          onMouseOver={(e) => (e.target.style.background = "#ffd6d6")}
          onMouseOut={(e) => (e.target.style.background = "#fff")}
        >
          Send 
        </button>
      </form>
    </footer>
  );
};

export default Footer;