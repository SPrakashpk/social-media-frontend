import axios from 'axios';

export const getChatList = async (userId) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/chat/getChatList?userId=${userId}`;
  const res = await axios.get(API_URL);
  return res.data;
};

