import type { CSSObject } from '@mantine/styles';
import { colors, neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

export type BadgeVariant = 'outline' | 'filled' | 'gradient' | 'dark';

export type BadgeColor = keyof typeof colors;

export function getVariantStyles(color: BadgeColor): Record<BadgeVariant, CSSObject> {
  return {
    outline: {
      border: `1.5px solid ${colors[color][200]}`,
      color: colors[color][200],
      backgroundColor: 'transparent',
      borderRadius: '8px',
      padding: `${spacing.xs} ${spacing.sm}`,
    },
    filled: {
      backgroundColor: colors[color][50],
      color: colors[color][200],
    },
    gradient: {
      background: `linear-gradient(to right, ${colors[color][50]}, ${colors[color][200]})`,
      color: 'white',
      borderRadius: '16px',
      padding: `${spacing.xs} ${spacing.sm}`,
    },
    dark: {
      backgroundColor: `${neutral[300]}b3`,
      color: 'white',
      border: 'none',
      borderRadius: '6px',
    },
  };
}
