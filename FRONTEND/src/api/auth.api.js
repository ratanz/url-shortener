import axios from "axios";

// Create axios instance with base configuration
const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authorization header interceptor
authAPI.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    const { data } = await authAPI.post('/register', userData);
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await authAPI.post('/login', credentials);
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Server error:', error.response.status, error.response.data);
    throw {
      type: 'SERVER_ERROR',
      status: error.response.status,
      message: error.response.data.error || 'Server error occurred',
      data: error.response.data
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network error: No response received', error.request);
    throw {
      type: 'NETWORK_ERROR',
      message: 'No response received from server. Please check your internet connection.'
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request configuration error:', error.message);
    throw {
      type: 'REQUEST_ERROR',
      message: error.message || 'Error occurred while setting up the request'
    };
  }
};
