import React, { CSSProperties } from 'react';
import { CSSObject, Switch as MantineToggle, SwitchProps as MantineToggleProps } from '@mantine/core';
import { neutral, primary } from '../../../constants/colors';
import { fontBase, fontSize } from '../../../constants/font';

// Size Presets
const componentSizes = {
  sm: { width: 2.4, height: 1.8, mantineSize: 'md', thumbScale: 1.3, thumbTranslate: 2, ...fontSize['sm'] },
  md: { width: 4.8, height: 2.8, mantineSize: 'xl', thumbScale: 1.3, thumbTranslate: 10, ...fontSize['md'] },
} as const;

interface ToggleProps extends MantineToggleProps {
  size?: keyof typeof componentSizes;
  label?: string;
  styles?: Record<string, CSSObject>;
}

const Toggle = ({ checked, onChange, styles, size = 'md', label, ...props }: ToggleProps) => {
  const selectedSize = componentSizes[size];
  const style = {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    track: {
      width: `${selectedSize.width}rem`,
      height: `${selectedSize.height}rem`,
      transition: 'background-color 300ms ease-in-out',
      cursor: 'pointer',
      backgroundColor: checked ? primary[200] : neutral[50],
    },
    thumb: {
      transform: `scale(${selectedSize.thumbScale}) translateX(${
        checked
          ? `-${selectedSize.thumbTranslate + selectedSize.thumbTranslate / 2}%`
          : `${selectedSize.thumbTranslate}%`
      })`,
      boxShadow: checked ? '0 2px 2px rgba(0,0,0,0.2)' : 'none',
      transition: 'all 300ms ease-in-out',
      border: checked ? `1px solid ${primary[200]}` : `1px solid ${neutral[50]}`,
    },
    label: {
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
    },
    ...styles,
  };

  return (
    <div style={style.container}>
      <MantineToggle
        checked={checked}
        onChange={onChange}
        color={primary[200]}
        size={selectedSize.mantineSize}
        styles={style}
        {...props}
      />
      {label && <span style={style.label}>{label}</span>}
    </div>
  );
};

export { Toggle };
