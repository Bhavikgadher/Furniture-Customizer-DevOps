import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getOrderStats,
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  getOrderInvoice,
  exportOrders,
  deleteOrder,
} from '../../services/orderService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const orderKeys = {
  all: ['orders'],
  stats: () => [...orderKeys.all, 'stats'],
  lists: () => [...orderKeys.all, 'list'],
  list: (params) => [...orderKeys.all, 'list', params],
  detail: (id) => [...orderKeys.all, 'detail', id],
};

// ─── Order Stats ─────────────────────────────────────────────────────────────
export const useOrderStats = (options = {}) => {
  return useQuery({
    queryKey: orderKeys.stats(),
    queryFn: getOrderStats,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ─── List Orders ─────────────────────────────────────────────────────────────
export const useOrders = (params = {}, options = {}) => {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => getOrders(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Single Order ────────────────────────────────────────────────────────────
export const useOrder = (id, options = {}) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
    ...options,
  });
};

// ─── Create Order ────────────────────────────────────────────────────────────
export const useCreateOrder = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
      toast.success('Order created successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create order';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Update Order ────────────────────────────────────────────────────────────
export const useUpdateOrder = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateOrder(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
      toast.success('Order updated successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update order';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Update Order Status ─────────────────────────────────────────────────────
export const useUpdateOrderStatus = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, reason }) => updateOrderStatus(id, { status, orderStatus: status, reason }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
      toast.success('Order status updated');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update order status';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Download Invoice ────────────────────────────────────────────────────────
export const useDownloadInvoice = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: getOrderInvoice,
    onSuccess: (blobOrData, id) => {
      // Ensure we have a Blob. If the server returned it inside {data: Blob}, extract it.
      const blob = blobOrData instanceof Blob ? blobOrData : (blobOrData?.data instanceof Blob ? blobOrData.data : new Blob([blobOrData], { type: 'application/pdf' }));
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup with a small delay to ensure browser handles the click
      setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(url);
      }, 100);

      toast.success('Invoice downloaded');
      onSuccess?.(blobOrData);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to download invoice';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Export Orders ───────────────────────────────────────────────────────────
export const useExportOrders = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: exportOrders,
    onSuccess: (blob, variables) => {
      const format = variables?.format || 'csv';
      const ext = format === 'csv' ? 'csv' : 'xlsx';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `orders-export.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Orders exported successfully');
      onSuccess?.(blob);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Export failed';
      toast.error(message);
      onError?.(error);
    },
  });
};

export const useDeleteOrder = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.stats() });
      toast.success('Order deleted successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete order';
      toast.error(message);
      onError?.(error);
    },
  });
};
