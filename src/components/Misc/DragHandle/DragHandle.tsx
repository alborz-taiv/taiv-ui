import type React from 'react';
import { forwardRef } from 'react';
import { neutral } from '../../../constants/colors';

export interface DragHandleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessibility label. Default `'Reorder'`. */
  ariaLabel?: string;
  /** Size of the handle box (px). Default `20`. */
  size?: number;
  /** Dot color. Default `neutral[200]`. */
  color?: string;
  /** Called with `-1` / `+1` on arrow-key reorder. */
  onReorder?: (direction: -1 | 1) => void;
}

/**
 * Drag handle primitive — six-dot pattern rendered as a real `<button>` so
 * accessibility (focus, keyboard reorder, aria-label) lives here, not on each
 * consumer. Pair with `@dnd-kit` or similar; the handle's ref forwards to the
 * underlying button element for listener attachment.
 */
export const DragHandle = forwardRef<HTMLButtonElement, DragHandleProps>(
  (
    {
      ariaLabel = 'Reorder',
      size = 20,
      color = neutral[200],
      onReorder,
      onKeyDown,
      style,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (onReorder) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          onReorder(-1);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          onReorder(1);
        }
      }
      onKeyDown?.(e);
    };

    return (
      <button
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        ref={ref}
        style={{
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          borderRadius: 4,
          cursor: 'grab',
          display: 'inline-flex',
          height: size,
          justifyContent: 'center',
          padding: 0,
          touchAction: 'none',
          width: size,
          ...style,
        }}
        type='button'
        {...props}
      >
        <svg
          aria-hidden='true'
          fill='none'
          height={size}
          viewBox='0 0 20 20'
          width={size}
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='7' cy='5' fill={color} r='1.5' />
          <circle cx='13' cy='5' fill={color} r='1.5' />
          <circle cx='7' cy='10' fill={color} r='1.5' />
          <circle cx='13' cy='10' fill={color} r='1.5' />
          <circle cx='7' cy='15' fill={color} r='1.5' />
          <circle cx='13' cy='15' fill={color} r='1.5' />
        </svg>
      </button>
    );
  },
);

DragHandle.displayName = 'DragHandle';
