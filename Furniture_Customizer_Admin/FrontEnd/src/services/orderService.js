import apiClient, { extractData } from './apiClient';

/**
 * Order Management Service
 *
 * Endpoints:
 *   GET   /api/admin/orders/stats
 *   GET   /api/admin/orders
 *   GET   /api/admin/orders/{id}
 *   POST  /api/admin/orders
 *   PUT   /api/admin/orders/{id}
 *   PATCH /api/admin/orders/{id}/status
 *   GET   /api/admin/orders/{id}/invoice
 *   GET   /api/admin/orders/export
 */

export const getOrderStats = async () => {
  const response = await apiClient.get('/api/admin/orders/stats');
  return extractData(response);
};

export const getOrders = async ({ page = 1, limit = 10, status, payment, dateFrom, dateTo, sortBy, sortOrder } = {}) => {
  const response = await apiClient.get('/api/admin/orders', {
    params: { page, limit, status, payment, dateFrom, dateTo, sortBy, sortOrder },
  });
  return extractData(response);
};

export const getOrderById = async (id) => {
  const response = await apiClient.get(`/api/admin/orders/${id}`);
  return extractData(response);
};

export const createOrder = async ({ customerId, total, paymentStatus, orderStatus }) => {
  const response = await apiClient.post('/api/admin/orders', {
    customerId, total, paymentStatus, orderStatus,
  });
  return extractData(response);
};

export const updateOrder = async (id, { customerId, total, paymentStatus, orderStatus }) => {
  const response = await apiClient.put(`/api/admin/orders/${id}`, {
    customerId, total, paymentStatus, orderStatus,
  });
  return extractData(response);
};

export const updateOrderStatus = async (id, { status, reason }) => {
  const response = await apiClient.patch(`/api/admin/orders/${id}/status`, { status, reason });
  return extractData(response);
};

export const getOrderInvoice = async (id) => {
  const response = await apiClient.get(`/api/admin/orders/${id}/invoice`, {
    responseType: 'blob',
  });
  return response.data;
};

export const exportOrders = async ({ format = 'csv', status, payment, dateFrom, dateTo } = {}) => {
  const response = await apiClient.get('/api/admin/orders/export', {
    params: { format, status, payment, dateFrom, dateTo },
    responseType: 'blob',
  });
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await apiClient.delete(`/api/admin/orders/${id}`);
  return extractData(response);
};
