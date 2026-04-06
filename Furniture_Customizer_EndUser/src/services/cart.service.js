import apiClient from '../api/client';

export const cartService = {
  // Get cart details
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  // Add item to cart
  addItem: async (payload) => {
    // payload: { saved_design_id, quantity }
    const response = await apiClient.post('/cart/items', payload);
    return response.data;
  },

  // Update cart item quantity
  updateItem: async (id, payload) => {
    // payload: { quantity }
    const response = await apiClient.patch(`/cart/items/${id}`, payload);
    return response.data;
  },

  // Remove item from cart
  removeItem: async (id) => {
    const response = await apiClient.delete(`/cart/items/${id}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
  }
};
