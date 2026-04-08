import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
  return (
    <Carousel interval={1500}>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/sumersingh1.jpg"
          alt="First slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>PROF. SUMER SINGH - IIT DELHI </h3>
          <p>DEPARTMENT OF DESIGN</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/sumersingh2.jpg"
          alt="Second slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>PROF. SUMER SINGH - IIT DELHI </h3>
          <p>DEPARTMENT OF DESIGN</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/sumersingh3.jpg"
          alt="Third slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>PROF. SUMER SINGH - IIT DELHI </h3>
          <p>DEPARTMENT OF DESIGN</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default UncontrolledExample;