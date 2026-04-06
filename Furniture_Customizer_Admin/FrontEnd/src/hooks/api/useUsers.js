import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getUserStats,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  toggleUserStatus,
  deleteUser,
  exportUsers,
} from '../../services/userService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const userKeys = {
  all: ['users'],
  stats: () => [...userKeys.all, 'stats'],
  lists: () => [...userKeys.all, 'list'],
  list: (params) => [...userKeys.all, 'list', params],
  detail: (id) => [...userKeys.all, 'detail', id],
};

// ─── User Stats ──────────────────────────────────────────────────────────────
export const useUserStats = (options = {}) => {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: getUserStats,
    staleTime: 2 * 60 * 1000,
    ...options,
  });
};

// ─── List Users ──────────────────────────────────────────────────────────────
export const useUsers = (params = {}, options = {}) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Single User ─────────────────────────────────────────────────────────────
export const useUser = (id, options = {}) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
    ...options,
  });
};

// ─── Create User ─────────────────────────────────────────────────────────────
export const useCreateUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
      toast.success('User created successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create user';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Update User ─────────────────────────────────────────────────────────────
export const useUpdateUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateUser(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      toast.success('User updated successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update user';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Toggle User Status ─────────────────────────────────────────────────────
export const useToggleUserStatus = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => toggleUserStatus(id, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
      toast.success('User status updated');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Delete User ─────────────────────────────────────────────────────────────
export const useDeleteUser = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.stats() });
      toast.success('User deleted successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete user';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Export Users ────────────────────────────────────────────────────────────
export const useExportUsers = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: exportUsers,
    onSuccess: (blob, variables) => {
      const format = variables?.format || 'csv';
      const ext = format === 'csv' ? 'csv' : 'xlsx';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `users-export.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Users exported successfully');
      onSuccess?.(blob);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Export failed';
      toast.error(message);
      onError?.(error);
    },
  });
};
