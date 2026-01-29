import { ReactElement } from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { componentSizes } from './sizes';
import { buttonVariants, subtleVariants } from '../shared/variants';
import { neutral } from '../../../../constants/colors';
import { Tooltip } from '../../../Info/Tooltips/Tooltip/Tooltip';

export interface IconButtonProps extends Omit<MantineButtonProps, 'leftIcon' | 'rightIcon'> {
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  variant?: keyof typeof buttonVariants | keyof typeof subtleVariants;
  toggled?: boolean;
  shadow?: boolean;
  subtle?: boolean;
  tooltip?: string;
  children?: ReactElement<{ size?: number }>;
}

export const IconButton = ({ onClick, size = 'md', variant = 'primary', toggled = false, shadow = false, subtle = false, tooltip = '', styles, children, ...props }: IconButtonProps) => {
  const selectedVariant = subtle && !props.loading ? subtleVariants[variant] : buttonVariants[variant];
  const selectedSize = componentSizes[size];

  // Apply active styles for nav variant when isActive is true
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
      border: subtle ? `1px solid ${neutral[50]}` : '1px solid white',
      height: `${selectedSize.borderLength}rem`,
      padding: selectedSize.padding,
      width: `${selectedSize.borderLength}rem`,
      boxShadow: shadow ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      ...getVariantStyles(),
    },
    ...styles,
  };

  const Button = (
    <MantineButton
      styles={style}
      size={size}
      onClick={onClick}
      loaderPosition="center"
      loaderProps={{ size: selectedSize.iconSize }}
      {...props}
    >
      {props.loading ? <></> : children}
    </MantineButton>
  );

  return tooltip ? <Tooltip text={tooltip}>{Button}</Tooltip> : Button;
};
