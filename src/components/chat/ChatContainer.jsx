import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './Sidebar/ChatSidebar';
import { ChatArea } from './chatArea/ChatArea';
import { UserRecommendations } from './modals/UserRecommendation';
import { mockUsers } from '../data/mockData';
import { getChatList } from '../../services/chatService';
import { socketService } from '../../services/socketService';
import { getCurrentUser } from '../../services/authService';

export const ChatContainer = () => {
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
        const formattedChats = chatListData.data.map(chat => ({
          ...chat,
          id: chat._id,
          participants: chat.members.map(m => ({
            id: m._id,
            name: m.name,
            avatar: m.avatar,
          })),
          unreadCount: 0,
          lastMessage: null,
        }));

        setChatState(prev => ({
          ...prev,
          chats: formattedChats,
        }));
      } catch (err) {
        console.error('Error fetching chats:', err);
      }
    };

    fetchChats();

    socketService.onMessage((message) => {
      console.log('on message reacived : ', message)
      setChatState(prev => ({
        ...prev,
        messages: {
          ...prev.messages,
          [message.chatId]: [...(prev.messages[message.chat] || []), message.content]
        }
      }));
    });

    return () => {
      socketService.removeAllListeners();
      socketService.disconnect();
    };
  }, [chatState.currentUser.id]);

  const handleChatSelect = useCallback((chatId) => {
    setChatState(prev => {
      const updatedChats = prev.chats.map(chat =>
        chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
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

    const newMessage = {
      id: Date.now().toString(),
      sender: chatState.currentUser.id,
      chatId: chatState.selectedChatId,
      content,
      timestamp: new Date(),
      isRead: false,
      type: 'text',
    };

    setChatState(prev => ({
      ...prev,
      messages: {
        ...prev.messages,
        [prev.selectedChatId]: [...(prev.messages[prev.selectedChatId] || []), newMessage]
      },
      chats: prev.chats.map(chat =>
        chat.id === prev.selectedChatId
          ? { ...chat, lastMessage: newMessage, updatedAt: new Date() }
          : chat
      )
    }));

    socketService.sendMessage(newMessage);
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

  const availableUsers = mockUsers.filter(user => {
    const existingChatUserIds = chatState.chats
      .filter(chat => !chat.isGroup)
      .flatMap(chat => chat.participants.map(p => p.id));

    return user.id !== chatState.currentUser.id &&
      !existingChatUserIds.includes(user.id);
  });

  const selectedChat = chatState.chats.find(chat => chat.id === chatState.selectedChatId);
  const selectedChatMessages = chatState.selectedChatId
    ? chatState.messages[chatState.selectedChatId] || []
    : [];

  return (
    <div className="d-flex w-100" style={{ maxHeight: '100vh' }}>
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
