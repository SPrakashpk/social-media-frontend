import React from 'react';
import { SearchBar } from './SearchBar';
import { ChatItem } from './ChatItem';

export const Sidebar = ({
  chats,
  currentUser,
  selectedChatId,
  searchQuery,
  onChatSelect,
  onSearchChange,
}) => {
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
      <div className="chat-header p-3 border-bottom d-flex align-items-center">
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
              isSelected={selectedChatId === chat._id}
              onClick={() => onChatSelect(chat._id)}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted">
            {searchQuery ? 'No chats found' : 'No chats available'}
          </div>
        )}
      </div>
    </div>
  );
};
