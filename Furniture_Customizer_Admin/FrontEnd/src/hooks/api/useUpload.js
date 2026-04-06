import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { uploadFile } from '../../services/uploadService';

// ─── Upload File ─────────────────────────────────────────────────────────────
export const useUploadFile = ({ onSuccess, onError } = {}) => {
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast.success('File uploaded successfully');
      onSuccess?.(data);
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Upload failed';
      toast.error(message);
      onError?.(error);
    },
  });
};
