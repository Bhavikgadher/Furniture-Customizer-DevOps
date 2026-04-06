import apiClient, { extractData } from './apiClient';

/**
 * Category Service
 *
 * Endpoints:
 *   GET /api/admin/categories
 */

export const getCategories = async () => {
  const response = await apiClient.get('/api/admin/categories');
  return extractData(response);
};
