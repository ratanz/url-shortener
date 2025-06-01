import axios from "axios"

export const createShortUrl = async (url) => {
  try {
    // Get the authentication token if available
    const token = localStorage.getItem('token');
    
    // Set headers with auth token if user is logged in
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    console.log('Creating short URL with auth:', token ? 'User is authenticated' : 'Anonymous user');
    
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/create`, { url }, {
      timeout: 10000, // 10 seconds timeout
      headers
    })
    return data
  } catch (error) {
    // Handle Axios specific errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server error:', error.response.status, error.response.data)
      throw {
        type: 'SERVER_ERROR',
        status: error.response.status,
        message: error.response.data.message || 'Server error occurred',
        data: error.response.data
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error: No response received', error.request)
      throw {
        type: 'NETWORK_ERROR',
        message: 'No response received from server. Please check your internet connection.'
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request configuration error:', error.message)
      throw {
        type: 'REQUEST_ERROR',
        message: error.message || 'Error occurred while setting up the request'
      }
    }
  }
}

