import Image from 'react-bootstrap/Image';

function ImageSection({ src, alt = "image", className = "" }) {
  return (
    <div className="text-center">
      <Image
        src={`/${src}`}
        alt={alt}
        fluid
        className={className}
        style={{
          maxWidth: "400px",   // 👈 control size here
          width: "100%",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
      />
    </div>
  );
}

export default ImageSection;