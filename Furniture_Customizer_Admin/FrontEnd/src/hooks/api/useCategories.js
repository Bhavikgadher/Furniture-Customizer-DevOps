import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/categoryService';

// ─── Keys ────────────────────────────────────────────────────────────────────
export const categoryKeys = {
  all: ['categories'],
  list: () => [...categoryKeys.all, 'list'],
};

// ─── List Categories ─────────────────────────────────────────────────────────
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // categories rarely change, cache for 5 min
    ...options,
  });
};
