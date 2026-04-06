import apiClient, { extractData } from './apiClient';

/**
 * Coupon Management Service
 *
 * Endpoints:
 *   GET    /api/admin/coupons/stats
 *   GET    /api/admin/coupons
 *   GET    /api/admin/coupons/{id}
 *   POST   /api/admin/coupons
 *   PUT    /api/admin/coupons/{id}
 *   PATCH  /api/admin/coupons/{id}/visibility
 *   DELETE /api/admin/coupons/{id}
 *   GET    /api/admin/coupons/export
 */

export const getCouponStats = async () => {
  const response = await apiClient.get('/api/admin/coupons/stats');
  return extractData(response);
};

export const getCoupons = async ({ tab = 'all', search, page = 1, limit = 10, sortBy, sortOrder } = {}) => {
  const response = await apiClient.get('/api/admin/coupons', {
    params: { tab, search, page, limit, sortBy, sortOrder },
  });
  return extractData(response);
};

export const getCouponById = async (id) => {
  const response = await apiClient.get(`/api/admin/coupons/${id}`);
  return extractData(response);
};

export const createCoupon = async ({ code, discountType, discountValue, expiryDate, usageLimit, description }) => {
  const body = { code, discountType, discountValue, expiryDate };
  if (usageLimit != null) body.usageLimit = usageLimit;
  if (description) body.description = description;

  const response = await apiClient.post('/api/admin/coupons', body);
  return extractData(response);
};

export const updateCoupon = async (id, { code, discountType, discountValue, expiryDate, usageLimit, description }) => {
  const body = { code, discountType, discountValue, expiryDate };
  if (usageLimit != null) body.usageLimit = usageLimit;
  if (description) body.description = description;

  const response = await apiClient.put(`/api/admin/coupons/${id}`, body);
  return extractData(response);
};

export const toggleCouponVisibility = async (id, { isVisible }) => {
  const response = await apiClient.patch(`/api/admin/coupons/${id}/visibility`, { isVisible });
  return extractData(response);
};

export const deleteCoupon = async (id) => {
  const response = await apiClient.delete(`/api/admin/coupons/${id}`);
  return extractData(response);
};

export const exportCoupons = async ({ format = 'csv' } = {}) => {
  const response = await apiClient.get('/api/admin/coupons/export', {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
