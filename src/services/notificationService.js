import axios from '../api/axios';

export const fetchNotifications = () => axios.get('/api/notifications');
export const markNotificationsRead = () => axios.post('/api/notifications/mark-read');
