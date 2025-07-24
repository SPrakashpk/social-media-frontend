import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Phone, Video, MoreVertical } from 'lucide-react';

export const ChatArea = ({
  selectedChat,
  messages,
  currentUser,
  onSendMessage,
  onOpenUserRecommendations,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-grow-1 w-100 text-center p-5">
        <div>
          <div className="mb-4">
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

  const otherParticipant = selectedChat.participants.find(p => p.id !== currentUser.id);
  const displayName = selectedChat.isGroup ? selectedChat.groupName : otherParticipant?.name;
  const displayAvatar = selectedChat.isGroup ? selectedChat.groupAvatar : otherParticipant?.avatar;

  return (
    <div className="d-flex flex-column w-100 h-100 position-relative">
      {/* Chat Header */}
      <div className="bg-white border-bottom p-3 sticky-top">
        <Row className="align-items-center justify-content-between">
          <Col>
            <div className="d-flex align-items-center">
              <img
                src={displayAvatar}
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
                    ? `${selectedChat.participants.length} members`
                    : otherParticipant?.isOnline
                    ? 'Online'
                    : 'Last seen recently'}
                </small>
              </div>
            </div>
          </Col>

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
              const sender = selectedChat.participants.find(p => p.id === message.sender);
              return (
                <MessageBubble
                  key={message.id}
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
