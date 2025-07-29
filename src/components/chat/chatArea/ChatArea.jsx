import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axios from '../../../api/axios.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Phone, Video, MoreVertical } from 'lucide-react';
import API from '../../../api/axios.js'
import { socketService } from '../../../services/socketService.js';

export const ChatArea = ({
  selectedChat,
  currentUser,
  onSendMessage,
  onOpenUserRecommendations,
}) => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();

// Listen for new messages
useEffect(() => {
  const handleMessage = (message) => {
    if (message.chat === chatId) {
      setMessages((prevMessages) => {
        const exists = prevMessages.some((m) => m._id === message._id);
        return exists ? prevMessages : [...prevMessages, message];
      });
    }
  };
  socketService.onMessage(handleMessage);
  return () => socketService.removeAllListeners();
}, [chatId]);

// Listen for message status updates (delivered/read)
useEffect(() => {
  const handleStatusUpdate = ({ messageId, status }) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === messageId ? { ...msg, status } : msg
      )
    );
  };
  if (socketService.socket) {
    socketService.socket.on('message:status', handleStatusUpdate);
  }
  return () => {
    if (socketService.socket) {
      socketService.socket.off('message:status', handleStatusUpdate);
    }
  };
}, []);

  // Scroll to bottom when messages update
useEffect(() => {
  const el = messagesEndRef.current;
  if (!el) return;

  const container = el.parentNode;
  const isNearBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight < 200;

  el.scrollIntoView({
    behavior: isNearBottom ? 'smooth' : 'auto',
    block: 'end',
  });
}, [messages]);


  // Fetch messages when chat changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) return;
      try {
        const res = await API.get('/chat/getChatMessages', {
          params: { chatId },
        });

        if (res.data.success) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();
  }, [chatId]);

  if (!selectedChat) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-grow-1 w-100 text-center p-5">
        <div>
          <div className="mb-4">
            {/* icon */}
            <svg
              width="80"
              height="80"
              fill="currentColor"
              className="text-success"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h4 className="text-muted mb-2">Welcome to WhatsApp Web</h4>
          <p className="text-muted mb-4">
            Select a chat to start messaging, or create a new conversation.
          </p>
          <Button
            onClick={onOpenUserRecommendations}
            variant="success"
            className="rounded-pill px-4 shadow"
          >
            Send Message
          </Button>
        </div>
      </div>
    );
  }

  const otherParticipant = selectedChat.members.find(p => p._id !== currentUser.id);
  const displayName = selectedChat.isGroup ? selectedChat.name : otherParticipant?.name;
  const displayAvatar = (selectedChat.isGroup ? selectedChat.groupAvatar : otherParticipant?.avatar) || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png';

  // Check if current user is admin in group
  const isAdmin = selectedChat.isGroup && (selectedChat.admins?.some(a => a._id === currentUser.id) || selectedChat.roles?.some(r => r.user === currentUser.id && r.role === 'admin'));

  const handleHeaderClick = () => {
    if (selectedChat.isGroup) {
      setShowMembersModal(true);
    } else if (!selectedChat.isGroup && otherParticipant?._id) {
      navigate(`/profile/${otherParticipant._id}`);
    }
  };

  return (
    <div className="d-flex flex-column w-100 h-100 position-relative">
      {/* Header */}
      <div className="bg-white border-bottom p-3 sticky-top">
        <Row className="align-items-center justify-content-between">
          <Col>
            <div
              className="d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={handleHeaderClick}
            >
              <img
                src={displayAvatar || null}
                alt={displayName}
                className="rounded-circle me-3"
                width="40"
                height="40"
                style={{ objectFit: 'cover' }}
              />
              <div>
                <h6 className="mb-0 fw-semibold">{displayName}</h6>
                <small className="text-muted">
                  {selectedChat.isGroup
                    ? `${selectedChat.members.length} members`
                    : otherParticipant?.isOnline
                      ? 'Online'
                      : 'Last seen recently'}
                </small>
              </div>
            </div>
          </Col>
      {/* Group Members Modal */}
      {selectedChat.isGroup && (
        <Modal show={showMembersModal} onHide={() => setShowMembersModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Group Members</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="list-unstyled">
              {selectedChat.members.map(member => {
                const isMemberAdmin = (selectedChat.admins?.some(a => a._id === member._id) || selectedChat.roles?.some(r => r.user === member._id && r.role === 'admin'));
                const isCurrent = member._id === currentUser.id;
                return (
                  <li key={member._id} className="d-flex align-items-center mb-2">
                    <img src={member.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'} alt={member.name} className="rounded-circle me-2" width="32" height="32" />
                    <span className="me-auto">
                      {isCurrent ? 'You' : member.name}
                      {isMemberAdmin && (
                        <span className="badge bg-warning text-dark ms-2" style={{ fontSize: '0.7em' }}>Admin</span>
                      )}
                    </span>
                    {isAdmin && !isCurrent && (
                      <Button size="sm" variant="danger" className="ms-2">Remove</Button>
                    )}
                  </li>
                );
              })}
            </ul>
            {isAdmin && (
              <Button variant="outline-primary" className="w-100 mt-2">+ Add Member</Button>
            )}
          </Modal.Body>
        </Modal>
      )}
          <Col xs="auto">
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                <Phone size={16} />
              </Button>
              <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                <Video size={16} />
              </Button>
              <Button variant="outline-secondary" size="sm" className="rounded-circle p-2">
                <MoreVertical size={16} />
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Messages */}
      <div className="flex-grow-1 overflow-auto px-3 py-2" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {messages.length > 0 ? (
          <>
            {messages.map((message) => {
              const sender = typeof message.sender === 'string'
                ? selectedChat.members.find(p => p._id === message.sender)
                : message.sender;

              return (
                <MessageBubble
                  key={message._id}
                  message={message}
                  currentUser={currentUser}
                  sender={sender}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100">
            <p className="text-muted">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-2 border-top bg-white">
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};
