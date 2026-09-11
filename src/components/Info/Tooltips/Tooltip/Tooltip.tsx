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
  /**
   * Overrides the position-derived slide transition — e.g. 'fade' for
   * hover-dense surfaces (status badges in table rows) where a directional
   * slide on every hover reads as jumpy.
   */
  transition?: MantineTransition;
  /** Transition duration in ms. Defaults to 200. */
  transitionDuration?: number;
  /**
   * Delay in ms before the tooltip opens. Defaults to 0 — set one on
   * hover-dense surfaces (table rows, chip strips) so scanning the pointer
   * across the list doesn't flash a tooltip on every element it crosses.
   */
  openDelay?: number;
}

const Tooltip = ({ children, text, position = 'top-start', offset, className, styles, maxWidth, disabled, fullWidth, transition, transitionDuration, openDelay }: TooltipProps) => {
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
      transitionProps={{ transition: transition ?? positionToTransition[position], duration: transitionDuration ?? 200 }}
      openDelay={openDelay}
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
