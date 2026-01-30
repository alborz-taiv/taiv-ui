import type { CSSObject } from '@mantine/styles';
import { colors } from '../../../constants/colors';

export type BadgeVariant = 'outline' | 'filled' | 'gradient';

export type BadgeColor = keyof typeof colors;

export function getVariantStyles(color: BadgeColor): Record<BadgeVariant, CSSObject> {
  return {
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
}
