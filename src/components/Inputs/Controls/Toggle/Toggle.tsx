import {
  type CSSObject,
  Switch as MantineToggle,
  type SwitchProps as MantineToggleProps,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import type React from 'react';
import { CSSProperties } from 'react';
import { error, neutral, primary } from '../../../../constants/colors';
import { fontBase, fontSize } from '../../../../constants/font';

// Size Presets
const componentSizes = {
  md: {
    height: 28,
    iconSize: 12,
    mantineSize: 'xl',
    thumbScale: 1.3,
    thumbTranslate: 10,
    width: 48,
    ...fontSize['md'],
  },
  sm: {
    height: 18,
    iconSize: 8,
    mantineSize: 'md',
    thumbScale: 1.3,
    thumbTranslate: 2,
    width: 24,
    ...fontSize['sm'],
  },
} as const;

// Variant Presets — shape mirrors Button.variant: each variant owns its
// active color and (optionally) the icon rendered inside the thumb when checked.
const componentVariants = {
  error: {
    activeColor: error[100],
    getThumbIcon: (_iconSize: number) => null as React.ReactNode,
  },
  primary: {
    activeColor: primary[200],
    getThumbIcon: (_iconSize: number) => null as React.ReactNode,
  },
} as const;

interface ToggleProps extends MantineToggleProps {
  size?: keyof typeof componentSizes;
  label?: string;
  variant?: keyof typeof componentVariants;
  styles?: Record<string, CSSObject>;
}

const Toggle = ({
  checked,
  onChange,
  styles,
  size = 'md',
  variant = 'primary',
  label,
  ...props
}: ToggleProps) => {
  const selectedSize = componentSizes[size];
  const selectedVariant = componentVariants[variant];
  const { activeColor, getThumbIcon } = selectedVariant;
  const thumbIcon = getThumbIcon(selectedSize.iconSize);

  const style = {
    container: {
      alignItems: 'center',
      display: 'flex',
      gap: '10px',
    },
    label: {
      ...fontBase,
      color: neutral[200],
      fontSize: selectedSize.fontSize,
    },
    thumb: {
      alignItems: 'center',
      border: `1px solid ${neutral[50]}`,
      boxShadow: 'none',
      display: 'flex',
      // When the hidden input is checked, the track is its sibling and the thumb is inside —
      // use `input:checked + * &` to target the thumb; this matches Mantine's own selector specificity.
      'input:checked + * &': {
        border: `1px solid ${activeColor}`,
        boxShadow: '0 2px 2px rgba(0,0,0,0.2)',
        transform: `scale(${selectedSize.thumbScale}) translateX(-${selectedSize.thumbTranslate + selectedSize.thumbTranslate / 2}%)`,
      },
      justifyContent: 'center',
      transform: `scale(${selectedSize.thumbScale}) translateX(${selectedSize.thumbTranslate}%)`,
      transition: 'all 300ms ease-in-out',
    },
    track: {
      backgroundColor: neutral[50],
      borderColor: neutral[50],
      cursor: 'pointer',
      height: `${selectedSize.height}px`,
      // Override Mantine's `input:checked + .mantine-…` rule by matching its specificity.
      'input:checked + &': {
        backgroundColor: activeColor,
        borderColor: activeColor,
      },
      transition:
        'background-color 300ms ease-in-out, border-color 300ms ease-in-out',
      width: `${selectedSize.width}px`,
    },
    ...styles,
  };

  return (
    <div style={style.container}>
      <MantineToggle
        checked={checked}
        onChange={onChange}
        size={selectedSize.mantineSize}
        styles={style}
        thumbIcon={checked ? thumbIcon : null}
        {...props}
      />
      {label && <span style={style.label}>{label}</span>}
    </div>
  );
};

export { Toggle };
