import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { breakpoints } from '../../../constants/breakpoints';
import { spacing as spacingTokens } from '../../../constants/spacing';
import type { ResponsiveCols } from '../AutoGrid/AutoGrid';

type SpacingToken = keyof typeof spacingTokens;

export interface VirtualGridProps<T> {
  /** Items to render. */
  items: T[];
  /**
   * Stable key for each item. Applied to virtuoso's `computeItemKey` so
   * cells keep their identity (and measured height) when items shift around
   * — sort changes, filter updates, etc.
   */
  getKey: (item: T, index: number) => string;
  /** Render function for each item. */
  renderItem: (item: T, index: number) => React.ReactNode;
  /**
   * Number of columns. Accepts a number or a responsive map matching
   * `AutoGrid`'s `ResponsiveCols` shape. `1` switches to the list-style
   * virtuoso (`<Virtuoso>`); larger values use `<VirtuosoGrid>` with a
   * CSS-grid container. Defaults to `1`.
   */
  cols?: number | ResponsiveCols;
  /**
   * Spacing between cells in px or a `@taiv/ui/constants` spacing token name
   * (e.g. `'lg'`). Applied as a CSS-grid gap for multi-col layouts, or as
   * bottom padding inside each list cell for cols=1.
   */
  gap?: SpacingToken | number;
  /** Container style. */
  style?: React.CSSProperties;
  /** Container className. */
  className?: string;
  /**
   * Optional callback when the visible item range changes. Useful for
   * downstream "infinite load" hooks. Receives flat-item indices.
   */
  onItemsRendered?: (range: { startIndex: number; stopIndex: number }) => void;
}

/**
 * Resolve responsive `cols` against the current window width — matches the
 * AutoGrid/Mantine media-query model so consumers using `useScreenSize()` +
 * a number, or a responsive map directly, both land on the same bucket.
 */
const resolveCols = (
  cols: number | ResponsiveCols,
  windowWidth: number,
): number => {
  if (typeof cols === 'number') return Math.max(1, Math.floor(cols));
  const filled: Required<ResponsiveCols> = {
    base: cols.base ?? 1,
    sm: cols.sm ?? cols.base ?? 1,
    md: cols.md ?? cols.sm ?? cols.base ?? 1,
    lg: cols.lg ?? cols.md ?? cols.sm ?? cols.base ?? 1,
    xl: cols.xl ?? cols.lg ?? cols.md ?? cols.sm ?? cols.base ?? 1,
  };
  if (windowWidth >= breakpoints.DESKTOP) return filled.xl;
  if (windowWidth >= breakpoints.LAPTOP) return filled.lg;
  if (windowWidth >= breakpoints.TABLET) return filled.md;
  if (windowWidth >= breakpoints.MOBILE) return filled.sm;
  return filled.base;
};

/** Resolve a gap value (token name or px) to a numeric pixel value. */
const resolveGap = (gap?: SpacingToken | number): number => {
  if (gap == null) return 0;
  if (typeof gap === 'number') return gap;
  const value = spacingTokens[gap];
  if (typeof value !== 'string') return 0;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * Walk the ancestor chain looking for the nearest element that scrolls —
 * `overflow-y: auto | scroll`. When found, we'll hand it to virtuoso as
 * its `customScrollParent`, so the drawer/modal's existing scroll IS the
 * virtualization scroll (single scroll, no double-scroll fight). When not
 * found, virtuoso uses its own internal scroll (library, rotation pages).
 */
const findScrollableAncestor = (el: HTMLElement): HTMLElement | null => {
  let p = el.parentElement;
  while (p && p !== document.body) {
    const overflowY = window.getComputedStyle(p).overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') return p;
    p = p.parentElement;
  }
  return null;
};

/** Hook returning the nearest scrollable ancestor, re-resolved on mount. */
const useScrollableAncestor = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [ancestor, setAncestor] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setAncestor(findScrollableAncestor(el));
  }, [containerRef]);
  return ancestor;
};

/**
 * Self-sizing height — only used when there's no scrollable ancestor (the
 * grid IS the scroll surface for the page). Measures `viewport - top - 16`
 * so naturally-flowing pages can drop `VirtualGrid` in without restructuring
 * ancestors. When there IS a scrollable ancestor, virtuoso uses
 * `customScrollParent` and this height is ignored.
 */
const useResolvedHeight = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setHeight(Math.max(100, window.innerHeight - rect.top - 16));
    };
    const obs = new ResizeObserver(update);
    obs.observe(el);
    window.addEventListener('resize', update);
    update();
    return () => {
      obs.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef, enabled]);
  return height;
};

