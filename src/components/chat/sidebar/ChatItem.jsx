import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';

export const ChatItem = ({ chat, currentUser, isSelected, onClick }) => {
  const otherParticipant = chat.participants.find(p => p.id !== currentUser.id);
  const displayName = chat.isGroup ? chat.groupName : otherParticipant?.name;
  const displayAvatar = chat.isGroup ? chat.groupAvatar : otherParticipant?.avatar;
  
  const formatTime = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes > 0 ? `${minutes}m` : 'now';
    }
  };

  const truncateMessage = (message, maxLength = 35) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  return (
    <div
      onClick={onClick}
      className={`chat-item p-3 ${isSelected ? 'active' : ''}`}
    >
      <Row className="align-items-center">
        <Col xs="auto">
          <div className="position-relative">
            <img
              src={displayAvatar}
              alt={displayName}
              className="rounded-circle"
              width="50"
              height="50"
              style={{ objectFit: 'cover' }}
            />
            {!chat.isGroup && otherParticipant?.isOnline && (
              <div className="online-indicator"></div>
            )}
          </div>
        </Col>
        
        <Col>
          <Row className="justify-content-between align-items-start">
            <Col>
              <h6 className="mb-0 fw-semibold text-truncate">{displayName}</h6>
            </Col>
            {chat.lastMessage && (
              <Col xs="auto">
                <small className="text-muted">
                  {formatTime(chat.lastMessage.timestamp)}
                </small>
              </Col>
            )}
          </Row>
          
          <Row className="justify-content-between align-items-center mt-1">
            <Col>
              <small className="text-muted text-truncate d-block">
                {chat.lastMessage ? (
                  <>
                    {chat.isGroup && chat.lastMessage.sender !== currentUser.id && (
                      <span className="fw-medium">
                        {chat.participants.find(p => p.id === chat.lastMessage?.sender)?.name?.split(' ')[0]}:{' '}
                      </span>
                    )}
                    {chat.lastMessage.sender === currentUser.id && <span className="text-muted">You: </span>}
                    {truncateMessage(chat.lastMessage.content)}
                  </>
                ) : (
                  'No messages yet'
                )}
              </small>
            </Col>
            
            {chat.unreadCount > 0 && (
              <Col xs="auto">
                <Badge className="unread-badge">
                  {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                </Badge>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};