import axios from '../api/axios';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/auth'

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  if (response.data.data.token) {
    localStorage.setItem('chirp_token', response.data.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
  }
  return response.data
}

export const register = async (formData) => {
      delete formData.confirmPassword;
  
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    
    if (response.data?.data?.token) {
      localStorage.setItem('chirp_token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Registration failed',
      error,
    };
  }
};

export const getCurrentUser = () =>{
  return JSON.parse(localStorage.getItem('user'))
}

export const logout = () => {
  localStorage.removeItem('chirp_token')
}



export const checkUsernameAvailability = async (username) => {
  try {
    const response = await API.get(`/username-available/${username}`);
    return response.data.data.available;
  } catch (error) {
    console.error("Username availability check failed:", error);
    return false;
  }
};


