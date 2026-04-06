import apiClient, { extractData } from './apiClient';

/**
 * Security Service
 *
 * Endpoints:
 *   GET    /api/admin/security/stats
 *   GET    /api/admin/security/roles
 *   POST   /api/admin/security/roles
 *   PUT    /api/admin/security/roles/{id}
 *   DELETE /api/admin/security/roles/{id}
 *   GET    /api/admin/security/audit-logs
 *   GET    /api/admin/security/audit-logs/export
 *   GET    /api/admin/security/user-assignments
 */

export const getSecurityStats = async () => {
  const response = await apiClient.get('/api/admin/security/stats');
  return extractData(response);
};

export const getRoles = async () => {
  const response = await apiClient.get('/api/admin/security/roles');
  return extractData(response);
};

export const createRole = async ({ name, description, accessLevel, permissions }) => {
  const response = await apiClient.post('/api/admin/security/roles', {
    name, description, accessLevel, permissions,
  });
  return extractData(response);
};

export const updateRole = async (id, { name, description, accessLevel, permissions }) => {
  const response = await apiClient.put(`/api/admin/security/roles/${id}`, {
    name, description, accessLevel, permissions,
  });
  return extractData(response);
};

export const deleteRole = async (id) => {
  const response = await apiClient.delete(`/api/admin/security/roles/${id}`);
  return extractData(response);
};

export const getAuditLogs = async ({ page = 1, limit = 10 } = {}) => {
  const response = await apiClient.get('/api/admin/security/audit-logs', {
    params: { page, limit },
  });
  return extractData(response);
};

export const exportAuditLogs = async ({ format = 'csv' } = {}) => {
  const response = await apiClient.get('/api/admin/security/audit-logs/export', {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};

export const getUserAssignments = async ({ page = 1, limit = 10 } = {}) => {
  const response = await apiClient.get('/api/admin/security/user-assignments', {
    params: { page, limit },
  });
  return extractData(response);
};
