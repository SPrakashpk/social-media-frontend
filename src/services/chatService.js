import axios from '../api/axios';

export const getChatList = async (userId) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/chat/getChatList?userId=${userId}`;
  const res = await axios.get(API_URL);
  return res.data;
};

export const sendMessage = async (senderId, receiverId, messageText) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/chat/sendMessage`;

  const payload = {
    senderId,
    receiverId,
    message: messageText,
  };

  try {
    const response = await axios.post(API_URL, payload);
    return response.data; // should contain the chatId
  } catch (error) {
    console.error("Send message error:", error);
    throw error;
  }
};
