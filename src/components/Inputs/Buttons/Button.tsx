import React from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { fontBase, fontWeight } from '../../../constants/font';
import { componentSizes } from './shared/sizes';
import { componentVariants } from './shared/variants';

export interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  variant?: keyof typeof componentVariants;
  fullWidth?: boolean;
}

export const Button = ({
  onClick,
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  styles,
  ...props
}: ButtonProps) => {
  const selectedVariant = componentVariants[variant];
  const selectedSize = componentSizes[size];

  const style = {
    root: {
      borderRadius: '8px',
      border: '1px solid white',
      width: fullWidth ? '100%' : 'fit-content',
      height: `${selectedSize.height}rem`,
      padding: selectedSize.padding,
      minWidth: `${selectedSize.minWidth}rem`,
      fontSize: selectedSize.fontSize,
      ...selectedVariant,
    },
    label: {
      ...fontBase,
      fontWeight: fontWeight['semibold'],
    },
    ...styles,
  };

  return <MantineButton styles={style} size={size} onClick={onClick} {...props} />;
};
