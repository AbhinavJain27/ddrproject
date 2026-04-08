import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
  return (
    <Carousel interval={1500}>

        <Carousel.Item>
        <img
          className="d-block w-100"
          src="/kartik.jpg"
          alt="Sixth slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>KARTIK MITTAL - IIT DELHI </h3>
          <p>DEPARTMENT OF CIVIL ENGINNERING</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/kavya.jpg"
          alt="First slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>KAVYA BUNAS - IIT DELHI </h3>
          <p>DEPARTMENT OF CIVIL ENGINNERING</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/mehul.jpg"
          alt="Second slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>MEHUL - IIT DELHI </h3>
          <p>DEPARTMENT OF CIVIL ENGINNERING</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/shiv.png"
          alt="Third slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>SHIV KUMAR - IIT DELHI </h3>
          <p>DEPARTMENT OF CIVIL ENGINNERING</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/hardik.jpg"
          alt="Fourth slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>HARDIK - IIT DELHI </h3>
          <p>DEPARTMENT OF CIVIL ENGINNERING</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/aakash.jpg"
          alt="Fifth slide"
          style={{ height: "400px", objectFit: "contain", backgroundColor: "#000" }}
        />
        <Carousel.Caption>
          <h3>AAKASH - IIT DELHI </h3>
          <p>DEPARTMENT OF CIVIL ENGINNERING</p>
        </Carousel.Caption>
      </Carousel.Item>

      

    </Carousel>
  );
}

export default UncontrolledExample;