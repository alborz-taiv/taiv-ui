import { Badge as MantineBadge, BadgeProps as MantineBadgeProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { fontBase, inputFontSize } from '../../../constants/font';
import { colors } from '../../../constants/colors';

interface BadgeProps extends Omit<MantineBadgeProps, 'color'> {
  size?: 'sm' | 'md' | 'lg';
  color?: keyof typeof colors;
  variant?: 'outline' | 'filled' | 'gradient';
}

const Badge = ({ styles, color = 'primary', variant = 'outline', size = 'md', ...props }: BadgeProps) => {
  const sizes = {
    sm: {
      mantineSize: 'md',
      padding: '0.4rem 0.8rem',
      height: '1.5rem',
      fontSize: inputFontSize['sm'],
    },
    md: {
      mantineSize: 'lg',
      padding: '0.4rem 0.8rem',
      height: '2.5rem',
      fontSize: inputFontSize['md'],
    },
    lg: {
      mantineSize: 'xl',
      padding: '0.4rem 0.8rem',
      height: '3rem',
      fontSize: inputFontSize['lg'],
    },
  };

  const variants = {
    outline: {
      border: `1.5px solid ${colors[color][200]}`,
      color: colors[color][200],
      backgroundColor: 'transparent',
      borderRadius: '8px',
      padding: '0.4rem 0.8rem',
    },
    filled: {
      backgroundColor: colors[color][50],
      color: colors[color][200],
    },
    gradient: {
      background: `linear-gradient(to right, ${colors[color][50]}, ${colors[color][200]})`,
      color: 'white',
      borderRadius: '16px',
      padding: '0.4rem 0.8rem',
    },
  };

  const selectedSize = sizes[size];
  const selectedVariant = variants[variant];

  const style: Partial<Record<'leftSection' | 'rightSection' | 'inner' | 'root', CSSObject>> = {
    root: {
      padding: selectedSize.padding,
      height: selectedSize.height,
      cursor: 'default',
      ...selectedVariant,
    },
    inner: {
      ...fontBase,
      ...selectedSize.fontSize,
      textTransform: 'none',
      cursor: 'default',
    },
    ...styles,
  };

  return <MantineBadge size={selectedSize.mantineSize} styles={style} {...props} />;
};

export { Badge };
export type { BadgeProps };
