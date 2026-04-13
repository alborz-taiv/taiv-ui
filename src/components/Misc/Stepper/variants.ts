import { fontBase } from '../../../constants/font';
import { primary, neutral, white } from '../../../constants/colors';

export const componentVariants = {
  primary: {
    color: primary[200],
  },
};

export type StepperVariant = keyof typeof componentVariants;

export const baseStyles = (variant: StepperVariant, color?: any) => {
  const variantColor = color ?? componentVariants[variant].color;
  return {
    step: {
      ...fontBase,
    },
    stepBody: {
      ...fontBase,
      color: variantColor,
    },
    stepIcon: {
      '&:not([data-progress]):not([data-completed])': {
        backgroundColor: white,
        color: neutral[100],
        borderColor: neutral[100],
      },
      '&[data-progress]': {
        backgroundColor: white,
        color: variantColor,
      },
    },
    stepLabel: {
      ...fontBase,
      color: variantColor
    },
    stepDescription: {
      ...fontBase,
    },
    content: {
      ...fontBase,
      textAlign: 'center' as const,
    },
  };
};

export const DEFAULT_ICON_SIZE_PX: Record<string, number> = {
  xs: 34,
  sm: 36,
  md: 42,
  lg: 48,
  xl: 52,
};