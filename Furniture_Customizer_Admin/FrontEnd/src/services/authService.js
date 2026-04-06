import apiClient, { extractData } from './apiClient';

/**
 * Authentication Service
 *
 * Endpoints:
 *   POST /api/auth/login
 *   POST /api/auth/register
 *   POST /api/auth/forgot-password
 *   POST /api/auth/reset-password
 *   POST /api/auth/refresh-token
 *   POST /api/auth/logout
 */

export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  const data = extractData(response);
  // Persist tokens
  if (data.token) localStorage.setItem('token', data.token);
  if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
  return data;
};

export const registerUser = async ({ name, email, password }) => {
  const response = await apiClient.post('/api/auth/register', { name, email, password });
  return extractData(response);
};

export const forgotPassword = async ({ email }) => {
  const response = await apiClient.post('/api/auth/forgot-password', { email });
  return extractData(response);
};

export const resetPassword = async ({ token, newPassword }) => {
  const response = await apiClient.post('/api/auth/reset-password', { token, newPassword });
  return extractData(response);
};

export const refreshToken = async ({ refreshToken }) => {
  const response = await apiClient.post('/api/auth/refresh-token', { refreshToken });
  return extractData(response);
};

export const logoutUser = async () => {
  const response = await apiClient.post('/api/auth/logout', {});
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  return extractData(response);
};
