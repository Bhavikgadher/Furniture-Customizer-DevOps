import apiClient, { extractData } from './apiClient';

/**
 * User Management Service
 *
 * Endpoints:
 *   GET    /api/admin/users/stats
 *   GET    /api/admin/users
 *   GET    /api/admin/users/{id}
 *   POST   /api/admin/users
 *   PUT    /api/admin/users/{id}
 *   PATCH  /api/admin/users/{id}/status
 *   DELETE /api/admin/users/{id}
 *   GET    /api/admin/users/export
 */

export const getUserStats = async () => {
  const response = await apiClient.get('/api/admin/users/stats');
  return extractData(response);
};

export const getUsers = async ({ page = 1, limit = 10, search, role, status, sortBy, sortOrder } = {}) => {
  // Build params object, omitting empty/falsy optional filters to avoid backend validation errors
  const params = { page, limit };
  if (search) params.search = search;
  if (role) params.role = role;
  if (status) params.status = status;
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;

  const response = await apiClient.get('/api/admin/users', { params });
  return extractData(response);
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/api/admin/users/${id}`);
  return extractData(response);
};

export const createUser = async ({ name, email, role, password }) => {
  const response = await apiClient.post('/api/admin/users', { name, email, role, password });
  return extractData(response);
};

export const updateUser = async (id, { name, email, role, status }) => {
  const response = await apiClient.put(`/api/admin/users/${id}`, { name, email, role, status });
  return extractData(response);
};

export const toggleUserStatus = async (id, { status }) => {
  const response = await apiClient.patch(`/api/admin/users/${id}/status`, { status });
  return extractData(response);
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/api/admin/users/${id}`);
  return extractData(response);
};

export const exportUsers = async ({ format = 'csv' } = {}) => {
  const response = await apiClient.get('/api/admin/users/export', {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
