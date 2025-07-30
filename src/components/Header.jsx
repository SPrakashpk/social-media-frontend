import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FaBell } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchNotifications, markNotificationsRead } from '../services/notificationService';

const Header = ({ isLoggedIn, onLogout }) => {
  const [user, setUser] = useState(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const navigate = useNavigate();
  const handleBellClick = async () => {
    setShowNotifModal(true);
    setLoadingNotif(true);
    try {
      const res = await fetchNotifications();
      setNotifications(res.data.data || []);
      await markNotificationsRead();
    } catch {}
    setLoadingNotif(false);
  };

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
              <div className="position-relative" style={{ cursor: 'pointer' }} onClick={handleBellClick}>
                <FaBell size={22} />
                {notifications.some(n => !n.read) && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                )}
              </div>
      <Modal show={showNotifModal} onHide={() => setShowNotifModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: 200 }}>
          {loadingNotif ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 100 }}>
              <span>Loading...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center text-muted">No notifications</div>
          ) : (
            <ListGroup variant="flush">
              {notifications.map((notif, idx) => (
                <ListGroup.Item
                  key={notif._id || idx}
                  style={{ background: notif.read ? '#fff' : '#f0f4ff' }}
                  className="d-flex flex-column gap-1"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">{notif.senderName || 'Unknown'}</span>
                    <span className="text-muted small">{new Date(notif.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="text-secondary small">{notif.type}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
      </Modal>

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
