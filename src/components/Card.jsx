import Card from 'react-bootstrap/Card';

function TextExample({ title, subtitle, description }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {subtitle}
        </Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TextExample;