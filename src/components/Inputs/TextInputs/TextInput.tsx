import React from 'react';
import { TextInput as MantineTextInput, TextInputProps as MantineTextInputProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { componentSizes } from './shared/sizes';

type TextInputProps = MantineTextInputProps & {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
};

const TextInput = ({ size = 'md', width, fullWidth = false, styles, ...props }: TextInputProps) => {
  const selectedSize = componentSizes[size as keyof typeof componentSizes];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}rem`;

  const style: Record<string, CSSObject> = {
    input: {
      height: `${selectedSize.height}rem`,
      fontSize: selectedSize.fontSize,
      padding: '0 1rem',
      ...fontBase,
      color: neutral[200],
      transition: 'all 200ms ease-in-out',
      borderRadius: '8px',
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
      color: neutral[200],
    },
    error: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
    },
    ...styles,
  };

  return <MantineTextInput w={computedWidth} {...props} size={size} styles={style} />;
};

export { TextInput };
