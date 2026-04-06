import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getCouponStats,
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  toggleCouponVisibility,
  deleteCoupon,
  exportCoupons,
} from '../../services/couponService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const couponKeys = {
  all: ['coupons'],
  stats: () => [...couponKeys.all, 'stats'],
  lists: () => [...couponKeys.all, 'list'],
  list: (params) => [...couponKeys.all, 'list', params],
  detail: (id) => [...couponKeys.all, 'detail', id],
};

// ─── Coupon Stats ────────────────────────────────────────────────────────────
export const useCouponStats = (options = {}) => {
  return useQuery({
    queryKey: couponKeys.stats(),
    queryFn: getCouponStats,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ─── List Coupons ────────────────────────────────────────────────────────────
export const useCoupons = (params = {}, options = {}) => {
  return useQuery({
    queryKey: couponKeys.list(params),
    queryFn: () => getCoupons(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Single Coupon ───────────────────────────────────────────────────────────
export const useCoupon = (id, options = {}) => {
  return useQuery({
    queryKey: couponKeys.detail(id),
    queryFn: () => getCouponById(id),
    enabled: !!id,
    ...options,
  });
};

// ─── Create Coupon ───────────────────────────────────────────────────────────
export const useCreateCoupon = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCoupon,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() });
      queryClient.invalidateQueries({ queryKey: couponKeys.stats() });
      toast.success('Coupon created successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create coupon';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Update Coupon ───────────────────────────────────────────────────────────
export const useUpdateCoupon = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateCoupon(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() });
      queryClient.invalidateQueries({ queryKey: couponKeys.detail(variables.id) });
      toast.success('Coupon updated successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update coupon';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Toggle Coupon Visibility ────────────────────────────────────────────────
export const useToggleCouponVisibility = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isVisible }) => toggleCouponVisibility(id, { isVisible }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() });
      toast.success('Coupon visibility updated');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update visibility';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Delete Coupon ───────────────────────────────────────────────────────────
export const useDeleteCoupon = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: couponKeys.lists() });
      queryClient.invalidateQueries({ queryKey: couponKeys.stats() });
      toast.success('Coupon deleted successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete coupon';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Export Coupons ──────────────────────────────────────────────────────────
export const useExportCoupons = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: exportCoupons,
    onSuccess: (blob, variables) => {
      const format = variables?.format || 'csv';
      const ext = format === 'csv' ? 'csv' : 'xlsx';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `coupons-export.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Coupons exported successfully');
      onSuccess?.(blob);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Export failed';
      toast.error(message);
      onError?.(error);
    },
  });
};
