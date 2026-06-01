import {
  Pagination as MantinePagination,
  type PaginationProps as MantinePaginationProps,
} from '@mantine/core';
import React from 'react';
import { colors } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
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
  lg: 36,
  md: 32,
  sm: 28,
};

export const Pagination = ({
  size = 'md',
  styles,
  withControls = true,
  ...props
}: PaginationProps) => {
  const itemSize = SIZE_PX[size];
  const style = {
    control: {
      ...fontBase,
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.neutral[25],
        color: colors.primary[200],
      },
      '&[data-active]': {
        backgroundColor: colors.primary[200],
        borderColor: colors.primary[200],
        color: 'white',
      },
      '&[data-active]:hover': {
        backgroundColor: colors.primary[200],
        borderColor: colors.primary[200],
        color: 'white',
      },
      '&[data-disabled]': {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      backgroundColor: 'transparent',
      border: `1px solid ${colors.neutral[50]}`,
      borderRadius: '8px',
      color: colors.neutral[300],
      fontSize: '14px',
      height: itemSize,
      lineHeight: '20px',
      minWidth: itemSize,
    },
    dots: {
      ...fontBase,
      color: colors.neutral[200],
    },
    root: {
      gap: spacing.xs,
    },
    ...styles,
  };

  return (
    <MantinePagination styles={style} withControls={withControls} {...props} />
  );
};