/**
 * Windowed grid primitive — renders only the items currently in (or near)
 * the viewport. Auto-measures each cell's natural height via
 * `react-virtuoso`, so consumers don't pick magic-number `rowHeight`s per
 * breakpoint per card type. Same responsive `cols` and gap-token API as
 * `AutoGrid`.
 *
 * Behavior:
 *  - `cols=1` → `<Virtuoso>` (single-column list). Each item takes whatever
 *    height it renders at.
 *  - `cols>1` → `<VirtuosoGrid>` with a CSS-grid container. Cells reserve
 *    equal column width; the row height is whatever the tallest cell in
 *    that row needs.
 *
 * Use this for any list where the rendered count can reach the hundreds —
 * library grids, rotation pools, picker results, etc. For short lists
 * (under ~50 cells) prefer `AutoGrid`: native CSS-grid is simpler and has
 * no measurement overhead.
 */
export function VirtualGrid<T>({
  items,
  getKey,
  renderItem,
  cols = 1,
  gap = 0,
  style,
  className,
  onItemsRendered,
}: VirtualGridProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollAncestor = useScrollableAncestor(containerRef);
  // Self-sizing height only matters when we're driving our own scroll. When
  // a scrollable ancestor exists we hand the scroll to virtuoso via
  // `customScrollParent` — the ancestor's existing scroll IS the scroll.
  const usesAncestorScroll = scrollAncestor !== null;
  const viewportHeight = useResolvedHeight(containerRef, !usesAncestorScroll);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const gapPx = useMemo(() => resolveGap(gap), [gap]);
  const colCount = useMemo(
    () => resolveCols(cols, windowWidth),
    [cols, windowWidth],
  );

  // Stable key callback — virtuoso re-renders on identity changes, so a new
  // inline arrow per render would force a full remount. Memoize.
  const computeItemKey = useMemo(
    () => (index: number, item: T) => getKey(item, index),
    [getKey],
  );

  // Component override for VirtuosoGrid's internal list element — sets the
  // CSS-grid layout with the responsive column count + gap. Memoized so the
  // override identity is stable across renders (virtuoso treats a changed
  // `components.List` as a structural reset).
  const ListComponent = useMemo(() => {
    const Comp = forwardRef<
      HTMLDivElement,
      { style?: React.CSSProperties; children?: React.ReactNode }
    >(({ style: listStyle, children, ...rest }, ref) => (
      <div
        ref={ref}
        {...rest}
        style={{
          ...listStyle,
          display: 'grid',
          gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
          gap: gapPx,
        }}
      >
        {children}
      </div>
    ));
    Comp.displayName = 'VirtualGridList';
    return Comp;
  }, [colCount, gapPx]);

  const handleItemsRendered = useMemo(() => {
    if (!onItemsRendered) return undefined;
    return (range: { startIndex: number; endIndex: number }) => {
      onItemsRendered({
        startIndex: range.startIndex,
        stopIndex: range.endIndex,
      });
    };
  }, [onItemsRendered]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        // When we're driving our own scroll, the wrapper takes the measured
        // viewport-remaining height. When the scroll lives on an ancestor
        // (drawer body, modal), the wrapper is content-sized — virtuoso
        // pads the ancestor's scrollHeight to match the virtualized list.
        height: usesAncestorScroll
          ? 'auto'
          : viewportHeight > 0
            ? `${viewportHeight}px`
            : '100%',
        ...style,
      }}
    >
      {colCount === 1 ? (
        <Virtuoso
          data={items}
          computeItemKey={computeItemKey}
          itemContent={(index, item) => (
            <div style={{ paddingBottom: gapPx }}>
              {renderItem(item, index)}
            </div>
          )}
          rangeChanged={handleItemsRendered}
          // When a scrollable ancestor exists, hand the scroll to it so the
          // drawer/modal body's existing scrollbar drives virtualization
          // (single scroll, no double-scroll fight). Otherwise virtuoso
          // uses its own internal scroll inside the wrapper.
          customScrollParent={scrollAncestor ?? undefined}
          style={usesAncestorScroll ? undefined : { height: '100%' }}
        />
      ) : (
        <VirtuosoGrid
          data={items}
          computeItemKey={computeItemKey}
          itemContent={(index, item) => renderItem(item, index)}
          components={{ List: ListComponent }}
          rangeChanged={handleItemsRendered}
          customScrollParent={scrollAncestor ?? undefined}
          style={usesAncestorScroll ? undefined : { height: '100%' }}
        />
      )}
    </div>
  );
}
