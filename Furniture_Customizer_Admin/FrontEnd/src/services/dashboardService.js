import apiClient, { extractData } from './apiClient';

/**
 * Dashboard Service
 *
 * Endpoints:
 *   GET /api/admin/dashboard/stats
 *   GET /api/admin/dashboard/sales-chart
 *   GET /api/admin/dashboard/conversion
 *   GET /api/admin/dashboard/activity
 *   GET /api/admin/dashboard/top-products
 */

export const getDashboardStats = async () => {
  const response = await apiClient.get('/api/admin/dashboard/stats');
  return extractData(response);
};

export const getSalesChart = async ({ period = 'daily' } = {}) => {
  const response = await apiClient.get('/api/admin/dashboard/sales-chart', {
    params: { period },
  });
  return extractData(response);
};

export const getConversionMetrics = async () => {
  const response = await apiClient.get('/api/admin/dashboard/conversion');
  return extractData(response);
};

export const getRecentActivity = async ({ limit = 5 } = {}) => {
  const response = await apiClient.get('/api/admin/dashboard/activity', {
    params: { limit },
  });
  return extractData(response);
};

export const getTopProducts = async ({ limit = 5 } = {}) => {
  const response = await apiClient.get('/api/admin/dashboard/top-products', {
    params: { limit },
  });
  return extractData(response);
};
