import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} from '../../services/authService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const authKeys = {
  all: ['auth'],
  user: () => [...authKeys.all, 'user'],
};

// ─── Login ───────────────────────────────────────────────────────────────────
export const useLogin = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success('Logged in successfully');
      queryClient.invalidateQueries({ queryKey: ['admin', 'me'] });
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Register ────────────────────────────────────────────────────────────────
export const useRegister = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success('Registration successful');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Forgot Password ────────────────────────────────────────────────────────
export const useForgotPassword = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success('Password reset email sent');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to send reset email';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Reset Password ─────────────────────────────────────────────────────────
export const useResetPassword = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success('Password reset successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Password reset failed';
      toast.error(message);
      onError?.(error);
    },
  });
};

// ─── Logout ──────────────────────────────────────────────────────────────────
export const useLogout = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      queryClient.clear();
      toast.success('Logged out');
      onSuccess?.(data);
    },
    onError: (error) => {
      // Still clear local state even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      queryClient.clear();
      onError?.(error);
    },
  });
};
