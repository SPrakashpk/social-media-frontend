// Like a post
export const likePost = async (postId) => {
  const res = await API.post(`/posts/${postId}/like`);
  return res.data;
};

// Comment on a post
export const commentOnPost = async (postId, text) => {
  const res = await API.post(`/posts/${postId}/comment`, { text });
  return res.data;
};
export const fetchFeedPosts = async (id) => {
  const res = await API.get(`/posts/feed`+'?id='+id);
  return res.data;
};

export const fetchExplorePosts = async (userId) => {
  const res = await API.get(`/posts/explore?id=${userId}`);
  return res.data;
};

export const updatePost = async (postId, text) => {
  const res = await API.put(`/posts/${postId}`, { text });
  return res.data;
};

export const deletePost = async (postId) => {
  const res = await API.delete(`/posts/${postId}`);
  return res.data;
};
import API from '../api/axios';
import axios from '../api/axios';

const API_URL = import.meta.env.VITE_API_BASE_URL

export const fetchPosts = async () => {
  const res = await API.get(`/posts/i7V7Z7aaL9XK`)
  return res.data
}

export const createPost = async ({ userId, text, mediaFiles }) => {
  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('text', text)

  mediaFiles.forEach((file) => {
    formData.append('media', file)
  })

  const response = await API.post(`/posts/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // if your backend requires cookies
  })

  return response.data
}
