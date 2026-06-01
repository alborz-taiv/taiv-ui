import {
  Drawer as MantineDrawer,
  type DrawerProps as MantineDrawerProps,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import type React from 'react';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { IconButton } from '../../Inputs/Buttons/IconButton/IconButton';
import { Group } from '../../Layout/Group/Group';
import { Title } from '../../Typography/Title/Title';

export type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

export interface DrawerProps
  extends Omit<MantineDrawerProps, 'title' | 'children'> {
  /** Body content. Scrolls independently of header + pinned footer. */
  children: React.ReactNode;
  /** Title shown in the header slot. If omitted, no header renders. */
  title?: React.ReactNode;
  /** Optional subtitle / metadata underneath the title. */
  subtitle?: React.ReactNode;
  /** Pinned footer. Stays visible while the body scrolls. */
  footer?: React.ReactNode;
  /** Show the built-in close button in the header. Default `true`. */
  showClose?: boolean;
  /** Swap the header for a fully custom node. Bypasses title/subtitle/close. */
  header?: React.ReactNode;
}

/**
 * Side drawer built on Mantine v6 with pinned header + footer slots.
 * Right-anchored by default — use `MobileDrawer` for bottom-anchored mobile
 * sheets, or `ResponsiveDrawer` for automatic right/bottom switching.
 */
export const Drawer = ({
  children,
  title,
  subtitle,
  footer,
  header,
  showClose = true,
  position = 'right',
  size = 'md',
  onClose,
  styles,
  ...props
}: DrawerProps) => {
  const resolvedHeader =
    header ??
    (title ? (
      <Group
        position='apart'
        style={{
          borderBottom: `1px solid ${neutral[50]}`,
          padding: spacing.md,
        }}
      >
        <div>
          <Title variant='cardHeader'>{title}</Title>
          {subtitle ? <Title variant='cardSubheader'>{subtitle}</Title> : null}
        </div>
        {showClose ? (
          <IconButton onClick={onClose} size='sm' variant='secondary'>
            <IconX />
          </IconButton>
        ) : null}
      </Group>
    ) : null);

  return (
    <MantineDrawer
      onClose={onClose}
      overlayProps={{ blur: 2, opacity: 0.3 }}
      position={position}
      size={size}
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 0,
        },
        content: {
          display: 'flex',
          flexDirection: 'column',
        },
        header: {
          display: 'none',
        },
        ...styles,
      }}
      withCloseButton={false}
      {...props}
    >
      {resolvedHeader}
      <div
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          overflowY: 'auto',
          padding: spacing.md,
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
