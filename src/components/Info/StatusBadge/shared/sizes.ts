export const statusBadgeSizes = {
  sm: {
    width: '7rem',
    height: '2.3rem',
    iconSize: '1.2rem',
  },
  md: {
    width: '9rem',
    height: '3rem',
    iconSize: '1.6rem',
  },
  lg: {
    width: '11rem',
    height: '3.5rem',
    iconSize: '1.8rem',
  },
} as const;

export type StatusBadgeSize = keyof typeof statusBadgeSizes;
