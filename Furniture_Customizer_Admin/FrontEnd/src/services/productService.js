import apiClient, { extractData } from './apiClient';

/**
 * Product Moderation Service
 *
 * Endpoints:
 *   GET    /api/admin/products/stats
 *   GET    /api/admin/products
 *   GET    /api/admin/products/{id}
 *   GET    /api/admin/products/pending
 *   POST   /api/admin/products
 *   PUT    /api/admin/products/{id}
 *   DELETE /api/admin/products/{id}
 *   PATCH  /api/admin/products/pending/{id}/approve
 *   PATCH  /api/admin/products/pending/{id}/reject
 *   GET    /api/admin/products/export
 */

export const getProductStats = async () => {
  const response = await apiClient.get('/api/admin/products/stats');
  return extractData(response);
};

export const getProducts = async ({ category, status, page = 1, limit = 10, sortBy, sortOrder } = {}) => {
  const params = { page, limit };
  if (category) params.category = category;
  if (status) params.status = status;
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;

  const response = await apiClient.get('/api/admin/products', { params });
  return extractData(response);
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/api/admin/products/${id}`);
  return extractData(response);
};

export const getPendingProducts = async ({ page = 1, limit = 10 } = {}) => {
  const response = await apiClient.get('/api/admin/products/pending', {
    params: { page, limit },
  });
  return extractData(response);
};

export const createProduct = async ({ name, categoryId, vendorId, basePrice, status, sku, description, images }) => {
  const body = { name, categoryId, vendorId, basePrice, status };
  if (sku) body.sku = sku;
  if (description) body.description = description;
  if (images?.length) body.images = images;

  const response = await apiClient.post('/api/admin/products', body);
  return extractData(response);
};

export const updateProduct = async (id, { name, categoryId, vendorId, basePrice, status, sku, description, images }) => {
  const body = { name, categoryId, vendorId, basePrice, status };
  if (sku) body.sku = sku;
  if (description) body.description = description;
  if (images?.length) body.images = images;

  const response = await apiClient.put(`/api/admin/products/${id}`, body);
  return extractData(response);
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/api/admin/products/${id}`);
  return extractData(response);
};

export const approveProduct = async (id) => {
  const response = await apiClient.patch(`/api/admin/products/pending/${id}/approve`);
  return extractData(response);
};

export const rejectProduct = async (id, { reason }) => {
  const response = await apiClient.patch(`/api/admin/products/pending/${id}/reject`, { reason });
  return extractData(response);
};

export const exportProducts = async ({ format = 'csv' } = {}) => {
  const response = await apiClient.get('/api/admin/products/export', {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
