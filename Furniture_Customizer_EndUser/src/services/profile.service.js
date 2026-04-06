import apiClient from '../api/client';

export const profileService = {
  // Get current customer profile
  getProfile: async () => {
    const response = await apiClient.get('/profile');
    return response.data;
  },

  // Update customer profile
  updateProfile: async (profileData) => {
    const response = await apiClient.put('/profile', profileData);
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.put('/profile/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  // Get addresses
  getAddresses: async () => {
    const response = await apiClient.get('/profile/addresses');
    return response.data;
  },

  // Add address
  addAddress: async (addressData) => {
    const response = await apiClient.post('/profile/addresses', addressData);
    return response.data;
  },

  // Update address
  updateAddress: async (id, addressData) => {
    const response = await apiClient.put(`/profile/addresses/${id}`, addressData);
    return response.data;
  },

  // Delete address
  deleteAddress: async (id) => {
    const response = await apiClient.delete(`/profile/addresses/${id}`);
    return response.data;
  },

  // Set default address
  setDefaultAddress: async (id) => {
    const response = await apiClient.patch(`/profile/addresses/${id}/default`);
    return response.data;
  }
};
