import { ReactElement } from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { componentSizes } from './sizes';
import { componentVariants as baseVariants, subtleVariants } from '../shared/variants';
import { neutral, primary } from '../../../../constants/colors';
import { Tooltip } from '../../../Info/Tooltips/Tooltip/Tooltip';

export interface IconButtonProps extends Omit<MantineButtonProps, 'leftIcon' | 'rightIcon'> {
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  variant?: keyof typeof baseVariants;
  toggled?: boolean;
  shadow?: boolean;
  subtle?: boolean;
  tooltip?: string;
  children?: ReactElement<{ size?: number }>;
}

export const IconButton = ({ onClick, size = 'md', variant = 'primary', toggled = false, shadow = false, subtle = false, tooltip = '', styles, children, ...props }: IconButtonProps) => {
  const selectedVariant = baseVariants[variant];
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
      height: `${selectedSize.borderLength}rem`,
      padding: selectedSize.padding,
      width: `${selectedSize.borderLength}rem`,
      boxShadow: shadow ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      ...getVariantStyles(),
      ...getSubtleStyles(),
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
