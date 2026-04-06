import apiClient from '../api/client';

export const catalogService = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    // params can include: page, limit, category, search, sort
    const response = await apiClient.get('/catalog/products', { params });
    return response.data;
  },

  // Get a specific product details
  getProductById: async (id) => {
    const response = await apiClient.get(`/catalog/products/${id}`);
    return response.data;
  },

  // Get product reviews
  getProductReviews: async (id, params = {}) => {
    const response = await apiClient.get(`/catalog/products/${id}/reviews`, { params });
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    const response = await apiClient.get('/catalog/categories');
    return response.data;
  },

  // Get products by category id
  getProductsByCategory: async (id, params = {}) => {
    const response = await apiClient.get(`/catalog/categories/${id}/products`, { params });
    return response.data;
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    const response = await apiClient.get('/catalog/search', {
      params: { q: query, ...params }
    });
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await apiClient.get('/catalog/featured');
    return response.data;
  },

  // Get vendor profile and products
  getVendorProfile: async (id, params = {}) => {
    const response = await apiClient.get(`/catalog/vendor/${id}`, { params });
    return response.data;
  }
};
