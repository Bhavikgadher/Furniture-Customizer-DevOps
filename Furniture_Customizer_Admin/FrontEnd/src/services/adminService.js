import apiClient, { extractData } from './apiClient';

/**
 * Admin / Global Service
 *
 * Endpoints:
 *   GET  /api/admin/me
 *   GET  /api/admin/search
 *   GET  /api/admin/notifications
 *   PATCH /api/admin/notifications/mark-all-read
 *   PATCH /api/admin/notifications/{id}/read
 */

export const getCurrentAdmin = async () => {
  const response = await apiClient.get('/api/admin/me');
  return extractData(response);
};

export const globalSearch = async ({ q, type = 'all', limit = 10 }) => {
  const response = await apiClient.get('/api/admin/search', {
    params: { q, type, limit },
  });
  return extractData(response);
};

export const getNotifications = async ({ unread = true, limit = 10 } = {}) => {
  const response = await apiClient.get('/api/admin/notifications', {
    params: { unread, limit },
  });
  return extractData(response);
};

export const markAllNotificationsRead = async () => {
  const response = await apiClient.patch('/api/admin/notifications/mark-all-read', {});
  return extractData(response);
};

export const markNotificationRead = async (id) => {
  const response = await apiClient.patch(`/api/admin/notifications/${id}/read`);
  return extractData(response);
};
