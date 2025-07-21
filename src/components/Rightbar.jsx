import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const Rightbar = () => (
  <div className="d-flex flex-column gap-3 p-3 h-100 bg-white">
    <Card>
      <Card.Body>
        <Card.Title className="fs-6">Community chats</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Dog Lovers</ListGroup.Item>
          <ListGroup.Item>Copenhagen friends</ListGroup.Item>
          <ListGroup.Item>Y2K Car owners</ListGroup.Item>
        </ListGroup>
        </Card.Body>
    </Card>
    <Card>
        <Card.Body>
        <Card.Title className="fs-6 mt-3">Group chats</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Grill party org</ListGroup.Item>
          <ListGroup.Item>Sneaker freaks</ListGroup.Item>
          <ListGroup.Item>Music in the city</ListGroup.Item>
          <ListGroup.Item>School org</ListGroup.Item>
        </ListGroup>
        </Card.Body>
        </Card>
        <Card>
            <Card.Body>
        <Card.Title className="fs-6 mt-3">Online contacts</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Mark Larsen</ListGroup.Item>
          <ListGroup.Item>Ethan Reynolds</ListGroup.Item>
          <ListGroup.Item>Ava Thompson</ListGroup.Item>
          <ListGroup.Item>Haarper Mitchell</ListGroup.Item>
          <ListGroup.Item>Pablo Morandi</ListGroup.Item>
          <ListGroup.Item>Isabel Hughes</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  </div>
)

export default Rightbar
