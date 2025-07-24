export const mockUsers = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '3',
    name: 'Carol Davis',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
  },
  {
    id: '4',
    name: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '5',
    name: 'Eve Brown',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
  },
];

export const currentUser = {
  id: 'current',
  name: 'You',
  avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  isOnline: true,
};

export const mockMessages = [
  {
    id: '1',
    senderId: '1',
    receiverId: 'current',
    content: 'Hey! How are you doing?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isRead: false,
    type: 'text',
  },
  {
    id: '2',
    senderId: 'current',
    receiverId: '1',
    content: 'I\'m doing great! Thanks for asking. How about you?',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    isRead: true,
    type: 'text',
  },
  {
    id: '3',
    senderId: '1',
    receiverId: 'current',
    content: 'Fantastic! Are we still on for the meeting tomorrow?',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isRead: false,
    type: 'text',
  },
  {
    id: '4',
    senderId: '2',
    receiverId: 'current',
    content: 'The project looks amazing! Great work on the design.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isRead: false,
    type: 'text',
  },
  {
    id: '5',
    senderId: 'current',
    receiverId: '2',
    content: 'Thank you so much! I really appreciate the feedback.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isRead: true,
    type: 'text',
  },
  {
    id: '6',
    senderId: '3',
    receiverId: 'current',
    content: 'Can you send me the documents we discussed?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    type: 'text',
  },
];

export const mockChats = [
  {
    id: 'chat-1',
    participants: [mockUsers[0], currentUser],
    lastMessage: mockMessages[2],
    unreadCount: 2,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'chat-2',
    participants: [mockUsers[1], currentUser],
    lastMessage: mockMessages[3],
    unreadCount: 1,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: 'chat-3',
    participants: [mockUsers[2], currentUser],
    lastMessage: mockMessages[5],
    unreadCount: 1,
    isGroup: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'group-1',
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], currentUser],
    lastMessage: {
      id: 'group-msg-1',
      senderId: '1',
      receiverId: 'group-1',
      content: 'Let\'s schedule our next team meeting',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      isRead: false,
      type: 'text',
    },
    unreadCount: 3,
    isGroup: true,
    groupName: 'Project Team',
    groupAvatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120),
  },
];

export const initialChatState = {
  chats: mockChats,
  selectedChatId: null,
  messages: {
    'chat-1': [mockMessages[0], mockMessages[1], mockMessages[2]],
    'chat-2': [mockMessages[3], mockMessages[4]],
    'chat-3': [mockMessages[5]],
  },
  currentUser,
  searchQuery: '',
  isUserRecommendationsOpen: false,
};