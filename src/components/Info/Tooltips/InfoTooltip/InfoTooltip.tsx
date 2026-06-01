import React from 'react';
import { CSSObject } from '@mantine/styles';
import { error, neutral, warning } from '../../../../constants/colors';
import { Tooltip } from '../Tooltip/Tooltip';
import { useTouchDevice } from '../../../../hooks/useMediaQuery';
import { Popover } from '../Popover/Popover';

interface InfoTooltipProps {
  text?: React.ReactNode;
  content?: React.ReactNode;
  position?: 'top-end' | 'bottom-end' | 'top-start' | 'bottom-start';
  size?: keyof typeof componentSizes;
  offset?: number;
  className?: string;
  styles?: Record<string, CSSObject>;
  maxWidth?: string;
  variant?: keyof typeof componentVariants;
}

const componentVariants = {
  info: {
    color: neutral[100],
    icon: 'fas fa-info-circle',
  },
  warning: {
    color: warning[100],
    icon: 'fas fa-triangle-exclamation',
  },
  error: {
    color: error[100],
    icon: 'fas fa-exclamation-circle',
  },
};

const componentSizes = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
} as const;

const InfoTooltip = ({ text, content, position = 'top-start', size = 'md', offset, className, styles, maxWidth, variant = 'info' }: InfoTooltipProps) => {
  const style = {
    icon: {
      color: componentVariants[variant].color,
      fontSize: componentSizes[size],
    },
    ...styles,
  };

  const isTouchDevice = useTouchDevice();

  return (
    <>
      {isTouchDevice ?
        <Popover text={text || content} position={position} offset={offset} className={className} maxWidth={maxWidth}>
          <i className={componentVariants[variant].icon} style={style.icon} />
        </Popover>
        : 
        <Tooltip text={text || content} position={position} offset={offset} className={className} maxWidth={maxWidth}>
          <i className={componentVariants[variant].icon} style={style.icon} />
        </Tooltip>
      }
    </>
  );
};

export { InfoTooltip };
