import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getCurrentAdmin,
  globalSearch,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '../../services/adminService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const adminKeys = {
  all: ['admin'],
  me: () => [...adminKeys.all, 'me'],
  search: (params) => [...adminKeys.all, 'search', params],
  notifications: (params) => [...adminKeys.all, 'notifications', params],
};

// ─── Current Admin ───────────────────────────────────────────────────────────
export const useCurrentAdmin = (options = {}) => {
  return useQuery({
    queryKey: adminKeys.me(),
    queryFn: getCurrentAdmin,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    ...options,
  });
};

// ─── Global Search ───────────────────────────────────────────────────────────
export const useGlobalSearch = ({ q, type = 'all', limit = 10 }, options = {}) => {
  return useQuery({
    queryKey: adminKeys.search({ q, type, limit }),
    queryFn: () => globalSearch({ q, type, limit }),
    enabled: !!q && q.length >= 2,
    staleTime: 30 * 1000,
    ...options,
  });
};

// ─── Notifications ───────────────────────────────────────────────────────────
export const useNotifications = ({ unread = true, limit = 10 } = {}, options = {}) => {
  return useQuery({
    queryKey: adminKeys.notifications({ unread, limit }),
    queryFn: () => getNotifications({ unread, limit }),
    refetchInterval: 30 * 1000, // Poll every 30s
    ...options,
  });
};

// ─── Mark All Notifications Read ─────────────────────────────────────────────
export const useMarkAllNotificationsRead = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.notifications({}) });
      toast.success('All notifications marked as read');
      onSuccess?.(data);
    },
  });
};

// ─── Mark Single Notification Read ───────────────────────────────────────────
export const useMarkNotificationRead = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.notifications({}) });
      onSuccess?.(data);
    },
  });
};
