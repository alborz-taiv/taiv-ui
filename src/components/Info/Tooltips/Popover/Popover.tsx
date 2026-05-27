import React from 'react';
import { Popover as MantinePopover, Box, MantineTransition } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../../constants/colors';
import { fontBase, fontSize, fontWeight } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';

interface PopoverProps {
  children: React.ReactNode;
  text?: React.ReactNode;
  position?: 'top-end' | 'bottom-end' | 'top-start' | 'bottom-start';
  offset?: number;
  className?: string;
  styles?: Record<string, CSSObject>;
  maxWidth?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Popover = ({ children, text, position = 'top-start', offset, className, styles, maxWidth, disabled, fullWidth }: PopoverProps) => {
  const wrapperStyle = fullWidth
    ? { display: 'block', width: '100%', minWidth: 0 }
    : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
      };

  const popoverStyle = {
    dropdown: {
      ...fontBase,
      color: neutral[200],
      fontWeight: fontWeight['medium'],
      boxShadow: '0px 0px 19px 0px #00000040',
      borderRadius: '8px',
      textWrap: 'wrap',
      maxWidth: maxWidth || '375px',
      padding: `${spacing.sm} 11.25px`,
      ...fontSize['sm'],
      height: 'fit-content',
    },
    ...styles,
  };

  return (
    <MantinePopover
      withArrow
      arrowRadius={0}
      arrowSize={10}
      position={position}
      styles={popoverStyle}
      offset={offset}
      withinPortal={true}
      disabled={disabled}
    >
      <MantinePopover.Target>
        <Box sx={wrapperStyle} className={className}>{children}</Box>
      </MantinePopover.Target>
      <MantinePopover.Dropdown>{text}</MantinePopover.Dropdown>
    </MantinePopover>
  );
};

export { Popover };
