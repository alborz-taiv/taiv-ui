import { SimpleGrid, type SimpleGridProps } from '@mantine/core';
import type React from 'react';
import { breakpoints } from '../../../constants/breakpoints';

/**
 * Tailwind-style responsive column map. Missing entries inherit from the
 * next-smaller breakpoint. `base` applies at viewports below `sm` (640px).
 */
export type ResponsiveCols = {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

export interface AutoGridProps extends Omit<SimpleGridProps, 'cols'> {
  children: React.ReactNode;
  /**
   * Number of columns. Accepts a number, or a Tailwind-style responsive map
   * (`{ base: 1, sm: 2, lg: 3 }`). Defaults to `1`.
   */
  cols?: number | ResponsiveCols;
}

const BP_WIDTH_PX: Record<keyof ResponsiveCols, number> = {
  base: 0,
  lg: breakpoints.LAPTOP, // 1024
  md: breakpoints.TABLET, // 768
  sm: breakpoints.MOBILE, // 640
  xl: breakpoints.DESKTOP, // 1280
};

const RESPONSIVE_KEYS: Array<keyof ResponsiveCols> = [
  'base',
  'sm',
  'md',
  'lg',
  'xl',
];

/**
 * Translate a mobile-first responsive cols map into Mantine v6's
 * `{ cols, breakpoints: [{ maxWidth, cols }, …] }` shape. Mantine applies
 * breakpoints below a `maxWidth` so we resolve the largest entry as the base
 * `cols` and emit descending `maxWidth` thresholds for smaller steps.
 */
const resolveResponsiveCols = (
  map: ResponsiveCols,
): { cols: number; breakpoints: SimpleGridProps['breakpoints'] } => {
  // Forward-fill so `{ base: 1, lg: 3 }` implies sm/md also pick up 1 until lg.
  let last = 1;
  const filled = RESPONSIVE_KEYS.reduce<Record<keyof ResponsiveCols, number>>(
    (acc, k) => {
      const v = map[k];
      if (typeof v === 'number') last = v;
      acc[k] = last;
      return acc;
    },
    { base: 1, lg: 1, md: 1, sm: 1, xl: 1 },
  );

  const baseCols = filled.xl;
  const stops: SimpleGridProps['breakpoints'] = [];
  // Walk descending: each step fires when viewport drops below its threshold.
  const descending: Array<keyof ResponsiveCols> = ['xl', 'lg', 'md', 'sm'];
  for (const key of descending) {
    const smaller = RESPONSIVE_KEYS[RESPONSIVE_KEYS.indexOf(key) - 1];
    if (!smaller) continue;
    if (filled[smaller] !== filled[key]) {
      stops?.push({ cols: filled[smaller], maxWidth: BP_WIDTH_PX[key] });
    }
  }
  return { breakpoints: stops, cols: baseCols };
};

export const AutoGrid = ({ cols = 1, children, ...props }: AutoGridProps) => {
  if (typeof cols === 'number') {
    return (
      <SimpleGrid cols={cols} {...props}>
        {children}
      </SimpleGrid>
    );
  }
  const { cols: resolvedCols, breakpoints: resolvedBreakpoints } =
    resolveResponsiveCols(cols);
  return (
    <SimpleGrid
      breakpoints={resolvedBreakpoints}
      cols={resolvedCols}
      {...props}
    >
      {children}
    </SimpleGrid>
  );
};
