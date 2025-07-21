import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const fetchPosts = async () => {
  const res = await axios.get(`${API_URL}/posts/i7V7Z7aaL9XK`)
  return res.data
}
