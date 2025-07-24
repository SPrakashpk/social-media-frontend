import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'
import { FaBell } from 'react-icons/fa'

const Header = () => (
  <Navbar bg="white" fixed='top' expand="md" className="border-bottom shadow-sm" style={{padding:'10px'}}>
    <Container fluid>
      <Navbar.Brand className="text-primary fw-bold fs-3">Chirp</Navbar.Brand>
      <Form className="d-none d-md-block mx-auto" style={{width: '300px'}}>
        <Form.Control type="text" placeholder="Type in search" />
      </Form>
      <div className="d-flex align-items-center gap-3 ms-auto">
        <div className="position-relative">
          <FaBell size={22} />
          <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
            3
          </Badge>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Image src="https://randomuser.me/api/portraits/men/32.jpg" roundedCircle width={36} height={36} />
          <span className="fw-semibold">Robert</span>
        </div>
      </div>
    </Container>
  </Navbar>
)

export default Header
