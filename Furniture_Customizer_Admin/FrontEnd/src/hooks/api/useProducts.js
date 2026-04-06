import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getProductStats,
  getProducts,
  getProductById,
  getPendingProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  approveProduct,
  rejectProduct,
  exportProducts,
} from '../../services/productService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const productKeys = {
  all: ['products'],
  stats: () => [...productKeys.all, 'stats'],
  lists: () => [...productKeys.all, 'list'],
  list: (params) => [...productKeys.all, 'list', params],
  detail: (id) => [...productKeys.all, 'detail', id],
  pending: (params) => [...productKeys.all, 'pending', params],
};

// ─── Product Stats ───────────────────────────────────────────────────────────
export const useProductStats = (options = {}) => {
  return useQuery({
    queryKey: productKeys.stats(),
    queryFn: getProductStats,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ─── List Products ───────────────────────────────────────────────────────────
export const useProducts = (params = {}, options = {}) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => getProducts(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Single Product ──────────────────────────────────────────────────────────
export const useProduct = (id, options = {}) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
    ...options,
  });
};

// ─── Pending Products ────────────────────────────────────────────────────────
export const usePendingProducts = (params = {}, options = {}) => {
  return useQuery({
    queryKey: productKeys.pending(params),
    queryFn: () => getPendingProducts(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Create Product ──────────────────────────────────────────────────────────
export const useCreateProduct = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
      toast.success('Product created successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create product';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Update Product ──────────────────────────────────────────────────────────
export const useUpdateProduct = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateProduct(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) });
      toast.success('Product updated successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update product';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Delete Product ──────────────────────────────────────────────────────────
export const useDeleteProduct = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Product deleted and catalog updated');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete product';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Approve Product ─────────────────────────────────────────────────────────
export const useApproveProduct = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Product approved');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to approve product';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Reject Product ──────────────────────────────────────────────────────────
export const useRejectProduct = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }) => rejectProduct(id, { reason }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Product rejected');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to reject product';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Export Products ─────────────────────────────────────────────────────────
export const useExportProducts = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: exportProducts,
    onSuccess: (blob, variables) => {
      const format = variables?.format || 'csv';
      const ext = format === 'csv' ? 'csv' : 'xlsx';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `products-export.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Products exported successfully');
      onSuccess?.(blob);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Export failed';
      toast.error(message);
      onError?.(error);
    },
  });
};
