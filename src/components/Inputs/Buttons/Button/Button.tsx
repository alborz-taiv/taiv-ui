import React from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { fontBase, fontWeight } from '../../../../constants/font';
import { componentSizes } from './sizes';
import { componentVariants } from '../shared/variants';

export interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  variant?: keyof typeof componentVariants;
  fullWidth?: boolean;
  toggled?: boolean;
  shadow?: boolean;
}

export const Button = ({ onClick, size = 'md', variant = 'primary', fullWidth = false, toggled = false, shadow = false, styles, ...props }: ButtonProps) => {
  const selectedVariant = componentVariants[variant];
  const selectedSize = componentSizes[size];

  const getVariantStyles = () => {
    if (toggled) {
      return {
        ...selectedVariant,
        ...selectedVariant['&:toggled'],
      };
    }
    return selectedVariant;
  };

  const style = {
    root: {
      borderRadius: '8px',
      width: fullWidth ? '100%' : 'fit-content',
      height: `${selectedSize.height}rem`,
      padding: selectedSize.padding,
      minWidth: `${selectedSize.minWidth}rem`,
      fontSize: selectedSize.fontSize,
      boxShadow: shadow ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'background 0.1s ease-in-out',
      ...getVariantStyles(),
    },
    label: {
      ...fontBase,
      fontWeight: fontWeight['semibold'],
    },
    ...styles,
  };

  return <MantineButton styles={style} size={size} onClick={onClick} {...props} />;
};
