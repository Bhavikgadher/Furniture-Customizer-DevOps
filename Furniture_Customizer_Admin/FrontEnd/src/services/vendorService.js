import apiClient, { extractData } from './apiClient';

/**
 * Vendor Management Service
 *
 * Endpoints:
 *   GET   /api/admin/vendors/stats
 *   GET   /api/admin/vendors
 *   GET   /api/admin/vendors/{id}
 *   GET   /api/admin/vendors/applications
 *   POST  /api/admin/vendors/invite
 *   PATCH /api/admin/vendors/applications/{id}/approve
 *   PATCH /api/admin/vendors/applications/{id}/reject
 *   PUT   /api/admin/vendors/{id}
 *   PATCH /api/admin/vendors/{id}/status
 *   GET   /api/admin/vendors/export
 */

export const getVendorStats = async () => {
  const response = await apiClient.get('/api/admin/vendors/stats');
  return extractData(response);
};

export const getVendors = async ({ status, page = 1, limit = 10, sortBy, sortOrder } = {}) => {
  // Build params object, omitting empty/falsy optional filters to avoid backend validation errors
  // Note: backend vendor list API does not support 'search' parameter
  const params = { page, limit };
  if (status) params.status = status;
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;

  const response = await apiClient.get('/api/admin/vendors', { params });
  return extractData(response);
};

export const getVendorById = async (id) => {
  const response = await apiClient.get(`/api/admin/vendors/${id}`);
  return extractData(response);
};

export const createVendor = async (vendorData) => {
  const response = await apiClient.post('/api/admin/vendors', vendorData);
  return extractData(response);
};

export const getVendorApplications = async ({ status = 'pending', page = 1, limit = 10 } = {}) => {
  const response = await apiClient.get('/api/admin/vendors/applications', {
    params: { status, page, limit },
  });
  return extractData(response);
};

export const inviteVendor = async ({ name, email, phone }) => {
  const response = await apiClient.post('/api/admin/vendors/invite', { name, email, phone });
  return extractData(response);
};

export const approveVendorApplication = async (id, { note } = {}) => {
  const response = await apiClient.patch(`/api/admin/vendors/applications/${id}/approve`, { note });
  return extractData(response);
};

export const rejectVendorApplication = async (id, { reason }) => {
  const response = await apiClient.patch(`/api/admin/vendors/applications/${id}/reject`, { reason });
  return extractData(response);
};

export const updateVendor = async (id, vendorData) => {
  const response = await apiClient.put(`/api/admin/vendors/${id}`, vendorData);
  return extractData(response);
};

export const toggleVendorStatus = async (id, { status }) => {
  const response = await apiClient.patch(`/api/admin/vendors/${id}/status`, { status });
  return extractData(response);
};

export const exportVendors = async ({ format = 'csv' } = {}) => {
  const response = await apiClient.get('/api/admin/vendors/export', {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};
