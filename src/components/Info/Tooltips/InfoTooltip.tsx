import React from 'react';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { Tooltip } from './Tooltip';

interface InfoTooltipProps {
  text: React.ReactNode;
  content?: React.ReactNode;
  position?: 'top-end' | 'bottom-end' | 'top-start' | 'bottom-start';
  size?: keyof typeof componentSizes;
  offset?: number;
  className?: string;
  styles?: Record<string, CSSObject>;
}

const componentSizes = {
  sm: '1.2rem',
  md: '1.6rem',
  lg: '2rem',
  xl: '2.4rem',
} as const;

const InfoTooltip = ({ text, content, position = 'top-start', size = 'md', offset, className, styles }: InfoTooltipProps) => {
  const style = {
    icon: {
      color: neutral[100],
      fontSize: componentSizes[size],
    },
    ...styles,
  };

  return (
    <Tooltip text={text || content} position={position} offset={offset} className={className}>
      <i className="fas fa-info-circle" style={style.icon} />
    </Tooltip>
  );
};

export { InfoTooltip };
