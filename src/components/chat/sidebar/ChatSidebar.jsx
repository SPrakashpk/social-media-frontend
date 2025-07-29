import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ChatItem } from './ChatItem';
import { Modal, Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';

export const Sidebar = ({
  chats,
  currentUser,
  selectedChatId,
  searchQuery,
  onChatSelect,
  onSearchChange,
  followingUsers = [],
  onStartChat,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();
  const filteredChats = chats.filter(chat => {
    const otherUser = chat.members.find(m => m._id !== currentUser._id);
    const searchLower = searchQuery.toLowerCase();

    return (
      !searchQuery ||
      otherUser?.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="chat-sidebar d-flex flex-column" style={{ width: '300px', height: '100vh', borderRight: '1px solid #ddd' }}>
      {/* Header */}
      <div className="chat-header p-3 border-bottom d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={currentUser.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
            alt={currentUser.name}
            className="rounded-circle me-3"
            width="40"
            height="40"
          />
          <div>
            <h6 className="mb-0">{currentUser.name}</h6>
            <small className="text-muted">Chats</small>
          </div>
        </div>
        <Button variant="outline-primary" size="sm" className="rounded-circle p-1 d-flex align-items-center justify-content-center" onClick={() => setShowModal(true)} title="New Chat">
          <Plus size={20} />
        </Button>
      </div>

      {/* Search */}
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

      {/* Chat list */}
      <div className="flex-grow-1 overflow-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <ChatItem
              key={chat._id}
              chat={chat}
              currentUser={currentUser}
              isSelected={chatId === chat._id}
              onClick={() => {
                navigate(`/messages/${chat._id}`);
                if (onChatSelect) onChatSelect(chat._id);
              }}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted">
            {searchQuery ? 'No chats found' : 'No chats available'}
          </div>
        )}
      </div>

      {/* Modal for new chat */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Start New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {followingUsers.length === 0 ? (
            <div className="text-muted">You are not following anyone.</div>
          ) : (
            <ul className="list-unstyled">
              {followingUsers.map(user => (
                <li key={user._id} className="d-flex align-items-center mb-2">
                  <img src={user.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'} alt={user.name} className="rounded-circle me-2" width="32" height="32" />
                  <span className="me-auto">{user.name}</span>
                  <Button size="sm" variant="primary" onClick={() => { onStartChat(user); setShowModal(false); }}>Chat</Button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
