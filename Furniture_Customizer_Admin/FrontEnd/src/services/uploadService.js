import apiClient, { extractData } from './apiClient';

/**
 * Upload Service
 *
 * Endpoint:
 *   POST /api/admin/upload  (multipart/form-data)
 */

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/api/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return extractData(response);
};
