/**
 * API Hooks — Barrel Export
 *
 * Re-exports every hook from all domain modules so they can be consumed with a
 * single import path:
 *
 *   import { useLogin, useUsers, useDashboardStats } from '@/hooks/api';
 */

export * from './useAuth';
export * from './useAdmin';
export * from './useDashboard';
export * from './useUsers';
export * from './useVendors';
export * from './useProducts';
export * from './useCategories';
export * from './useAnalytics';
export * from './useCoupons';
export * from './useOrders';
export * from './useSecurity';
export * from './useUpload';
