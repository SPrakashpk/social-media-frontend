import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from './sidebar/ChatSidebar';
import { ChatArea } from './chatArea/ChatArea';
import { UserRecommendations } from './modals/UserRecommendation';
import { getChatList } from '../../services/chatService';
import { socketService } from '../../services/socketService';
import { getCurrentUser } from '../../services/authService';

export const ChatContainer = () => {
  const { chatId } = useParams();
  const [chatState, setChatState] = useState({
    chats: [],
    messages: {},
    selectedChatId: null,
    currentUser: getCurrentUser(),
    searchQuery: '',
    isUserRecommendationsOpen: false,
  });

  // Fetch chats and connect socket
  useEffect(() => {
    socketService.connect();
    socketService.joinUser(chatState.currentUser.id);

    const fetchChats = async () => {
      try {
        const chatListData = await getChatList(chatState.currentUser.id);
        const formattedChats = chatListData.data;
        setChatState(prev => {
          // If chatId is present in URL and valid, set as selectedChatId
          let selected = prev.selectedChatId;
          if (chatId && formattedChats.some(c => c._id === chatId)) {
            selected = chatId;
          }
          return {
            ...prev,
            chats: formattedChats,
            selectedChatId: selected,
          };
        });
      } catch (err) {
        console.error('Error fetching chats:', err);
      }
    };

    fetchChats();

    return () => {
      socketService.removeAllListeners();
      socketService.disconnect();
    };
  }, [chatState.currentUser.id, chatId]);

  const handleChatSelect = useCallback((chatId) => {
    setChatState(prev => {
      const updatedChats = prev.chats.map(chat =>
        chat._id === chatId ? { ...chat, unreadCount: 0 } : chat
      );
      return {
        ...prev,
        selectedChatId: chatId,
        chats: updatedChats,
      };
    });
  }, []);

  const handleSendMessage = useCallback((content) => {
    if (!chatState.selectedChatId || !chatState.currentUser) return;

    // Only emit to socket, do not update local state here. Let socket event update messages for all users including sender.
    socketService.sendMessage({
      chatId: chatState.selectedChatId,
      senderId: chatState.currentUser.id,
      content,
      type: 'text',
      mentions: [],
    });
  }, [chatState.selectedChatId, chatState.currentUser]);

  const handleSearchChange = useCallback((query) => {
    setChatState(prev => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const handleOpenUserRecommendations = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isUserRecommendationsOpen: true,
    }));
  }, []);

  const handleCloseUserRecommendations = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isUserRecommendationsOpen: false,
    }));
  }, []);

  const handleStartChat = useCallback((user) => {
    const existingChat = chatState.chats.find(chat =>
      !chat.isGroup && chat.participants.some(p => p.id === user.id)
    );

    if (existingChat) {
      handleChatSelect(existingChat.id);
    } else {
      const newChat = {
        id: `chat-${Date.now()}`,
        participants: [user, chatState.currentUser],
        lastMessage: null,
        unreadCount: 0,
        isGroup: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        chats: [newChat, ...prev.chats],
        selectedChatId: newChat.id,
        messages: {
          ...prev.messages,
          [newChat.id]: []
        }
      }));
    }

    handleCloseUserRecommendations();
  }, [chatState.chats, chatState.currentUser, handleChatSelect, handleCloseUserRecommendations]);

  const availableUsers = []

  const selectedChat = chatState.chats.find(chat => chat._id === chatState.selectedChatId);
  const selectedChatMessages = chatState.selectedChatId
    ? chatState.messages[chatState.selectedChatId] || []
    : [];

  return (
    <div className="d-flex w-100" style={{ maxHeight: '100vh',paddingTop: '70px', overflow: 'hidden' }}>
      <div className="border-end bg-light" style={{ width: '300px' }}>
        <Sidebar
          chats={chatState.chats}
          currentUser={chatState.currentUser}
          selectedChatId={chatState.selectedChatId}
          searchQuery={chatState.searchQuery}
          onChatSelect={handleChatSelect}
          onSearchChange={handleSearchChange}
        />
      </div>

      <div className="flex-grow-1 position-relative overflow-hidden">
        <ChatArea
          selectedChat={selectedChat}
          messages={selectedChatMessages}
          currentUser={chatState.currentUser}
          onSendMessage={handleSendMessage}
          onOpenUserRecommendations={handleOpenUserRecommendations}
        />

        {chatState.isUserRecommendationsOpen && (
          <div
            className="position-absolute bg-white border shadow"
            style={{
              top: '20px',
              right: '20px',
              width: '300px',
              height: 'calc(100% - 40px)',
              zIndex: 10,
              overflowY: 'auto'
            }}
          >
            <UserRecommendations
              isOpen={chatState.isUserRecommendationsOpen}
              users={availableUsers}
              onClose={handleCloseUserRecommendations}
              onStartChat={handleStartChat}
            />
          </div>
        )}
      </div>
    </div>
  );
};
