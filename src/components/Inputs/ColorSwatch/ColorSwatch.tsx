import { ColorSwatch as MantineColorSwatch } from '@mantine/core';
import type React from 'react';
import { neutral, primary } from '../../../constants/colors';

export interface ColorSwatchProps {
  /** CSS color string — hex, rgb(a), or `linear-gradient(...)` / `radial-gradient(...)`. */
  color: string;
  /** Width and height in px (square). Default `32`. */
  size?: number;
  /** Highlights the swatch with a primary-colored ring. */
  selected?: boolean;
  /** Click handler. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessibility label — required when no children. */
  ariaLabel?: string;
  /** Disable the swatch. */
  disabled?: boolean;
  /** Inner shadow on the swatch (Mantine prop). */
  withShadow?: boolean;
  /** Border radius. Default `'xl'` (circular). */
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
}

/**
 * Clickable color swatch — a Mantine `ColorSwatch` rendered as a `<button>`
 * with a focus ring and an optional `selected` highlight. Use for quick-pick
 * palettes, gradient stop selection, or anywhere the user is choosing among a
 * fixed set of colors.
 */
export const ColorSwatch = ({
  ariaLabel,
  color,
  disabled = false,
  onClick,
  radius = 'xl',
  selected = false,
  size = 32,
  withShadow = true,
}: ColorSwatchProps) => {
  return (
    <MantineColorSwatch
      aria-label={ariaLabel}
      aria-pressed={selected}
      color={color}
      component='button'
      disabled={disabled}
      onClick={onClick}
      radius={radius}
      size={size}
      styles={{
        // Mantine paints the color via an inner overlay using inline
        // `style={{ backgroundColor: color }}`. That's invalid CSS for gradient
        // strings, so the transparency-checker overlay underneath shows through
        // and the swatch looks gray. Hide the checker — the root's
        // `background: color` shorthand below paints both solids and gradients
        // correctly.
        alphaOverlay: {
          display: 'none',
        },
        root: {
          background: color,
          border: `1px solid ${neutral[100]}`,
          boxShadow: selected
            ? `0 0 0 2px ${primary[200]}`
            : undefined,
          cursor: disabled ? 'not-allowed' : 'pointer',
          // Mantine's `size` prop runs through `rem()`, which is rescaled in
          // host apps that use `html { font-size: 62.5% }`. Pin width/height
          // here so the swatch always paints at the px size we asked for.
          height: size,
          minWidth: size,
          opacity: disabled ? 0.5 : 1,
          padding: 0,
          transition: 'box-shadow 0.15s, transform 0.15s',
          width: size,
          '&:focus-visible': {
            boxShadow: `0 0 0 2px ${primary[200]}`,
            outline: 'none',
          },
          '&:hover:not(:disabled)': {
            transform: 'scale(1.08)',
          },
        },
      }}
      withShadow={withShadow}
    />
  );
};
