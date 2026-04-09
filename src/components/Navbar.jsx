import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavScrollExample() {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: "/page1", label: "Understanding Plastics" },
    { path: "/page2", label: "Introduction" },
    { path: "/page3", label: "Management Rules" },
    { path: "/page4", label: "Politics" },
    { path: "/page5", label: "Advancements" },
    { path: "/page6", label: "Recovery & Circular Economy" },
    { path: "/page7", label: "Integrated Perspective" }
  ];

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        background: "linear-gradient(90deg, #0f5132 0%, #146c43 45%, #1c8c57 100%)",
        boxShadow: "0 10px 24px rgba(15, 81, 50, 0.22)",
        borderBottom: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(10px)",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "#fff",
            fontWeight: "800",
            fontSize: "1.15rem",
            letterSpacing: "0.4px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.14)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            PM
          </span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span>Plastic Management</span>
            <span style={{ fontSize: "0.72rem", fontWeight: "500", opacity: 0.78 }}>
              Learn, act, and build cleaner cities
            </span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarScroll"
          style={{
            border: "1px solid rgba(255,255,255,0.22)",
            padding: "6px 10px",
            boxShadow: "none",
          }}
        />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            navbarScroll
            style={{
              gap: "6px",
              alignItems: "center",
            }}
          >
            {navItems.map((item, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={item.path}
                style={{
                  color: "#fff",
                  fontWeight: location.pathname === item.path ? "700" : "500",
                  padding: "10px 14px",
                  borderRadius: "999px",
                  transition: "all 0.25s ease",
                  background:
                    location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.16)"
                      : "transparent",
                  boxShadow:
                    location.pathname === item.path
                      ? "inset 0 0 0 1px rgba(255,255,255,0.12)"
                      : "none",
                  fontSize: "0.95rem",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.background = "rgba(255,255,255,0.12)";
                    e.target.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.background = "transparent";
                  }
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {item.label}
              </Nav.Link>
            ))}
            <button
              type="button"
              onClick={signOut}
              style={{
                border: "none",
                borderRadius: "999px",
                padding: "10px 16px",
                background: "rgba(255,255,255,0.14)",
                color: "#fff",
                fontWeight: "700",
                marginLeft: "8px",
                cursor: "pointer",
              }}
            >
              {user?.email ? `Sign out` : "Sign out"}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
