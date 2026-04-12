import Modal from "react-bootstrap/Modal";

function ImagePreviewModal({ show, onHide, src, alt }) {
  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton style={{ borderBottom: "1px solid #edf3ee" }}>
        <Modal.Title style={{ color: "#1f2d3d", fontWeight: "700" }}>Full Image</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          padding: "18px",
          background: "#f7fbf8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Preview"}
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "80vh",
              width: "auto",
              height: "auto",
              borderRadius: "12px",
              boxShadow: "0 14px 32px rgba(0, 0, 0, 0.16)",
              background: "#fff",
            }}
          />
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

export default ImagePreviewModal;
