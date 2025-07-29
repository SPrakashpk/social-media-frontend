import axios from '../api/axios';

const authHeaders = () => {
  const token = localStorage.getItem('chirp_token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const followUser = (userId) => axios.post(`/users/${userId}/follow`);
export const unfollowUser = (userId) => axios.delete(`/users/${userId}/unfollow`);
export const getFollowers = (userId) => axios.get(`/users/${userId}/followers`);
export const getFollowing = (userId) => axios.get(`/users/${userId}/following`);
export const getUserProfile = (userId) => axios.get(`/users/${userId}`);
