import React from 'react';
import { PasswordInput as MantinePasswordInput, PasswordInputProps as MantinePasswordInputProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { componentSizes } from '../shared/sizes';

// Workaround for Icon sizing since we dont have a Provider setup
const mantineSize = {
  sm: 'lg',
  md: 'xl',
  lg: 'xl',
};

type PasswordInputProps = MantinePasswordInputProps & {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
};

const PasswordInput = ({ size = 'md', width, fullWidth = false, styles, placeholder = 'Enter password', ...props }: PasswordInputProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}rem`;

  const style = {
    input: {
      ...fontBase,
      color: neutral[200],
      transition: 'all 200ms ease-in-out',
      borderRadius: '8px',
      height: `${selectedSize.height}rem`,
      fontSize: selectedSize.fontSize,
      padding: '0 1rem',
    },
    label: {
      ...fontBase,
      color: neutral[200],
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
    },
    error: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
    },
    innerInput: {
      ...fontBase,
      color: neutral[200],
      height: `${selectedSize.height}rem`,
      fontSize: selectedSize.fontSize,
      padding: '0 1rem',
    },
    visibilityToggle: {
      color: neutral[200],
      marginRight: '1.25rem',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    ...styles,
  };

  return <MantinePasswordInput w={computedWidth} {...props} placeholder={placeholder} size={mantineSize[size]} styles={style} />;
};

export { PasswordInput };
