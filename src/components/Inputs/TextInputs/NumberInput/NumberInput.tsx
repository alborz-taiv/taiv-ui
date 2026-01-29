import React from 'react';
import {
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps,
} from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral, red } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { componentSizes } from '../shared/sizes';

interface NumberInputProps extends MantineNumberInputProps {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
}

const NumberInput = ({
  size = 'md',
  width,
  fullWidth = false,
  styles,
  step = 1,
  ...props
}: NumberInputProps) => {
  const selectedSize = componentSizes[size as keyof typeof componentSizes];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}rem`;
  const hasError = !!props.error;
  
  const style: Record<string, CSSObject> = {
    input: {
      height: `${selectedSize.height}rem`,
      fontSize: selectedSize.fontSize,
      padding: '0 1rem',
      ...fontBase,
      color: neutral[200],
      transition: 'all 200ms ease-in-out',
      borderRadius: '8px',
      '&[data-invalid]': {
        borderColor: red[200],
        color: neutral[200],
        '&::placeholder': {
          color: red[200],
        },
      },
    },
    rightSection: {
        height: 'auto',
        margin: 'auto 0',
        gap: 0,
        width: '4.8rem !important',
        alignItems: 'center',
      },
    control: {
      color: hasError ? red[200] : neutral[200],
      border: 'none',
      background: 'transparent !important',
      width: '2rem !important',
      height: '1.2rem !important',
      flex: '0 0 auto',
      '& svg': {
        width: '2rem !important',
        height: '1.2rem !important',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
      color: neutral[200],
    },
    error: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
      color: red[200],
    },
    ...styles,
  };

  return (
    <MantineNumberInput
      w={computedWidth}
      size={size}
      step={step}
      hideControls={false}
      styles={style}
      type="number"
      {...props}
    />
  );
};

export { NumberInput };