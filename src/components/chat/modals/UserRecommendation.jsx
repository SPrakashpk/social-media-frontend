import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { MessageCircle } from 'lucide-react';

export const UserRecommendations = ({
  isOpen,
  users,
  onClose,
  onStartChat,
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Start New Chat</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <p className="text-muted mb-3">Choose a user to start chatting with:</p>
        
        <ListGroup variant="flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {users.map((user) => (
            <ListGroup.Item
              key={user.id}
              action
              onClick={() => onStartChat(user)}
              className="d-flex align-items-center p-3 border-0 rounded mb-2"
              style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
            >
              <div className="position-relative me-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-circle"
                  width="40"
                  height="40"
                  style={{ objectFit: 'cover' }}
                />
                {user.isOnline && (
                  <div className="online-indicator"></div>
                )}
              </div>
              
              <div className="flex-grow-1">
                <h6 className="mb-0 fw-medium">{user.name}</h6>
                <small className="text-muted">
                  {user.isOnline ? 'Online' : 'Last seen recently'}
                </small>
              </div>
              
              <MessageCircle size={20} className="whatsapp-green-text" />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};