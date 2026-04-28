import { Box } from '@mantine/core';
import { forwardRef, useEffect, useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface OverflowFadeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Color the gradient fades into. Match the surrounding surface so the
   * fade reads as "the strip dissolves into the page". Default: 'white'.
   */
  background?: string;
  /** Width of each fade in px. Default: 64. */
  fadeWidth?: number;
  children: ReactNode;
}

/**
 * Wraps any horizontal-scroll content with bidirectional gradient fades
 * that auto-detect overflow state.
 *
 * - Left fade appears once the user has scrolled away from the start.
 * - Right fade appears whenever there's content past the right edge.
 * - Both fades are hidden when the content fits without scrolling.
 *
 * The scrollbar is hidden by design — the fade is the affordance.
 */
export const OverflowFade = forwardRef<HTMLDivElement, OverflowFadeProps>(
  ({ background = 'white', fadeWidth = 64, children, style, ...props }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      const update = () => {
        const overflowing = el.scrollWidth > el.clientWidth;
        setShowLeft(overflowing && el.scrollLeft > 0);
        // -1 buffer for sub-pixel rounding at the right edge.
        setShowRight(overflowing && el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
      };
      update();
      el.addEventListener('scroll', update, { passive: true });
      const ro = new ResizeObserver(update);
      ro.observe(el);
      // Re-check when content inside changes size (e.g. async-loaded tabs).
      const mo = new MutationObserver(update);
      mo.observe(el, { childList: true, subtree: true, characterData: true });
      return () => {
        el.removeEventListener('scroll', update);
        ro.disconnect();
        mo.disconnect();
      };
    }, []);

    const baseFadeStyle: CSSProperties = {
      bottom: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      transition: 'opacity 150ms ease',
      width: `${fadeWidth}px`,
    };

    return (
      <div ref={ref} style={{ position: 'relative', ...style }} {...props}>
        <Box
          ref={scrollRef}
          sx={{
            msOverflowStyle: 'none',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {children}
        </Box>
        <div
          aria-hidden
          style={{
            ...baseFadeStyle,
            background: `linear-gradient(to right, ${background} 0%, ${background} 20%, transparent 100%)`,
            left: 0,
            opacity: showLeft ? 1 : 0,
          }}
        />
        <div
          aria-hidden
          style={{
            ...baseFadeStyle,
            background: `linear-gradient(to left, ${background} 0%, ${background} 20%, transparent 100%)`,
            opacity: showRight ? 1 : 0,
            right: 0,
          }}
        />
      </div>
    );
  },
);

OverflowFade.displayName = 'OverflowFade';
