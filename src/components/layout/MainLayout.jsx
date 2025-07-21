import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Rightbar from '../Rightbar'

const MainLayout = ({ children }) => (
  <Container fluid className="bg-light min-vh-100 d-flex flex-column px-0">
    
    {/* Header Row */}
    <Row className="flex-shrink-0">
      <Col className="px-0">
        <Header />
      </Col>
    </Row>

    {/* Content Row */}
    <Row className="flex-grow-1 mt-3 g-0" style={{top: '57px',position: 'relative' }}>
      <Col xs={2} md={2} className="border-end px-0">
        <Sidebar />
      </Col>
      <Col xs={7} md={7} className="px-3 overflow-auto">
        <main>{children}</main>
      </Col>
      <Col xs={3} md={3} className="border-start px-0">
        <Rightbar />
      </Col>
    </Row>

  </Container>
)

export default MainLayout
