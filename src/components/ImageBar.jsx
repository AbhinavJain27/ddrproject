import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function ImageBar({ images = [] }) {
  return (
    <Container className="text-center my-4">
      <Row className="justify-content-center">
        {images.map((img, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={images.length === 2 ? 5 : 4} 
            className="mb-3"
          >
            <Image
              src={`/${img}`}
              rounded
              fluid
              style={{
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ImageBar;