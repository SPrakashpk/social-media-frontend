import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';

export const ChatItem = ({ chat, currentUser, isSelected, onClick }) => {
  const otherParticipant = chat.members.find(p => p._id !== currentUser.id);
  const displayName = chat.isGroup ? chat.name : otherParticipant?.name;
  const displayAvatar = (chat.isGroup ? chat.groupAvatar : otherParticipant?.avatar) || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png';

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  const truncateMessage = (message, maxLength = 35) => {
    if (!message) return '';
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  const lastMsg = chat.latestMessage;
  const isOwnMsg = lastMsg?.sender === currentUser.id || lastMsg?.sender?._id === currentUser.id;

  return (
    <div
      onClick={onClick}
      className={`chat-item p-3 ${isSelected ? 'active' : ''}`}
      data-last={chat.isLast ? 'true' : undefined}
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
              {/* Last message text below name */}
              {lastMsg?.content && (
                <small className="text-muted text-truncate d-block" style={{ maxWidth: 180 }}>
                  {lastMsg.content}
                </small>
              )}
            </Col>

            {lastMsg?.createdAt && (
              <Col xs="auto">
                <small className="text-muted">{formatTime(lastMsg.createdAt)}</small>
              </Col>
            )}
          </Row>

          {/* Last message hidden as per requirements */}
          <Row className="justify-content-between align-items-center mt-1">
            <Col></Col>
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
