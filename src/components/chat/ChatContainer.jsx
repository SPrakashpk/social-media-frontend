import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Sidebar } from './sidebar/ChatSidebar';
import { ChatArea } from './chatArea/ChatArea';
import { UserRecommendations } from './modals/UserRecommendation';
import { getChatList } from '../../services/chatService';
import { socketService } from '../../services/socketService';
import { getCurrentUser } from '../../services/authService';
import API from '../../api/axios';

export const ChatContainer = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [chatState, setChatState] = useState({
    chats: [],
    messages: {},
    selectedChatId: chatId || null,
    currentUser: getCurrentUser(),
    searchQuery: '',
    isUserRecommendationsOpen: false,
  });
  const fetchChats = async () => {
    try {
      const chatListData = await getChatList(chatState.currentUser.id);
      const formattedChats = chatListData.data;
      setChatState(prev => ({
        ...prev,
        chats: formattedChats,
      }));
    } catch (err) {
      console.error('Error fetching chats:', err);
    }
  };
  // Fetch chats and connect socket
  useEffect(() => {
    socketService.connect();
    socketService.joinUser(chatState.currentUser.id);



    fetchChats();

    return () => {
      socketService.removeAllListeners();
      socketService.disconnect();
    };
  }, [chatState.currentUser.id]);

  // Update selectedChatId when chatId in URL changes
  useEffect(() => {
    if (chatId) {
      setChatState(prev => ({
        ...prev,
        selectedChatId: chatId,
      }));
    }
  }, [chatId]);

  // Fetch messages when selectedChatId changes
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!chatState.selectedChatId) return;
      try {
        const res = await API.get(`/chat/messages/${chatState.selectedChatId}`);
        setChatState(prev => ({
          ...prev,
          messages: {
            ...prev.messages,
            [chatState.selectedChatId]: res.data.messages,
          },
        }));
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    };
    fetchChatMessages();
  }, [chatState.selectedChatId]);


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

  const handleStartChat = useCallback(async (user) => {
    // Use backend to get or create chat and return chatId
    try {
      const res = await sendMessage(chatState.currentUser.id, user.id, '');
      const chatIdFromBackend = res.chatId || res.data?.chatId;
      if (chatIdFromBackend) {
        navigate(`/messages/${chatIdFromBackend}`);
        setChatState(prev => ({
          ...prev,
          selectedChatId: chatIdFromBackend,
        }));
      }
    } catch (err) {
      console.error('Error starting chat:', err);
    }
    handleCloseUserRecommendations();
  }, [chatState.currentUser, navigate, handleCloseUserRecommendations]);

  const availableUsers = []

  const selectedChat = chatState.chats.find(chat => chat._id === chatState.selectedChatId);
  const selectedChatMessages = chatState.selectedChatId
    ? chatState.messages[chatState.selectedChatId] || []
    : [];

  return (
    <div className="d-flex w-100" style={{ maxHeight: '100vh', paddingTop: '70px', overflow: 'hidden' }}>
      <div className="border-end bg-light" style={{ width: '300px' }}>
        <Sidebar
          chats={chatState.chats}
          currentUser={chatState.currentUser}
          selectedChatId={chatState.selectedChatId}
          searchQuery={chatState.searchQuery}
          onChatSelect={handleChatSelect}
          onSearchChange={handleSearchChange}
          onChatListRefresh={fetchChats}
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
