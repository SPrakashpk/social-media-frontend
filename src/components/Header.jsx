import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FaBell } from 'react-icons/fa';

const Header = ({ isLoggedIn, onLogout }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout(); // Optional parent callback
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar bg="white" fixed="top" expand="md" className="border-bottom shadow-sm" style={{ padding: '10px' }}>
      <Container fluid>
        <Navbar.Brand className="text-primary fw-bold fs-3"  onClick={() => navigate('/home')}>Chirp</Navbar.Brand>

        {isLoggedIn && user && (
          <>
            <Form className="d-none d-md-block mx-auto" style={{ width: '300px' }}>
              <Form.Control type="text" placeholder="Type in search" />
            </Form>

            <div className="d-flex align-items-center gap-3 ms-auto">
              <div className="position-relative">
                <FaBell size={22} />
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  3
                </Badge>
              </div>

              <div
                className="d-flex align-items-center gap-2"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/profile/${user.id || user._id}`)}
              >
                <Image
                  src={user.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
                  roundedCircle
                  width={36}
                  height={36}
                />
                <span className="fw-semibold">{user.name || 'User'}</span>
              </div>

              <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
