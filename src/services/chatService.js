import axios from 'axios';

export const getChatList = async (userId) => {
  const res = await axios.get(`http://localhost:5000/api/chat/getChatList?userId=${userId}`);
  return res.data;
};
