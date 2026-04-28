import React from 'react';
import {
  Pagination as MantinePagination,
  PaginationProps as MantinePaginationProps,
} from '@mantine/core';
import { fontBase } from '../../../constants/font';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

export interface PaginationProps
  extends Omit<MantinePaginationProps, 'size' | 'radius'> {
  /** Total number of pages */
  total: number;
  /** Active page (controlled) */
  value?: number;
  /** Default active page (uncontrolled) */
  defaultValue?: number;
  /** Called when page changes */
  onChange?: (page: number) => void;
  /** Render first/last edge controls */
  withEdges?: boolean;
  /** Render previous/next controls */
  withControls?: boolean;
  /** Sibling pages shown around the active page */
  siblings?: number;
  /** Pages shown at each boundary */
  boundaries?: number;
  /** Visual size of pagination items */
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_PX: Record<NonNullable<PaginationProps['size']>, number> = {
  sm: 28,
  md: 32,
  lg: 36,
};

export const Pagination = ({
  size = 'md',
  styles,
  withControls = true,
  ...props
}: PaginationProps) => {
  const itemSize = SIZE_PX[size];
  const style = {
    root: {
      gap: spacing.xs,
    },
    control: {
      ...fontBase,
      fontSize: '14px',
      lineHeight: '20px',
      minWidth: itemSize,
      height: itemSize,
      border: `1px solid ${colors.neutral[50]}`,
      borderRadius: '8px',
      backgroundColor: 'transparent',
      color: colors.neutral[300],
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.neutral[25],
        color: colors.primary[300],
      },
      '&[data-active]': {
        backgroundColor: colors.primary[200],
        borderColor: colors.primary[200],
        color: 'white',
      },
      '&[data-active]:hover': {
        backgroundColor: colors.primary[300],
        borderColor: colors.primary[300],
        color: 'white',
      },
      '&[data-disabled]': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
    dots: {
      ...fontBase,
      color: colors.neutral[200],
    },
    ...styles,
  };

  return (
    <MantinePagination
      withControls={withControls}
      styles={style}
      {...props}
    />
  );
};
