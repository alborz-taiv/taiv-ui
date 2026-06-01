import React, { useState } from 'react';
import { neutral, primary, white } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Text } from '../../Typography/Text/Text';

export interface BottomActionBarItem {
  /** Stable identifier for React key + accessibility. */
  id: string;
  /** Icon element (e.g. `<IconLayout />`). Rendered above the label. */
  icon: React.ReactNode;
  /** Short label rendered below the icon. */
  label: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  /** Mark the item as active / pressed. */
  active?: boolean;
  /** Accessibility label. Defaults to `label` when it's a string. */
  ariaLabel?: string;
}

export interface BottomActionBarProps {
  items: BottomActionBarItem[];
  /** Pin to the viewport bottom. Default `true`. */
  fixed?: boolean;
  /** z-index when `fixed`. Default `20` (below `SelectionToolbar` at 30). */
  zIndex?: number;
  /** Backdrop blur intensity in px. Default `8`. 0 disables the blur. */
  blur?: number;
  /** Override the container height (px). Default `64`. */
  height?: number;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Launcher row of icon+label cells, typically used to switch between tools
 * (layout / text / media / animate…) at the bottom of a canvas-like editor.
 * Columns auto-distribute evenly via `grid-template-columns: repeat(N, 1fr)`.
 *
 * `SelectionToolbar` and modals should sit above this bar — keep their
 * `z-index` above the default `20`. `MobileDrawer` should receive
 * `bottomOffset={height}` so sheets stack on top rather than overlap.
 */
export const BottomActionBar = ({
  items,
  fixed = true,
  zIndex = 20,
  blur = 8,
  height = 64,
  ariaLabel = 'Editor tools',
  className,
  style,
}: BottomActionBarProps) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={className}
      style={{
        backdropFilter: blur ? `blur(${blur}px)` : undefined,
        backgroundColor: blur ? 'rgba(255, 255, 255, 0.85)' : white,
        borderTop: `1px solid ${neutral[50]}`,
        bottom: fixed ? 0 : undefined,
        display: 'grid',
        gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        height,
        left: fixed ? 0 : undefined,
        position: fixed ? 'fixed' : 'relative',
        right: fixed ? 0 : undefined,
        width: fixed ? '100%' : undefined,
        zIndex: fixed ? zIndex : undefined,
        ...style,
      }}
    >
      {items.map((item, i) => (
        <BottomActionBarButton
          key={item.id}
          item={item}
          showDivider={i < items.length - 1}
        />
      ))}
    </nav>
  );
};

const BottomActionBarButton = ({
  item,
  showDivider,
}: {
  item: BottomActionBarItem;
  showDivider: boolean;
}) => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const labelText =
    item.ariaLabel ??
    (typeof item.label === 'string' ? item.label : undefined);
  const showPrimary = !item.disabled && (item.active || hover || focus);
  const color = showPrimary ? primary[200] : neutral[200];

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <button
        aria-label={labelText}
        aria-pressed={item.active ? true : undefined}
        disabled={item.disabled}
        onClick={item.onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
          setHover(false);
        }}
        style={{
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          color,
          cursor: item.disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.xs,
          height: '100%',
          justifyContent: 'center',
          opacity: item.disabled ? 0.5 : 1,
          // Browser default focus outline reads as a yellow/orange box on
          // some platforms. Suppress it — the primary-color text + icon
          // treatment driven by `focus` state is the keyboard-visible cue.
          outline: 'none',
          padding: spacing.xs,
          transition: 'color 150ms ease',
          WebkitTapHighlightColor: 'transparent',
          width: '100%',
        }}
        type='button'
      >
        <span
          style={{
            alignItems: 'center',
            color: 'inherit',
            display: 'inline-flex',
            height: 24,
            justifyContent: 'center',
            width: 24,
          }}
        >
          {item.icon}
        </span>
        <Text
          variant='label'
          weight={item.active ? 'semibold' : 'medium'}
          color='inherit'
          styles={{ lineHeight: 1 }}
        >
          {item.label}
        </Text>
      </button>
      {showDivider ? (
        <span
          aria-hidden='true'
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 1,
            height: 24,
            backgroundColor: neutral[50],
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </div>
  );
};
