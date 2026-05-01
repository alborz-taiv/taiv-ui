import { Box, type CSSObject } from '@mantine/core';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react';

export interface OverflowFadeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Color the gradient fades into. Match the surrounding surface so the
   * fade reads as "the strip dissolves into the page". Default: 'white'.
   */
  background?: string;
  /**
   * Size of each fade band from the edge in px — width for horizontal
   * (`orientation="horizontal"`), height for vertical (`orientation="vertical"`).
   * Default: 64.
   */
  fadeWidth?: number;
  /**
   * Scroll axis. Horizontal: left/right fades (default). Vertical: top/bottom
   * fades — pass `maxHeight` on the scroll viewport so content can clip.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * When `orientation` is `vertical`, caps the scroll viewport (e.g. `'65vh'`).
   * Without this, the block grows with content and no vertical scroll (or fades)
   * occurs.
   */
  maxHeight?: CSSProperties['maxHeight'];
  children: ReactNode;
}

const scrollbarHiddenSx = {
  '&::-webkit-scrollbar': { display: 'none' },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
} as const;

/**
 * Wraps scrollable content with bidirectional gradient fades that auto-detect
 * overflow state.
 *
 * **Horizontal** (`orientation="horizontal"`, default): `overflow-x` scroll,
 * left fade once scrolled away from the start, right fade when more content
 * exists past the right edge. Both hidden when content fits.
 *
 * **Vertical** (`orientation="vertical"`): `overflow-y` scroll; set `maxHeight`
 * so the viewport clips. Top fade once scrolled down; bottom fade when more
 * content exists below. Hidden when content fits.
 *
 * The scrollbar is hidden by design — the fade is the affordance.
 */
export const OverflowFade = forwardRef<HTMLDivElement, OverflowFadeProps>(
  (
    {
      background = 'white',
      fadeWidth = 64,
      orientation = 'horizontal',
      maxHeight,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      const update = () => {
        if (orientation === 'vertical') {
          const overflowing = el.scrollHeight > el.clientHeight;
          setShowTop(overflowing && el.scrollTop > 0);
          setShowBottom(
            overflowing && el.scrollTop + el.clientHeight < el.scrollHeight - 1,
          );
        } else {
          const overflowing = el.scrollWidth > el.clientWidth;
          setShowLeft(overflowing && el.scrollLeft > 0);
          setShowRight(
            overflowing && el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
          );
        }
      };
      update();
      el.addEventListener('scroll', update, { passive: true });
      const ro = new ResizeObserver(update);
      ro.observe(el);
      const mo = new MutationObserver(update);
      mo.observe(el, { characterData: true, childList: true, subtree: true });
      return () => {
        el.removeEventListener('scroll', update);
        ro.disconnect();
        mo.disconnect();
      };
    }, [orientation]);

    const horizontalFadeBand: CSSProperties = {
      bottom: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      transition: 'opacity 150ms ease',
      width: `${fadeWidth}px`,
    };

    const verticalFadeBand: CSSProperties = {
      height: `${fadeWidth}px`,
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
      transition: 'opacity 150ms ease',
    };

    const scrollSx: CSSObject =
      orientation === 'vertical'
        ? {
            ...scrollbarHiddenSx,
            maxHeight,
            overflowX: 'hidden',
            overflowY: 'auto',
            width: '100%',
          }
        : {
            ...scrollbarHiddenSx,
            overflowX: 'auto',
            overflowY: 'hidden',
            width: '100%',
          };

    return (
      <div
        ref={ref}
        style={{ position: 'relative', width: '100%', ...style }}
        {...props}
      >
        <Box ref={scrollRef} sx={scrollSx}>
          {children}
        </Box>
        {orientation === 'horizontal' ? (
          <>
            <div
              aria-hidden
              style={{
                ...horizontalFadeBand,
                background: `linear-gradient(to right, ${background} 0%, ${background} 20%, transparent 100%)`,
                left: 0,
                opacity: showLeft ? 1 : 0,
              }}
            />
            <div
              aria-hidden
              style={{
                ...horizontalFadeBand,
                background: `linear-gradient(to left, ${background} 0%, ${background} 20%, transparent 100%)`,
                opacity: showRight ? 1 : 0,
                right: 0,
              }}
            />
          </>
        ) : (
          <>
            <div
              aria-hidden
              style={{
                ...verticalFadeBand,
                background: `linear-gradient(to bottom, ${background} 0%, ${background} 20%, transparent 100%)`,
                opacity: showTop ? 1 : 0,
                top: 0,
              }}
            />
            <div
              aria-hidden
              style={{
                ...verticalFadeBand,
                background: `linear-gradient(to top, ${background} 0%, ${background} 20%, transparent 100%)`,
                bottom: 0,
                opacity: showBottom ? 1 : 0,
              }}
            />
          </>
        )}
      </div>
    );
  },
);

OverflowFade.displayName = 'OverflowFade';
