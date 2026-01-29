import { Badge as MantineBadge, BadgeProps as MantineBadgeProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { fontBase, fontSize, fontWeight } from '../../../constants/font';
import { green, red } from '../../../constants/colors';
import { IconCircleDot } from '@tabler/icons-react';

export type StatusBadgeVariant = 'online' | 'offline';

interface StatusBadgeProps extends Omit<MantineBadgeProps, 'children' | 'color' | 'variant'> {
  variant?: StatusBadgeVariant;
  width?: string;
  height?: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  color?: string;
}

const titleMap: Record<StatusBadgeVariant, string> = {
  online: 'Online',
  offline: 'Offline',
};

const variantStyles: Record<StatusBadgeVariant, CSSObject> = {
  online: {
    backgroundColor: green[25],
    color: green[300],
    border: 'none',
  },
  offline: {
    backgroundColor: red[25],
    color: red[300],
    border: 'none',
  },
};

const defaultIconColor: Record<StatusBadgeVariant, string> = {
  online: green[300],
  offline: red[300],
};

const StatusBadge = ({
  variant = 'offline',
  width = '9rem',
  height = '3rem',
  title,
  icon,
  backgroundColor,
  color,
  styles,
  ...rest
}: StatusBadgeProps) => {
  const rootVariantStyles = { ...variantStyles[variant] };
  if (backgroundColor != null) rootVariantStyles.backgroundColor = backgroundColor;
  if (color != null) rootVariantStyles.color = color;

  const iconColor = color ?? defaultIconColor[variant];
  const defaultIcon = <IconCircleDot color={iconColor} size="1.6rem" />;

  const style: Partial<Record<'root' | 'inner' | 'leftSection', CSSObject>> = {
    root: {
      borderRadius: '10rem',
      width,
      height,
      minWidth: width,
      minHeight: height,
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

export { StatusBadge };
export type { StatusBadgeProps };
