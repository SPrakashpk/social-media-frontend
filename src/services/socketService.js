import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect(serverUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000') {
    console.log('connecting to server : ', serverUrl)
    if (this.socket) return;

    this.socket = io(serverUrl, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('⚠️ Connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Join as a user
  joinUser(userId) {
    console.log('joining user : ', userId, this.socket)
    if (this.socket) {
      this.socket.emit('user:join', userId);
    }
  }

  // Send message
  sendMessage({ chatId, senderId, content, type = 'text', mentions = [] }) {
    console.log(chatId, senderId, content, type = 'text', mentions = [])
    if (this.socket) {
      this.socket.emit('message:send', { chatId, senderId, content, type, mentions });
    }
  }

  // Receive message
  onMessage(callback) {
    if (this.socket) {
      this.socket.on('message:receive', callback);
    }
  }

  // Typing start/stop
  sendTypingStart(chatId, userId) {
    if (this.socket) {
      this.socket.emit('typing:start', { chatId, userId });
    }
  }

  sendTypingStop(chatId, userId) {
    if (this.socket) {
      this.socket.emit('typing:stop', { chatId, userId });
    }
  }

  onTypingUpdate(callback) {
    if (this.socket) {
      this.socket.on('typing:update', callback);
    }
  }

  // Message seen
  markMessageSeen(messageId) {
    if (this.socket) {
      this.socket.emit('message:seen', { messageId });
    }
  }

  // Online/offline user updates
  onUserOnline(callback) {
    if (this.socket) {
      this.socket.on('user:online', callback);
    }
  }

  onUserOffline(callback) {
    if (this.socket) {
      this.socket.on('user:offline', callback);
    }
  }

  // Remove all listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export const socketService = new SocketService();
