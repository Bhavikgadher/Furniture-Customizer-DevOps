import apiClient from '../api/client';

export const checkoutService = {
  validateCheckout: async () => {
    const response = await apiClient.post('/checkout/validate');
    return response.data;
  },
  applyCoupon: async (payload) => {
    // payload: { code, orderTotal }
    const response = await apiClient.post('/checkout/apply-coupon', payload);
    return response.data;
  },
  createOrder: async (payload) => {
    // payload: { address_id, coupon_code }
    const response = await apiClient.post('/checkout/create-order', payload);
    return response.data;
  }
};
