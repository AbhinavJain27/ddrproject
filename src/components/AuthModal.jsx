import Modal from "react-bootstrap/Modal";
import AuthFormPanel from "./AuthFormPanel";

function AuthModal({ show, onHide, onSuccess }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ borderBottom: "1px solid #edf3ee", paddingBottom: "10px" }}>
        <Modal.Title style={{ color: "#1f2d3d", fontWeight: "700" }}>Confirm Your Identity</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background:
            "radial-gradient(circle at top left, rgba(31, 154, 93, 0.14), transparent 36%), linear-gradient(135deg, #eefaf1 0%, #f7fcf8 45%, #ffffff 100%)",
          padding: "24px",
        }}
      >
        <div style={{ marginBottom: "18px" }}>
          <h3 style={{ color: "#146c43", marginBottom: "8px" }}>Sign in before using campaign tools</h3>
          <p style={{ margin: 0, color: "#5b5b5b", lineHeight: "1.7" }}>
            Once you confirm your identity, this page will load your active campaign count and save
            it against your profile.
          </p>
        </div>
        <AuthFormPanel compact onSuccess={onSuccess} />
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
