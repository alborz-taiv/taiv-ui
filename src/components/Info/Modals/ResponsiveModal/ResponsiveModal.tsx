import type React from 'react';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';
import { MobileDrawer } from '../../MobileDrawer/MobileDrawer';
import { Modal } from '../Modal/Modal';

export interface ResponsiveModalProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Width at which we switch from `MobileDrawer` to `Modal`. Default `768`. */
  breakpoint?: number;
  /** Modal width when rendering as `Modal`. */
  width?: string | number;
  /**
   * Sheet height (viewport %) when rendering as `MobileDrawer`. The sheet is
   * fixed at this height, not content-sized — raise it for dense content.
   */
  maxHeightVh?: number;
  /** Show the grab handle when rendering as `MobileDrawer`. Default `true`. */
  showGrabHandle?: boolean;
}

/**
 * Renders a centered `Modal` at/above the breakpoint and a bottom-anchored
 * `MobileDrawer` below it, so consumers author one markup tree for both.
 * Modal counterpart of `ResponsiveDrawer`.
 */
export const ResponsiveModal = ({
  opened,
  onClose,
  children,
  title,
  subtitle,
  breakpoint = 768,
  width,
  maxHeightVh,
  showGrabHandle,
}: ResponsiveModalProps) => {
  const isNarrow = useMediaQuery(`(max-width: ${breakpoint - 1}px)`);

  if (isNarrow) {
    return (
      <MobileDrawer
        maxHeightVh={maxHeightVh}
        onClose={onClose}
        opened={opened}
        showGrabHandle={showGrabHandle}
        subtitle={subtitle}
        title={title}
      >
        {children}
      </MobileDrawer>
    );
  }

  return (
    <Modal
      onClose={onClose}
      opened={opened}
      subtitle={subtitle}
      title={title}
      width={width}
    >
      {children}
    </Modal>
  );
};
