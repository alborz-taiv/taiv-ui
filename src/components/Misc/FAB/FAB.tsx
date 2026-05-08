import { ReactElement } from 'react';
import { spacing } from '../../../constants/spacing';
import { useTablet } from '../../../hooks/useMediaQuery';
import { IconButton, IconButtonProps } from '../../Inputs/Buttons/IconButton/IconButton';
import { Box } from '../../Layout/Box/Box';

export type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface FABProps {
  /**
   * Icon rendered inside the button. Sized automatically by IconButton.
   */
  icon: ReactElement<{ size?: number }>;
  onClick: () => void;
  /**
   * Required for accessibility — the FAB has no visible label.
   */
  ariaLabel: string;
  variant?: IconButtonProps['variant'];
  size?: IconButtonProps['size'];
  /**
   * Corner of the viewport to anchor to. Default `'bottom-right'`.
   */
  position?: FABPosition;
  /**
   * Distance from the anchored edges. Accepts any CSS length. Default `spacing.lg` (16px).
   */
  offset?: number | string;
  /**
   * When true, only renders on tablet/mobile viewports (≤ 768px). Default `true` —
   * the FAB is intended as a mobile/tablet pattern. Set `false` to always render.
   */
  mobileOnly?: boolean;
  /**
   * Explicit override to suppress rendering regardless of viewport.
   */
  hidden?: boolean;
  zIndex?: number;
  'data-testid'?: string;
}

// Bottom-anchored FABs additively read `--app-bottom-inset` from the
// document so apps with a fixed bottom chrome (e.g. mobile nav) can lift
// every FAB clear of the bar without each consumer threading an explicit
// offset. Defaults to `0px` when the variable isn't set, so apps without
// bottom chrome see no behavior change.
const APP_BOTTOM_INSET_VAR = 'var(--app-bottom-inset, 0px)';

const toCssLength = (offset: number | string): string =>
  typeof offset === 'number' ? `${offset}px` : offset;

const positionStyle = (
  position: FABPosition,
  offset: number | string,
): React.CSSProperties => {
  const o = toCssLength(offset);
  const bottomWithInset = `calc(${o} + ${APP_BOTTOM_INSET_VAR})`;
  switch (position) {
    case 'bottom-right':
      return { bottom: bottomWithInset, right: o };
    case 'bottom-left':
      return { bottom: bottomWithInset, left: o };
    case 'top-right':
      return { top: o, right: o };
    case 'top-left':
      return { top: o, left: o };
  }
};

/**
 * Floating Action Button. A `position: fixed` IconButton with shadow, used for the
 * primary action on a page when screen real estate is tight (typically mobile).
 *
 * Defaults to mobile-only (≤ 768px). On desktop, prefer an inline `<Button>` for the
 * same action and let the FAB take over on smaller viewports — the two should trigger
 * the same handler.
 *
 * @example
 * <FAB
 *   icon={<IconPlus />}
 *   onClick={openAddDeviceModal}
 *   ariaLabel="Add device"
 * />
 */
export const FAB = ({
  icon,
  onClick,
  ariaLabel,
  variant = 'primary',
  size = 'lg',
  position = 'bottom-right',
  offset = spacing.lg,
  mobileOnly = true,
  hidden = false,
  zIndex = 10,
  'data-testid': dataTestId,
}: FABProps) => {
  const isTablet = useTablet();

  if (hidden) return null;
  if (mobileOnly && !isTablet) return null;

  return (
    <Box
      style={{
        position: 'fixed',
        zIndex,
        ...positionStyle(position, offset),
      }}
    >
      <IconButton
        aria-label={ariaLabel}
        data-testid={dataTestId}
        onClick={onClick}
        radius='50%'
        shadow
        size={size}
        variant={variant}
      >
        {icon}
      </IconButton>
    </Box>
  );
};
