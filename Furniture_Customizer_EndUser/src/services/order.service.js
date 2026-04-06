import apiClient from '../api/client';

export const orderService = {
  getOrders: async (params) => {
    // params: page, limit, status
    const response = await apiClient.get('/orders', { params });
    return response.data;
  },
  getOrderById: async (id) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },
  cancelOrder: async (id) => {
    const response = await apiClient.post(`/orders/${id}/cancel`);
    return response.data;
  }
};
