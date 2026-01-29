import type { CSSObject } from '@mantine/styles';
import { green, red } from '../../../../constants/colors';

export type StatusBadgeVariant = 'online' | 'offline';

export const titleMap: Record<StatusBadgeVariant, string> = {
  online: 'Online',
  offline: 'Offline',
};

export const variantStyles: Record<StatusBadgeVariant, CSSObject> = {
  online: {
    backgroundColor: green[25],
    color: green[300],
    border: 'none',
  },
  offline: {
    backgroundColor: red[25],
    color: red[300],
    border: 'none',
  },
};

export const defaultIconColor: Record<StatusBadgeVariant, string> = {
  online: green[300],
  offline: red[300],
};
