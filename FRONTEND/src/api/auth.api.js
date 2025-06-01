import axios from "axios";

// Create axios instance with base configuration
const authAPI = axios.create({
  baseURL: `http://localhost:3000/api/auth`,
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
  const { name, email, password } = userData;
  try {
    console.log('Registering user with data:', { name, email, password: '***' });
    
    const response = await authAPI.post('/register', {
      name,
      email,
      password
    });
    
    console.log('Registration response:', response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log('Token and user stored in localStorage');
    } else {
      console.warn('No token received in registration response');
    }

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response) {
      console.error('Server response:', error.response.status, error.response.data);
      throw error.response.data || { message: "Registration failed with status " + error.response.status };
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { message: "No response from server. Please check your connection." };
    } else {
      console.error('Request error:', error.message);
      throw { message: error.message || "Registration failed" };
    }
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log('Logging in with credentials:', { email: credentials.email, password: '***' });
    
    const response = await authAPI.post('/login', credentials);
    const { data } = response;
    console.log('Login response:', data);
    
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Token and user stored in localStorage');
    } else {
      console.warn('No token received in login response');
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      console.error('Server response:', error.response.status, error.response.data);
      throw error.response.data || { message: "Login failed with status " + error.response.status };
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { message: "No response from server. Please check your connection." };
    } else {
      console.error('Request error:', error.message);
      throw { message: error.message || "Login failed. Please check your credentials." };
    }
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

export const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

// Get user URLs
export const getUserUrls = async () => {
  try {
    console.log('Fetching user URLs with token:', localStorage.getItem('token') ? 'Token exists' : 'No token');
    
    // Create a new axios instance for protected routes
    const protectedAPI = axios.create({
      baseURL: 'http://localhost:3000/api/protected',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const response = await protectedAPI.get('/urls');
    console.log('User URLs response:', response.data);
    
    // Return the data directly to be handled by the component
    return response.data;
  } catch (error) {
    console.error('Error fetching user URLs:', error);
    if (error.response) {
      console.error('Server response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
    throw error.response?.data || { message: "Failed to fetch URLs. Please try again." };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    // Create a new axios instance for protected routes
    const protectedAPI = axios.create({
      baseURL: 'http://localhost:3000/api/protected',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const { data } = await protectedAPI.get('/profile');
    return data;
  } catch (error) {
    logError(error);
    throw error.response?.data || { message: "Failed to fetch profile. Please try again." };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    // Create a new axios instance for protected routes
    const protectedAPI = axios.create({
      baseURL: 'http://localhost:3000/api/protected',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const { data } = await protectedAPI.put('/profile', userData);
    
    // Update local storage with new user data if successful
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  } catch (error) {
    logError(error);
    throw error.response?.data || { message: "Failed to update profile. Please try again." };
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Log API errors in development mode
const DEBUG = true;

// Helper to log API errors when debugging is enabled
const logError = (error) => {
  if (!DEBUG) return;
  
  if (error.response) {
    console.error('Server error:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('Network error:', error.request);
  } else {
    console.error('Request error:', error.message);
  }
  return error; // Return the error for chaining
};
