import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function ShapeExample() {
  return (
    <Container className="text-center">
        <Image src="/iitdimage.png" roundedCircle fluid className="logo-animate" />

        <h1 className="mt-3 fw-bold">
            Indian Institute of Technology, Delhi
        </h1>

        <br /><br />
    </Container>
  );
}

export default ShapeExample;