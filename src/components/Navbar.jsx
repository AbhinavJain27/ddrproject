import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

function NavScrollExample() {
  const location = useLocation();

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
        backgroundColor: "#8B0000",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
      }}
      variant="dark"
    >
      <Container fluid>
        
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            letterSpacing: "0.5px"
          }}
        >
          ♻ Plastic Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>

            {navItems.map((item, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={item.path}
                style={{
                  color: location.pathname === item.path ? "#ffd700" : "#fff",
                  fontWeight: location.pathname === item.path ? "600" : "400",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  transition: "0.3s"
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.background = "rgba(255,255,255,0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                {item.label}
              </Nav.Link>
            ))}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
