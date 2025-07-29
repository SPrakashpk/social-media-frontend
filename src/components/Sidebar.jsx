import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  return (
    <Navbar
      bg="white"
      expand="md"
      className="flex-column align-items-start px-3 py-4 border-end position-sticky overflow-auto"
      style={{ top: 0, height: "100vh", width: "100%" }}
    >
      <Nav className="flex-column w-100 sidebar-nav">
        <Nav.Link as={Link} to="/" className="text-dark pl-40px">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to={`/profile/${userId}`} className="text-dark pl-40px">
          Profile
        </Nav.Link>
        <Nav.Link as={Link} to={`/profile/j8kCD0CdihXt`} className="text-dark pl-40px">
          ganesh
        </Nav.Link>
        <Nav.Link as={Link} to="/messages" className="text-dark pl-40px">
          Messages
        </Nav.Link>
        <Nav.Link as={Link} to="/settings" className="text-dark pl-40px">
          Settings
        </Nav.Link>
      </Nav>

      <div className="mt-4 w-100">
        <div className="fw-semibold mb-2 pl-40px">Groups</div>
        <Nav className="flex-column">
          <Nav.Link className="text-dark pl-40px">Dog Lovers</Nav.Link>
          <Nav.Link className="text-dark pl-40px">GamerZzZ</Nav.Link>
          <Nav.Link className="text-dark pl-40px">Travel Girls</Nav.Link>
          <Nav.Link className="text-dark pl-40px">cat memez</Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Sidebar;
