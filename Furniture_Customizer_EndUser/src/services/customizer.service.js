import apiClient from '../api/client';

export const customizerService = {
  // Get product customization options (materials, colors, sizes, etc)
  getProductOptions: async (productId) => {
    const response = await apiClient.get(`/customizer/product/${productId}/options`);
    return response.data;
  },

  // Calculate live price based on selected options
  calculatePrice: async (payload) => {
    const response = await apiClient.post('/customizer/calculate-price', payload);
    return response.data;
  },

  // Save the custom design to user profile
  saveDesign: async (payload) => {
    const response = await apiClient.post('/customizer/save-design', payload);
    return response.data;
  },

  // Fetch user's saved designs
  getSavedDesigns: async () => {
    const response = await apiClient.get('/customizer/designs');
    return response.data;
  },

  // Get a specific saved design details
  getDesignById: async (id) => {
    const response = await apiClient.get(`/customizer/designs/${id}`);
    return response.data;
  },

  // Delete a saved design
  deleteDesign: async (id) => {
    const response = await apiClient.delete(`/customizer/designs/${id}`);
    return response.data;
  }
};
