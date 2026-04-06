import apiClient from '../api/client';

export const authService = {
  // Register a new customer
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Login a customer
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    // If login is successful, store token & user info in localStorage
    if (response.data?.data?.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Logout a customer
  logout: async () => {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Submit forgot password request
  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  // Get current stored user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  
  // Set current user data without a new login (e.g. after profile update)
  setCurrentUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  }
};
