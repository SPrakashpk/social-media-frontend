import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

export const MessageBubble = ({ message, currentUser, sender }) => {
  const isOwn = message.sender && message.sender._id === currentUser.id;

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className={`d-flex mb-3 ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`${isOwn ? 'order-2' : 'order-1'}`} style={{ maxWidth: '70%' }}>
        {!isOwn && sender && (
          <div className="d-flex align-items-center mb-1">
            <img
              src={sender.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
              alt={sender.name}
              className="rounded-circle me-2"
              width="24"
              height="24"
              style={{ objectFit: 'cover' }}
            />
            <small className="fw-medium text-muted">{sender.name}</small>
          </div>
        )}

        <div className={`p-3 shadow-sm ${isOwn ? 'message-bubble-own' : 'message-bubble-other'}`}>
          <p className="mb-1 small" style={{ lineHeight: '1.4', wordBreak: 'break-word' }}>
            {message.content}
          </p>

          <div className={`d-flex align-items-center justify-content-end mt-1 ${isOwn ? 'text-white-50' : 'text-muted'
            }`}>
            <small style={{ fontSize: '0.7rem' }}>
              {formatTime(message.createdAt)}
            </small>
            {isOwn && (
              <div className="ms-1">
                {message.isRead ? (
                  <CheckCheck size={14} className="text-info" />
                ) : (
                  <Check size={14} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};