import React, { forwardRef } from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { fontBase, fontWeight } from '../../../../constants/font';
import { componentSizes } from './sizes';
import { componentVariants, subtleVariants } from '../shared/variants';
import { neutral } from '../../../../constants/colors';

export interface ButtonProps extends MantineButtonProps {
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  variant?: keyof typeof componentVariants;
  fullWidth?: boolean;
  toggled?: boolean;
  shadow?: boolean;
  subtle?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, size = 'md', variant = 'primary', fullWidth = false, toggled = false, shadow = false, subtle = false, styles, ...props }, ref) => {
  const selectedVariant = componentVariants[variant];
  const selectedSize = componentSizes[size];

  const getVariantStyles = () => {
    if (toggled) {
      return {
        ...selectedVariant,
        ...selectedVariant['&:toggled'],
        '&:hover': selectedVariant['&:toggled'],
      };
    }
    return selectedVariant;
  };

  const getSubtleStyles = () => {
    if (subtle) {
      return {
        ...subtleVariants[variant],
        border: `1px solid ${neutral[50]}`,
        background: 'white',
        '&:hover': {
          background: neutral[50],
          border: `1px solid ${neutral[50]}`,
        },
        '&:active': {
          background: 'white',
        },
        '&:toggled': {
          background: neutral[50],
          border: `1px solid ${neutral[100]}`,
        },
      };
    }
  };

  const style = {
    root: {
      borderRadius: '8px',
      width: fullWidth ? '100%' : 'fit-content',
      height: `${selectedSize.height}px`,
      padding: selectedSize.padding,
      minWidth: `${selectedSize.minWidth}px`,
      fontSize: selectedSize.fontSize,
      boxShadow: shadow ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'background 0.1s ease-in-out',
      ...getVariantStyles(),
      ...getSubtleStyles(),
    },
    label: {
      ...fontBase,
      fontWeight: variant.startsWith('nav') ? fontWeight['regular'] : fontWeight['semibold'],
    },
    ...styles,
  };

  return <MantineButton ref={ref} styles={style} size={size} onClick={onClick} {...props} />;
});

Button.displayName = 'Button';
