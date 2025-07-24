import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
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
  const [currentChatId, setCurrentChatId] = useState(selectedChat?._id);
socketService.onMessage((message) => {
  if (message.chat === currentChatId) {
    setMessages((prevMessages) => {
      const exists = prevMessages.some((m) => m._id === message._id);
      return exists ? prevMessages : [...prevMessages, message];
    });
  }
});

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
      if (!selectedChat?._id) return;
      setCurrentChatId(selectedChat?._id)
      try {
        const res = await API.get('/chat/getChatMessages', {
          params: { chatId: selectedChat._id },
        });

        if (res.data.success) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      }
    };

    fetchMessages();
  }, [selectedChat]);

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
  const displayName = selectedChat.isGroup ? selectedChat.groupName : otherParticipant?.name;
  const displayAvatar = (selectedChat.isGroup ? selectedChat.groupAvatar : otherParticipant?.avatar) || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png';

  return (
    <div className="d-flex flex-column w-100 h-100 position-relative">
      {/* Header */}
      <div className="bg-white border-bottom p-3 sticky-top">
        <Row className="align-items-center justify-content-between">
          <Col>
            <div className="d-flex align-items-center">
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
