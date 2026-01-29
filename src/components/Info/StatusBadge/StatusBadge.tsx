import { Badge as MantineBadge, BadgeProps as MantineBadgeProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { fontBase, fontSize, fontWeight } from '../../../constants/font';
import { IconCircleFilled } from '@tabler/icons-react';
import { defaultIconColor, titleMap, variantStyles } from './shared/variants';
import { statusBadgeSizes } from './shared/sizes';
import type { StatusBadgeVariant } from './shared/variants';
import type { StatusBadgeSize } from './shared/sizes';

interface StatusBadgeProps extends Omit<MantineBadgeProps, 'children' | 'color' | 'variant'> {
  variant?: StatusBadgeVariant;
  size?: StatusBadgeSize;
  width?: string;
  height?: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
}

const StatusBadge = ({
  variant = 'offline',
  size = 'md',
  width,
  height,
  title,
  icon,
  backgroundColor,
  color,
  styles,
  ...rest
}: StatusBadgeProps) => {
  const sizeConfig = statusBadgeSizes[size];
  const resolvedWidth = width ?? sizeConfig.width;
  const resolvedHeight = height ?? sizeConfig.height;

  const rootVariantStyles = { ...variantStyles[variant] };
  if (backgroundColor != null) rootVariantStyles.backgroundColor = backgroundColor;
  if (color != null) rootVariantStyles.color = color;

  const iconColor = color ?? defaultIconColor[variant];
  const defaultIcon = <IconCircleFilled color={iconColor} size={sizeConfig.iconSize} />;

  const style: Partial<Record<'root' | 'inner' | 'leftSection', CSSObject>> = {
    root: {
      borderRadius: '10rem',
      width: resolvedWidth,
      height: resolvedHeight,
      minWidth: resolvedWidth,
      minHeight: resolvedHeight,
      padding: 0,
      gap: '0.4rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...rootVariantStyles,
    },
    inner: {
      ...fontBase,
      ...fontSize['sm'],
      fontWeight: fontWeight['regular'],
      textTransform: 'capitalize',
      cursor: 'default',
      ...(color != null && { color }),
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 0,
    },
    ...styles,
  };

  return (
    <MantineBadge size="md" leftSection={icon ?? defaultIcon} styles={style} {...rest}>
      {title ?? titleMap[variant]}
    </MantineBadge>
  );
};

export { StatusBadge, type StatusBadgeProps, type StatusBadgeVariant, type StatusBadgeSize };
