import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL + '/auth'

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  if (response.data.token) {
    localStorage.setItem('chirp_token', response.data.token)
  }
  return response.data
}

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData)
  return response.data
}

export const logout = () => {
  localStorage.removeItem('chirp_token')
}
