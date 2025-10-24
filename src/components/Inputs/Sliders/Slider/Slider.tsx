import React, { CSSProperties } from 'react';
import { Slider as MantineSlider, SliderProps as MantineSliderProps, CSSObject } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { neutral, primary } from '../../../../constants/colors';
import { fontBase, textStyle } from '../../../../constants/font';
import { componentSizes } from '../shared/sizes';

export interface SliderProps extends MantineSliderProps {
  width?: string | number;
  fullWidth?: boolean;
  size?: keyof typeof componentSizes;
  setValue: (value: number) => void;
  animate?: boolean;
  label?: React.ReactNode;
  compact?: boolean;
  styles?: Record<string, CSSProperties>;
}

const Slider = ({ width, size = 'md', value, setValue, disabled = false, styles, animate = false, label, fullWidth = false, compact = false, ...props }: SliderProps) => {
  const { hovered, ref } = useHover();
  const sliderColor = disabled ? neutral[100] : primary[200];
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}rem`;

  const wrapperStyle: Record<string, CSSProperties> = {
    container: {
      width: fullWidth ? '100%' : 'auto',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
    label: {
      ...fontBase,
      ...selectedSize.labelFontSize,
      color: disabled ? neutral[100] : neutral[200],
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    valueLabel: {
      ...fontBase,
      ...selectedSize.valueFontSize,
      color: disabled ? neutral[100] : neutral[200],
      whiteSpace: 'nowrap',
      flexShrink: 0,
      textAlign: 'right',
      minWidth: '2rem',
    },
    sliderContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      flex: fullWidth ? 1 : 'none',
    },
  };

  const sliderStyle: Record<string, CSSObject> = {
    root: {
      flex: 1,
      minWidth: '10rem',
    },
    thumb: {
      width: `${selectedSize.thumbSize}rem`,
      height: `${selectedSize.thumbSize}rem`,
      backgroundColor: sliderColor,
      borderColor: sliderColor,
      boxShadow: '0 2px 2px rgba(0,0,0,0.2)',
      transition: 'opacity 150ms ease',
      opacity: animate ? (hovered ? 1 : 0) : 1,
    },
    trackContainer: {
      cursor: disabled ? 'default' : 'pointer',
    },
    track: {
      height: `${selectedSize.trackHeight}rem`,
      backgroundColor: sliderColor,
    },
    bar: {
      height: `${selectedSize.trackHeight}rem`,
      backgroundColor: sliderColor,
    },
    marksContainer: {
      height: `${selectedSize.trackHeight}rem`,
    },
    mark: {
      width: '0.7rem',
      height: '0.7rem',
      borderColor: neutral[50],
      backgroundColor: neutral[50],
      transform: 'translateY(-0.15rem) translateX(-0.2rem)',
    },
    markFilled: {
      borderColor: sliderColor,
      backgroundColor: 'white',
    },
    markLabel: {
      ...textStyle['caption'],
      color: disabled ? neutral[100] : neutral[200],
      marginTop: '0.4rem',
      textAlign: 'center',
    },
    ...styles,
  };

  return (
    <div style={wrapperStyle.container}>
      {!compact && label && <div style={wrapperStyle.label}>{label}</div>}
      <div style={wrapperStyle.sliderContainer}>
        <MantineSlider value={value} onChange={setValue} w={computedWidth} showLabelOnHover={false} disabled={disabled} ref={ref} styles={sliderStyle} {...props} />
        {!compact && <div style={wrapperStyle.valueLabel}>{value}</div>}
      </div>
    </div>
  );
};

export { Slider };
