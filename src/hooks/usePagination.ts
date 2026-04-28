export { usePagination } from '@mantine/hooks';

export const DOTS = 'dots' as const;

export interface PaginationParams {
  initialPage?: number;
  page?: number;
  total: number;
  siblings?: number;
  boundaries?: number;
  onChange?: (page: number) => void;
}
