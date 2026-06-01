import React from 'react';
import { neutral, white } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

export interface FloatingToolbarProps {
  children: React.ReactNode;
  /**
   * How `children` are separated. Default `spacing.xs`.
   */
  gap?: string | number;
  /**
   * When children overflow horizontally, scroll instead of wrapping. Default `true`.
   */
  scrollOverflow?: boolean;
  /**
   * Override the pill's inner padding. Accepts a CSS `padding` value.
   * Default `'4px 8px'`.
   */
  padding?: string | number;
  /**
   * Additional inline styles forwarded to the pill container. Consumers use
   * this to position the toolbar over a canvas — the component itself is
   * position-agnostic (see `SelectableObject` + consumer selection state
   * for the anchor/flipping behavior).
   */
  style?: React.CSSProperties;
  className?: string;
  /**
   * Accessible label for the toolbar. Default `'Formatting options'`.
   */
  ariaLabel?: string;
}

/**
 * Chrome for a Canva-style floating action toolbar. Renders a white pill with
 * shadow + border + horizontal overflow scrolling and a flex-row gap between
 * children. **Positioning is the consumer's responsibility** — wrap this in
 * your own portal / absolute-positioned shell, or use it inline.
 *
 * The *composition* inside (font select, size stepper, B/I/U, color pickers,
 * delete) stays in the consuming app since it depends on the canvas object's
 * shape. This component only ships the shell.
 *
 * @example
 * <div style={{ position: 'absolute', top: y, left: x, transform: 'translate(-50%, -100%)' }}>
 *   <FloatingToolbar>
 *     <Select ... />
 *     <Divider orientation="vertical" />
 *     <IconButton>...</IconButton>
 *   </FloatingToolbar>
 * </div>
 */
export const FloatingToolbar = ({
  children,
  gap = spacing.xs,
  scrollOverflow = true,
  padding = `${spacing.xxs} ${spacing.sm}`,
  style,
  className,
  ariaLabel = 'Formatting options',
}: FloatingToolbarProps) => {
  return (
    <div
      aria-label={ariaLabel}
      className={className}
      role='toolbar'
      style={{
        alignItems: 'center',
        backgroundColor: white,
        border: `1px solid ${neutral[50]}`,
        borderRadius: '999px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        display: 'inline-flex',
        gap,
        maxWidth: '100%',
        overflowX: scrollOverflow ? 'auto' : 'visible',
        overflowY: 'visible',
        padding,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
          {child}
        </div>
      ))}
    </div>
  );
};
