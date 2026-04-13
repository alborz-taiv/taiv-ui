import React from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { fontBase, fontWeight } from '../../../../constants/font';
import { componentSizes } from '../Button/sizes';
import { componentVariants } from '../shared/variants';

type OmittedProps = 'variant' | 'leftIcon' | 'rightIcon';

export interface SSOButtonProps extends Omit<MantineButtonProps, OmittedProps> {
  /** Display name of the provider (e.g. "Google", "Apple") */
  name: string;
  /** Provider icon rendered to the left of the label */
  icon: React.ReactNode;
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  fullWidth?: boolean;
}

export const SSOButton = ({
  name,
  icon,
  onClick,
  size = 'md',
  fullWidth = false,
  styles,
  children,
  ...props
}: SSOButtonProps) => {
  const selectedVariant = componentVariants['secondary'];
  const selectedSize = componentSizes[size];

  const style = {
    root: {
      borderRadius: '8px',
      width: fullWidth ? '100%' : 'fit-content',
      height: `${selectedSize.height}rem`,
      padding: selectedSize.padding,
      minWidth: `${selectedSize.minWidth}rem`,
      fontSize: selectedSize.fontSize,
      transition: 'background 0.1s ease-in-out',
      ...selectedVariant,
    },
    label: {
      ...fontBase,
      fontWeight: fontWeight['semibold'],
    },
    leftIcon: {
      marginRight: '1rem',
    },
    ...styles,
  };

  return (
    <MantineButton
      styles={style}
      size={size}
      onClick={onClick}
      leftIcon={icon}
      {...props}
    >
      {children ?? `Continue with ${name}`}
    </MantineButton>
  );
};
