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
    
    // Construct the API URL with the standardized base URL
const baseApiUrl = import.meta.env.VITE_API_URL;

// Ensure we don't have double slashes in the URL
const apiUrl = baseApiUrl.endsWith('/') 
  ? `${baseApiUrl}api/create`
  : `${baseApiUrl}/api/create`;

console.log('API URL:', apiUrl);

const {data} = await axios.post(apiUrl, { url }, {
      timeout: 10000, 
      headers
    })
    return data
  } catch (error) {
    if (error.response) {
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
      console.error('Request configuration error:', error.message)
      throw {
        type: 'REQUEST_ERROR',
        message: error.message || 'Error occurred while setting up the request'
      }
    }
  }
}

