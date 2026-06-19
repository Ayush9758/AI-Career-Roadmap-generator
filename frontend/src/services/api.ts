import axios from 'axios';
import { STORAGE_KEYS } from '@/utils/constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle formatting and auth failures
api.interceptors.response.use(
  (response) => {
    // If backend returned wrapped response, unwrap the payload data
    if (
      response.data &&
      typeof response.data === 'object' &&
      response.data.success === true &&
      'data' in response.data
    ) {
      response.data = response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Extract custom server error message if available
    const serverMessage = error.response?.data?.message;
    if (serverMessage) {
      const newError = new Error(serverMessage);
      (newError as any).status = error.response.status;
      (newError as any).response = error.response;
      return Promise.reject(newError);
    }
    
    return Promise.reject(error);
  }
);

export default api;
