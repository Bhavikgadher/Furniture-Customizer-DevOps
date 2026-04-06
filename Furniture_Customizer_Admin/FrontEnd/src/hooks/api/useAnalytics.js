import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getAnalyticsKPIs,
  getRevenueChart,
  getSalesByCategory,
  getVendorPerformance,
  getUserGrowth,
  exportAnalytics,
} from '../../services/analyticsService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const analyticsKeys = {
  all: ['analytics'],
  kpis: (params) => [...analyticsKeys.all, 'kpis', params],
  revenueChart: (range) => [...analyticsKeys.all, 'revenue-chart', range],
  salesByCategory: (range) => [...analyticsKeys.all, 'sales-by-category', range],
  vendorPerformance: (range) => [...analyticsKeys.all, 'vendor-performance', range],
  userGrowth: (range) => [...analyticsKeys.all, 'user-growth', range],
};

// ─── KPIs ────────────────────────────────────────────────────────────────────
export const useAnalyticsKPIs = (params = {}, options = {}) => {
  return useQuery({
    queryKey: analyticsKeys.kpis(params),
    queryFn: () => getAnalyticsKPIs(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── Revenue Chart ───────────────────────────────────────────────────────────
export const useRevenueChart = ({ range = 'ytd' } = {}, options = {}) => {
  return useQuery({
    queryKey: analyticsKeys.revenueChart(range),
    queryFn: () => getRevenueChart({ range }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── Sales by Category ───────────────────────────────────────────────────────
export const useSalesByCategory = ({ range = 'ytd' } = {}, options = {}) => {
  return useQuery({
    queryKey: analyticsKeys.salesByCategory(range),
    queryFn: () => getSalesByCategory({ range }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── Vendor Performance ──────────────────────────────────────────────────────
export const useVendorPerformance = ({ range = 'ytd' } = {}, options = {}) => {
  return useQuery({
    queryKey: analyticsKeys.vendorPerformance(range),
    queryFn: () => getVendorPerformance({ range }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── User Growth ─────────────────────────────────────────────────────────────
export const useUserGrowth = ({ range = 'ytd' } = {}, options = {}) => {
  return useQuery({
    queryKey: analyticsKeys.userGrowth(range),
    queryFn: () => getUserGrowth({ range }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── Export Analytics ────────────────────────────────────────────────────────
export const useExportAnalytics = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: exportAnalytics,
    onSuccess: (blob, variables) => {
      const format = variables?.format || 'csv';
      const extMap = { csv: 'csv', excel: 'xlsx', pdf: 'pdf' };
      const ext = extMap[format] || 'csv';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-export.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Analytics exported successfully');
      onSuccess?.(blob);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Export failed';
      toast.error(message);
      onError?.(error);
    },
  });
};
