import { ReactElement, forwardRef } from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { componentSizes } from './sizes';
import { componentVariants as baseVariants, subtleVariants } from '../shared/variants';
import { neutral } from '../../../../constants/colors';

export interface IconButtonProps extends Omit<MantineButtonProps, 'leftIcon' | 'rightIcon'> {
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  variant?: keyof typeof baseVariants;
  toggled?: boolean;
  shadow?: boolean;
  subtle?: boolean;
  children?: ReactElement<{ size?: number }>;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ onClick, size = 'md', variant = 'primary', toggled = false, shadow = false, subtle = false, styles, children, ...props }, ref) => {
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
      // Variant colors / borders / interaction states come first.
      ...getVariantStyles(),
      ...getSubtleStyles(),
      // IconButton's geometry contract (square button, centered icon) must
      // win over variant styles. Variants like `text` set `height: 'auto'`
      // and `padding: '0'` (correct for inline text Buttons, wrong for icon
      // buttons), and `nav` sets `paddingLeft` + `inner.justifyContent:
      // flex-start` (correct for left-aligned menu items, wrong for an
      // icon-only square). Keep these overrides last so any variant works.
      borderRadius: '8px',
      boxShadow: shadow ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      height: `${selectedSize.borderLength}px`,
      minWidth: 'unset',
      padding: selectedSize.padding,
      width: `${selectedSize.borderLength}px`,
      '& .mantine-Button-inner': {
        justifyContent: 'center',
      },
    },
    ...styles,
  };

  const Button = (
    <MantineButton
      ref={ref}
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

  return Button;
});

IconButton.displayName = 'IconButton';
