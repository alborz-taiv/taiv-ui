import React from 'react';
import { UnstyledButton } from '@mantine/core';
import { neutral } from '../../../constants/colors';
import { fontBase, fontSize, fontWeight } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';
import { Text } from '../../Typography/Text/Text';

export interface HoverCardMenuItemProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  rightSection?: React.ReactNode;
}

const HoverCardMenuItem = ({
  children,
  className,
  disabled,
  leftSection,
  onClick,
  rightSection,
}: HoverCardMenuItemProps) => (
  <UnstyledButton
    className={className}
    disabled={disabled}
    onClick={onClick}
    sx={{
      ...fontBase,
      ...fontSize.sm,
      alignItems: 'center',
      borderRadius: '6px',
      color: neutral[300],
      display: 'flex',
      fontWeight: fontWeight.medium,
      gap: spacing.sm,
      justifyContent: 'space-between',
      padding: `${spacing.sm} ${spacing.md}`,
      width: '100%',
      '&:hover:not(:disabled)': { backgroundColor: neutral[25] },
      '&:disabled': { cursor: 'not-allowed', opacity: 0.6 },
    }}
  >
    {leftSection}
    <Text
      color={neutral[300]}
      styles={{ flex: 1, minWidth: 0, textAlign: 'left' }}
      truncate
      variant='label'
    >
      {children}
    </Text>
    {rightSection}
  </UnstyledButton>
);

export { HoverCardMenuItem };
