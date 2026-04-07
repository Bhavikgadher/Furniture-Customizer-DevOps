import axios from 'axios';
import toast from 'react-hot-toast';

/**
 * Centralized Axios API Client
 *
 * Features:
 *  - Base URL from env
 *  - Automatic JWT attachment via request interceptor
 *  - 401 handling (clears token, redirects to /login)
 *  - Token refresh on 401 (single retry)
 *  - Standardized error extraction
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://20.244.29.200:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// ─── Request Interceptor ────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh logic for auth endpoints
    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/refresh-token');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        handleLogout();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://20.244.29.200:3000'}/api/auth/refresh-token`,
          { refreshToken },
        );

        const newToken = data.data?.token || data.token;
        localStorage.setItem('token', newToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Extract error message
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      'An unexpected error occurred';

    // Show toast for non-401 errors (401 is handled above)
    if (error.response?.status !== 401) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  toast.error('Session expired. Please log in again.');
  window.location.href = '/login';
}

/**
 * Helper: extract the `data` field from the standard API wrapper.
 *
 * Standard response: { success, data, message, errors }
 * This returns `response.data.data` when it exists, else `response.data`.
 */
export const extractData = (response) => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

export default apiClient;
