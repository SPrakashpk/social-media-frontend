import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChatList } from "../services/chatService";

const Sidebar = () => {
  const userId = JSON.parse(localStorage.getItem('user'))?.id;
  const [groupChats, setGroupChats] = useState([]);
  const navigate = useNavigate();
  const { chatId } = useParams();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await getChatList(userId);
        const groups = (res.data || []).filter(chat => chat.isGroup);
        setGroupChats(groups);
      } catch (err) {
        setGroupChats([]);
      }
    };
    if (userId) fetchGroups();
  }, [userId]);

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
          {groupChats.length === 0 && (
            <Nav.Link className="text-muted pl-40px" disabled>No groups</Nav.Link>
          )}
          {groupChats.map(group => (
            <Nav.Link
              key={group._id}
              className={`text-dark pl-40px${chatId === group._id ? ' active' : ''}`}
              as={Link}
              to={`/messages/${group._id}`}
            >
              {group.name || 'Unnamed Group'}
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </Navbar>
  );
};

export default Sidebar;
