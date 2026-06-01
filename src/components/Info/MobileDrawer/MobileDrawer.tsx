import {
  Drawer as MantineDrawer,
  type DrawerProps as MantineDrawerProps,
} from '@mantine/core';
import type React from 'react';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Title } from '../../Typography/Title/Title';

export interface MobileDrawerProps
  extends Omit<MantineDrawerProps, 'position' | 'title' | 'children'> {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  /** Show the grab-handle at the top edge. Default `true`. */
  showGrabHandle?: boolean;
  /**
   * Max height as a viewport percentage (0–100). Default `75`. The sheet
   * never exceeds this — the body scrolls once content overflows.
   */
  maxHeightVh?: number;
  /**
   * Pixel offset from the viewport bottom. Use when a fixed bottom bar
   * (e.g. `BottomActionBar`) is rendered beneath the drawer — the sheet
   * stacks on top of it instead of overlapping. Default `0`.
   */
  bottomOffset?: number;
}

/**
 * Bottom-anchored mobile sheet with grab-handle, rounded top corners, and
 * flex column layout (header → scrollable body → pinned footer).
 * Pair with `Drawer` (right-anchored) or use `ResponsiveDrawer` to pick
 * between them automatically.
 */
export const MobileDrawer = ({
  children,
  title,
  subtitle,
  footer,
  header,
  showGrabHandle = true,
  maxHeightVh = 75,
  bottomOffset = 0,
  styles,
  ...props
}: MobileDrawerProps) => {
  const resolvedHeader =
    header ??
    (title ? (
      <div style={{ padding: `${spacing.xs} ${spacing.md} ${spacing.md}` }}>
        <Title variant='cardHeader'>{title}</Title>
        {subtitle ? <Title variant='cardSubheader'>{subtitle}</Title> : null}
      </div>
    ) : null);

  return (
    <MantineDrawer
      overlayProps={{ blur: 2, opacity: 0.3 }}
      position='bottom'
      size={`${maxHeightVh}vh`}
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 0,
        },
        content: {
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          bottom: bottomOffset || undefined,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: `${maxHeightVh}vh`,
          overflow: 'hidden',
        },
        header: { display: 'none' },
        ...styles,
      }}
      withCloseButton={false}
      {...props}
    >
      {showGrabHandle ? (
        <div
          style={{
            display: 'flex',
            flex: '0 0 auto',
            justifyContent: 'center',
            padding: `${spacing.sm} 0 ${spacing.xs}`,
          }}
        >
          <div
            style={{
              backgroundColor: neutral[100],
              borderRadius: '999px',
              height: 4,
              width: 40,
            }}
          />
        </div>
      ) : null}
      {resolvedHeader}
      <div
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto',
          padding: `0 ${spacing.md} ${spacing.md}`,
        }}
      >
        {children}
      </div>
      {footer ? (
        <div
          style={{
            borderTop: `1px solid ${neutral[50]}`,
            flex: '0 0 auto',
            padding: spacing.md,
          }}
        >
          {footer}
        </div>
      ) : null}
    </MantineDrawer>
  );
};
