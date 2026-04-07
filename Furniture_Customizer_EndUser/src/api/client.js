import axios from 'axios';

const API_BASE_URL = 'http://20.244.29.200:3000/api/customer';

// Create a configured axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Set default headers using .common so they are applied to ALL request methods
// and are NOT dropped when interceptors modify config.headers
apiClient.defaults.headers.common['Content-Type'] = 'application/json';
apiClient.defaults.headers.common['Accept'] = 'application/json';

// Interceptor to add the auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Safely merge – do NOT overwrite the entire headers object
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Interceptor to handle responses (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the token expires or is invalid, handle logout here
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
