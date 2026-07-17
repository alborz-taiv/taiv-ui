import React from 'react';
import { Tooltip as MantineTooltip, Box, MantineTransition } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../../constants/colors';
import { fontBase, fontSize, fontWeight } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';

interface TooltipProps {
  children: React.ReactNode;
  text?: React.ReactNode;
  position?: 'top-end' | 'bottom-end' | 'top-start' | 'bottom-start';
  offset?: number;
  className?: string;
  styles?: Record<string, CSSObject>;
  maxWidth?: string;
  /** When true, the tooltip will not render. */
  disabled?: boolean;
  /** When true, the wrapper fills its parent width instead of shrinking to content. */
  fullWidth?: boolean;
}

const Tooltip = ({ children, text, position = 'top-start', offset, className, styles, maxWidth, disabled, fullWidth }: TooltipProps) => {
  const positionToTransition: Record<string, MantineTransition> = {
    'top-end': 'slide-up',
    'bottom-end': 'slide-down',
    'top-start': 'slide-up',
    'bottom-start': 'slide-down',
  };

  const wrapperStyle = fullWidth
    ? { display: 'block', width: '100%', minWidth: 0 }
    : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'fit-content',
      };

  const tooltipStyle = {
    tooltip: {
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
    <MantineTooltip
      withArrow
      arrowRadius={0}
      arrowSize={8}
      arrowPosition="center"
      label={text}
      position={position}
      transitionProps={{ transition: positionToTransition[position], duration: 200 }}
      color="white"
      styles={tooltipStyle}
      offset={offset}
      className={className}
      withinPortal={true}
      disabled={disabled}
    >
      <Box sx={wrapperStyle}>{children}</Box>
    </MantineTooltip>
  );
};

export { Tooltip };
