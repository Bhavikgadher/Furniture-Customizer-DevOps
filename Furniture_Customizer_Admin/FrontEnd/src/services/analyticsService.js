import apiClient, { extractData } from './apiClient';

/**
 * Analytics Service
 *
 * Endpoints:
 *   GET /api/admin/analytics/kpis
 *   GET /api/admin/analytics/revenue-chart
 *   GET /api/admin/analytics/sales-by-category
 *   GET /api/admin/analytics/vendor-performance
 *   GET /api/admin/analytics/user-growth
 *   GET /api/admin/analytics/export
 */

export const getAnalyticsKPIs = async ({ range = 'ytd', from, to } = {}) => {
  const response = await apiClient.get('/api/admin/analytics/kpis', {
    params: { range, from, to },
  });
  return extractData(response);
};

export const getRevenueChart = async ({ range = 'ytd' } = {}) => {
  const response = await apiClient.get('/api/admin/analytics/revenue-chart', {
    params: { range },
  });
  return extractData(response);
};

export const getSalesByCategory = async ({ range = 'ytd' } = {}) => {
  const response = await apiClient.get('/api/admin/analytics/sales-by-category', {
    params: { range },
  });
  return extractData(response);
};

export const getVendorPerformance = async ({ range = 'ytd' } = {}) => {
  const response = await apiClient.get('/api/admin/analytics/vendor-performance', {
    params: { range },
  });
  return extractData(response);
};

export const getUserGrowth = async ({ range = 'ytd' } = {}) => {
  const response = await apiClient.get('/api/admin/analytics/user-growth', {
    params: { range },
  });
  return extractData(response);
};

export const exportAnalytics = async ({ format = 'csv', range = 'ytd' } = {}) => {
  const response = await apiClient.get('/api/admin/analytics/export', {
    params: { format, range },
    responseType: 'blob',
  });
  return response.data;
};
