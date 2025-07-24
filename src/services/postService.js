import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const fetchPosts = async () => {
  const res = await axios.get(`${API_URL}/posts/i7V7Z7aaL9XK`)
  return res.data
}

export const createPost = async ({ userId, text, mediaFiles }) => {
  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('text', text)

  mediaFiles.forEach((file) => {
    formData.append('media', file)
  })

  const response = await axios.post(`${API_URL}/posts/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // if your backend requires cookies
  })

  return response.data
}
