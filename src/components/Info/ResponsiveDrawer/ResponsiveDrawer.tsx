import type React from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Drawer, type DrawerPosition } from '../Drawer/Drawer';
import { MobileDrawer } from '../MobileDrawer/MobileDrawer';

export interface ResponsiveDrawerAnchor {
  /** Anchor used below the `breakpoint` width. */
  base: 'bottom' | 'right' | 'left' | 'top';
  /** Anchor used at/above the `breakpoint` width. */
  md: 'bottom' | 'right' | 'left' | 'top';
}

export interface ResponsiveDrawerProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  /** Width at which we switch from `base` to `md`. Default `768`. */
  breakpoint?: number;
  /** Anchor resolution across breakpoints. Default `{ base: 'bottom', md: 'right' }`. */
  anchor?: ResponsiveDrawerAnchor;
  /** Size prop forwarded to the active drawer variant. */
  size?: string | number;
  /** Max sheet height (viewport %) when rendering as `MobileDrawer`. */
  maxHeightVh?: number;
  /** Show the grab handle when rendering as `MobileDrawer`. Default `true`. */
  showGrabHandle?: boolean;
  /** Show the header close button when rendering as `Drawer`. Default `true`. */
  showClose?: boolean;
  /** Pixel offset from the viewport bottom when rendering as `MobileDrawer`. */
  bottomOffset?: number;
}

/**
 * Branches between `Drawer` and `MobileDrawer` at a breakpoint so consumers
 * can author a single markup tree for both. Content shape (title / subtitle /
 * footer / header) stays identical across both variants.
 */
export const ResponsiveDrawer = ({
  opened,
  onClose,
  children,
  title,
  subtitle,
  footer,
  header,
  breakpoint = 768,
  anchor = { base: 'bottom', md: 'right' },
  size,
  maxHeightVh,
  showGrabHandle,
  showClose,
  bottomOffset,
}: ResponsiveDrawerProps) => {
  const isNarrow = useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
  const activeAnchor = isNarrow ? anchor.base : anchor.md;

  if (activeAnchor === 'bottom') {
    return (
      <MobileDrawer
        bottomOffset={bottomOffset}
        footer={footer}
        header={header}
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
    <Drawer
      footer={footer}
      header={header}
      onClose={onClose}
      opened={opened}
      position={activeAnchor as DrawerPosition}
      showClose={showClose}
      size={size}
      subtitle={subtitle}
      title={title}
    >
      {children}
    </Drawer>
  );
};
