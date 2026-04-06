import { useQuery } from '@tanstack/react-query';
import {
  getDashboardStats,
  getSalesChart,
  getConversionMetrics,
  getRecentActivity,
  getTopProducts,
} from '../../services/dashboardService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const dashboardKeys = {
  all: ['dashboard'],
  stats: () => [...dashboardKeys.all, 'stats'],
  salesChart: (period) => [...dashboardKeys.all, 'sales-chart', period],
  conversion: () => [...dashboardKeys.all, 'conversion'],
  activity: (limit) => [...dashboardKeys.all, 'activity', limit],
  topProducts: (limit) => [...dashboardKeys.all, 'top-products', limit],
};

// ─── Dashboard Stats ─────────────────────────────────────────────────────────
export const useDashboardStats = (options = {}) => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ─── Sales Chart ─────────────────────────────────────────────────────────────
export const useSalesChart = ({ period = 'daily' } = {}, options = {}) => {
  return useQuery({
    queryKey: dashboardKeys.salesChart(period),
    queryFn: () => getSalesChart({ period }),
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ─── Conversion ──────────────────────────────────────────────────────────────
export const useConversionMetrics = (options = {}) => {
  return useQuery({
    queryKey: dashboardKeys.conversion(),
    queryFn: getConversionMetrics,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── Recent Activity ─────────────────────────────────────────────────────────
export const useRecentActivity = ({ limit = 5 } = {}, options = {}) => {
  return useQuery({
    queryKey: dashboardKeys.activity(limit),
    queryFn: () => getRecentActivity({ limit }),
    staleTime: 60 * 1000,
    ...options,
  });
};

// ─── Top Products ────────────────────────────────────────────────────────────
export const useTopProducts = ({ limit = 5 } = {}, options = {}) => {
  return useQuery({
    queryKey: dashboardKeys.topProducts(limit),
    queryFn: () => getTopProducts({ limit }),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
