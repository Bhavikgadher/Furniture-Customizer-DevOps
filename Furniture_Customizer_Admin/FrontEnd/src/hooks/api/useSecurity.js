import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getSecurityStats,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getAuditLogs,
  exportAuditLogs,
  getUserAssignments,
} from '../../services/securityService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const securityKeys = {
  all: ['security'],
  stats: () => [...securityKeys.all, 'stats'],
  roles: () => [...securityKeys.all, 'roles'],
  auditLogs: (params) => [...securityKeys.all, 'audit-logs', params],
  assignments: (params) => [...securityKeys.all, 'assignments', params],
};

// ─── Security Stats ──────────────────────────────────────────────────────────
export const useSecurityStats = (options = {}) => {
  return useQuery({
    queryKey: securityKeys.stats(),
    queryFn: getSecurityStats,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── List Roles ──────────────────────────────────────────────────────────────
export const useRoles = (options = {}) => {
  return useQuery({
    queryKey: securityKeys.roles(),
    queryFn: getRoles,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

// ─── Create Role ─────────────────────────────────────────────────────────────
export const useCreateRole = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: securityKeys.roles() });
      queryClient.invalidateQueries({ queryKey: securityKeys.stats() });
      toast.success('Role created successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create role';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Update Role ─────────────────────────────────────────────────────────────
export const useUpdateRole = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => updateRole(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: securityKeys.roles() });
      toast.success('Role updated successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update role';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Delete Role ─────────────────────────────────────────────────────────────
export const useDeleteRole = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: securityKeys.roles() });
      queryClient.invalidateQueries({ queryKey: securityKeys.stats() });
      toast.success('Role deleted successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete role';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Audit Logs ──────────────────────────────────────────────────────────────
export const useAuditLogs = (params = {}, options = {}) => {
  return useQuery({
    queryKey: securityKeys.auditLogs(params),
    queryFn: () => getAuditLogs(params),
    keepPreviousData: true,
    ...options,
  });
};

// ─── Export Audit Logs ───────────────────────────────────────────────────────
export const useExportAuditLogs = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: exportAuditLogs,
    onSuccess: (blob, variables) => {
      const format = variables?.format || 'csv';
      const ext = format === 'csv' ? 'csv' : 'xlsx';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-logs-export.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Audit logs exported successfully');
      onSuccess?.(blob);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Export failed';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── User Assignments ────────────────────────────────────────────────────────
export const useUserAssignments = (params = {}, options = {}) => {
  return useQuery({
    queryKey: securityKeys.assignments(params),
    queryFn: () => getUserAssignments(params),
    keepPreviousData: true,
    ...options,
  });
};
