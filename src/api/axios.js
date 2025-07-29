import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_API_BASE_URL
});

// List of public routes (no auth required)
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/otp',
  '/auth/verify',
  '/users/exists',
  // add more public endpoints as needed
];

API.interceptors.request.use(
  (config) => {
    // Only add token if not a public route
    const isPublic = PUBLIC_ROUTES.some(route => config.url && config.url.includes(route));
    if (!isPublic) {
      const token = localStorage.getItem('chirp_token') || localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log(config)
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;