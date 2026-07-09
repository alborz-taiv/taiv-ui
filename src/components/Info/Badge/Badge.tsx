import React from 'react';
import { Badge as MantineBadge, BadgeProps as MantineBadgeProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { fontBase } from '../../../constants/font';
import { badgeSizes } from './sizes';
import { getVariantStyles } from './variants';
import type { BadgeSize } from './sizes';
import type { BadgeColor, BadgeVariant } from './variants';

interface BadgeProps extends Omit<MantineBadgeProps, 'color' | 'leftSection'> {
  size?: BadgeSize;
  color?: BadgeColor;
  variant?: BadgeVariant;
  leftIcon?: React.ReactElement;
  /** Shows click affordance (pointer cursor + hover feedback). Badge stays a
   *  display element — wrap it in a button (e.g. UnstyledButton) for the
   *  interaction itself. */
  clickable?: boolean;
}

const Badge = ({ styles, color = 'primary', variant = 'outline', size = 'md', leftIcon, clickable = false, ...props }: BadgeProps) => {
  const selectedSize = badgeSizes[size];
  const variantStyles = getVariantStyles(color);
  const selectedVariant = variantStyles[variant];
  const cursor = clickable ? 'pointer' : 'default';

  const style: Partial<Record<'leftSection' | 'rightSection' | 'inner' | 'root', CSSObject>> = {
    root: {
      padding: selectedSize.padding,
      height: selectedSize.height,
      cursor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...selectedVariant,
      ...(clickable && {
        transition: 'filter 120ms ease',
        '&:hover': { filter: 'brightness(0.96)' },
      }),
    },
    inner: {
      ...fontBase,
      ...selectedSize.fontSize,
      textTransform: 'none',
      cursor,
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ...styles,
  };
  const badgeIcon = leftIcon ? React.cloneElement(leftIcon, { size: selectedSize.iconSize, color: selectedVariant.color }) : leftIcon;

  return <MantineBadge size={selectedSize.mantineSize} styles={style} leftSection={badgeIcon} {...props} />;
};

export { Badge, type BadgeProps };
