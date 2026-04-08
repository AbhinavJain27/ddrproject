import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

function Example() {
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const data = [
    {
      to: "/page1",
      text: "Understanding Plastics & Plastic Waste",
      sub: [
        { id: "p1i1", label: "What is Plastic?" },
        { id: "p1i2", label: "Key Characteristic" },
        { id: "p1i3", label: "Why Understanding Plastic Matters" },
        { id: "p1i4", label: "History of Plastic" },
        { id: "p1i5", label: "How Plastic is Made" },
        { id: "p1i6", label: "Key Additives in Plastic" },
        { id: "p1i7", label: "Major Plastic Manufacturing Processes" },
        { id: "p1i8", label: "Classification of Plastics" },
        { id: "p1i9", label: "Uses of Plastics" },
        { id: "p1i10", label: "Per Capita Plastic Waste Generation" },
        { id: "p1i11", label: "Plastic Waste Generation vs Pollution" },
        { id: "p1i12", label: "Plastic Waste Consumption vs Pollution" },
        { id: "p1i13", label: "Environmental Insight" },
        { id: "p1i14", label: "Plastic vs Plastic Waste" },
        { id: "p1i15", label: "Why Plastic Pollution is Rising" },

      ],
    },
    {
      to: "/page2",
      text: "Introduction to Plastic Waste",
      sub: [
        { id: "p2i1", label: "The Plastic Crisis" },
        { id: "p2i2", label: "The Genesis of Plastic Waste" },
        { id: "p2i3", label: "The Anatomy of Mismanagement" },
        { id: "p2i4", label: "Pathways of Pollution" },
        { id: "p2i5", label: "The Invisible Enemy" },
        { id: "p2i6", label: "Rivers as Global Transport Highways" },
        { id: "p2i7", label: "Marine Accumulation and the Great Pacific Garbage Patch" },
        { id: "p2i8", label: "Conclusion: Breaking the Link Between Growth and Waste" },
      ],
    },
    {
      to: "/page3",
      text: "Plastic Waste Management Rules in India",
      sub: [
        { id: "p3i1", label: "Overview" },
        { id: "p3i2", label: "Evolution of Environmental Rules in India" },
        { id: "p3i3", label: "Why Plastic Waste Management Rules Are Necessary" },
        { id: "p3i4", label: "Plastic Waste Management Rules, 2016" },
        { id: "p3i5", label: "Challenges in Implementation" },
        { id: "p3i6", label: "Understanding Plastic Waste Management Rules" },
        { id: "p3i7", label: "Key Improvements in the 2016 Rules" },
        { id: "p3i8", label: "Extended Producer Responsibility (EPR)" },
        { id: "p3i9", label: "Responsibility of Waste Generators" },
        { id: "p3i10", label: "Roles and Responsibilities of Stakeholders" },
      ],
    },
    {
      to: "/page4",
      text: "Role of Government",
      sub: [
        { id: "p4i1", label: "The Transition to Political Relevance" },
        { id: "p4i2", label: "The Circular Economy and the Waste Hierarchy" },
        { id: "p4i3", label: "Landfill Restrictions as a Political Lever" },
        { id: "p4i4", label: "Financing Waste: Extended Producer Responsibility (EPR)" },
        { id: "p4i5", label: "Global Diplomacy and the 'National Sword'" },
        { id: "p4i6", label: "Regional Legislative Deep Dives" },
      ],
    },
    {
      to: "/page5",
      text: "Recent Advancements",
      sub: [
        { id: "p5i1", label: "The Evolution of Intelligent Sorting and System Logistics" },
        { id: "p5i2", label: "Biotechnological Advancements in Polymer Degradation" },
        { id: "p5i3", label: "Hybrid Thermochemical Valorization" },
        { id: "p5i4", label: "Circular Economy Governance and Economic Feasibility" },
      ],
    },
    {
      to: "/page6",
      text: "Resource Recovery",
      sub: [
        { id: "p6i1", label: "Lifecycle of Plastic Products" },
        { id: "p6i2", label: "Waste Management Hierarchy" },
        { id: "p6i3", label: "Plastic Recycling Value Chain" },
        { id: "p6i4", label: "Upstream vs Downstream Processes" },
        { id: "p6i5", label: "Sustainability & Lifecycle Thinking" },
        { id: "p6i6", label: "Strategies for Plastic Resource Recovery" },
        { id: "p6i7", label: "Circular Economy & Plastic Resource Recovery" },
        { id: "p6i8", label: "Key Technical Metrics in Resource Recovery" },
        { id: "p6i9", label: "From Linear to Circular Economy" },
        { id: "p6i10", label: "How Circular Economy Works" },
        { id: "p6i11", label: "Innovative Circular Business Models" },
        { id: "p6i12", label: "Plastic Recycling in Circular Economy" },
        { id: "p6i13", label: "Principles of Circular Economy" },
        { id: "p6i14", label: "Current Challenges in Plastic Circularity" },
        { id: "p6i15", label: "The Future of Plastic Economy" },
      ],
    },
    {
      to: "/page7",
      text: "Circular Economy",
      sub: [
        { id: "p7i1", label: "Role of Plastics in Circular Economy" },
        { id: "p7i2", label: "Key Strategies for Circular Plastics" },
        { id: "p7i3", label: "Objectives of Circular Economy for Plastics" },
        { id: "p7i4", label: "From Reactive to Proactive Systems" },
        { id: "p7i5", label: "Why Circular Economy Matters" },
        { id: "p7i6", label: "Industry Example: Sustainable Innovation" },
        { id: "p7i7", label: "The Way Forward" },
        { id: "p7i8", label: "Sustainable Packaging Strategies" },
        { id: "p7i9", label: "Innovation in Product Design" },
        { id: "p7i10", label: "Recapturing Packaging & Recycling" },
        { id: "p7i11", label: "Industry Collaboration & Global Initiatives" },
        { id: "p7i12", label: "Role of Government & Infrastructure" },
        { id: "p7i13", label: "Extended Producer Responsibility (EPR)" },
        { id: "p7i14", label: "Global Impact of Plastic Circular Economy" },
        { id: "p7i15", label: "Climate Change & Plastic Waste" },
        { id: "p7i16", label: "Benefits of Improved Plastic Management" },
        { id: "p7i17", label: "European Circular Economy Vision" },
        { id: "p7i18", label: "Example: UK Plastic Pact" },
        { id: "p7i19", label: "Case Study: Waste-Free Ontario" },
        { id: "p7i20", label: "Data-Driven Waste Management" },
        { id: "p7i21", label: "Key System Improvements Needed" },
        { id: "p7i22", label: "Local Action, Global Impact" },
        { id: "p7i23", label: "Collaboration & Innovation" },
      ],
    },
  ];

  return (
    <>
      {/* Floating Button */}
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          right: "20px",
          zIndex: 1050,
        }}
      >
        <Button
          variant="danger"
          onClick={handleShow}
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            fontSize: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.transform = "scale(1.1) rotate(10deg)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "scale(1) rotate(0deg)")
          }
        >
          ?
        </Button>
      </div>

      {/* Offcanvas */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ backgroundColor: "#111", color: "#fff" }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title style={{ color: "#ff4d4d" }}>
            Plastic Management
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="d-flex flex-column gap-3">

            {data.map((item, index) => (
              <div
                key={index}
                style={{ position: "relative" }}
              >
                {/* Main Link */}
                <Link
                  to={item.to}
                  onClick={(e) => {
                    // toggle dropdown instead of navigating immediately
                    if (activeIndex === index) {
                      setActiveIndex(null);
                    } else {
                      e.preventDefault(); // stop navigation
                      setActiveIndex(index);
                    }
                  }}
                  className="text-decoration-none"
                  style={{
                    color: "#ddd",
                    padding: "10px 12px",
                    display: "block",
                    borderRadius: "8px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "#222")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "transparent")
                  }
                >
                  {item.text} 
                </Link>

                {/* ✨ Subtopics */}
                <div
                  style={{
                    maxHeight: activeIndex === index ? "250px" : "0px",
                    opacity: activeIndex === index ? 1 : 0,
                    overflowY: "auto",
                    transition: "all 0.4s ease",
                  }}
                >
                  <div
                    style={{
                      marginLeft: "10px",
                      marginTop: "5px",
                      padding: "8px",
                      borderLeft: "2px solid #ff4d4d",
                      background: "#1a1a1a",
                      borderRadius: "6px",
                    }}
                  >
                    {item.sub.map((subItem, i) => (
                      <Link
                        key={i}
                        to={`${item.to}#${subItem.id}`}
                        onClick={handleClose}
                        style={{
                          display: "block",
                          fontSize: "13px",
                          color: "#aaa",
                          padding: "6px 8px",
                          borderRadius: "4px",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#ff4d4d";
                          e.target.style.color = "#fff";
                          e.target.style.transform = "translateX(5px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.color = "#aaa";
                          e.target.style.transform = "translateX(0)";
                        }}
                      >
                        ➤ {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;
