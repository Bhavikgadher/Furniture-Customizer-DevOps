import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getVendorStats,
  getVendors,
  getVendorById,
  getVendorApplications,
  inviteVendor,
  approveVendorApplication,
  rejectVendorApplication,
  updateVendor,
  toggleVendorStatus,
  exportVendors,
  createVendor,
} from '../../services/vendorService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const vendorKeys = {
  all: ['vendors'],
  stats: () => [...vendorKeys.all, 'stats'],
  lists: () => [...vendorKeys.all, 'list'],
  list: (params) => [...vendorKeys.all, 'list', params],
  detail: (id) => [...vendorKeys.all, 'detail', id],
  applications: (params) => [...vendorKeys.all, 'applications', params],
};

// ─── Vendor Stats ────────────────────────────────────────────────────────────
export const useVendorStats = (options = {}) => {
  return useQuery({
    queryKey: vendorKeys.stats(),
    queryFn: getVendorStats,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ─── List Vendors ────────────────────────────────────────────────────────────
export const useVendors = (params = {}, options = {}) => {
  return useQuery({
    queryKey: vendorKeys.list(params),
    queryFn: () => getVendors(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Single Vendor ───────────────────────────────────────────────────────────
export const useVendor = (id, options = {}) => {
  return useQuery({
    queryKey: vendorKeys.detail(id),
    queryFn: () => getVendorById(id),
    enabled: !!id,
    ...options,
  });
};

// ─── Direct Create Vendor ───────────────────────────────────────────────────
export const useCreateVendor = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVendor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      toast.success('Vendor registered and stored successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to register vendor';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Vendor Applications ─────────────────────────────────────────────────────
export const useVendorApplications = (params = {}, options = {}) => {
  return useQuery({
    queryKey: vendorKeys.applications(params),
    queryFn: () => getVendorApplications(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Invite Vendor ───────────────────────────────────────────────────────────
export const useInviteVendor = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteVendor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.lists() });
      toast.success('Vendor invitation sent');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to invite vendor';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Approve Vendor ──────────────────────────────────────────────────────────
export const useApproveVendor = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, note }) => approveVendorApplication(id, { note }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      toast.success('Vendor approved');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to approve vendor';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Reject Vendor ───────────────────────────────────────────────────────────
export const useRejectVendor = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }) => rejectVendorApplication(id, { reason }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.all });
      toast.success('Vendor rejected');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to reject vendor';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Update Vendor ───────────────────────────────────────────────────────────
export const useUpdateVendor = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateVendor(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vendorKeys.detail(variables.id) });
      toast.success('Vendor updated successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update vendor';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Toggle Vendor Status ────────────────────────────────────────────────────
export const useToggleVendorStatus = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => toggleVendorStatus(id, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: vendorKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vendorKeys.stats() });
      toast.success('Vendor status updated');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Export Vendors ──────────────────────────────────────────────────────────
export const useExportVendors = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: exportVendors,
    onSuccess: (blob, variables) => {
      const format = variables?.format || 'csv';
      const ext = format === 'csv' ? 'csv' : 'xlsx';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vendors-export.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Vendors exported successfully');
      onSuccess?.(blob);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Export failed';
      toast.error(message);
      onError?.(error);
    },
  });
};
