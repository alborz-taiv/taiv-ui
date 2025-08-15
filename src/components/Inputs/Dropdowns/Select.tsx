import React from 'react';
import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { componentSizes } from './shared/sizes';

export interface SelectProps extends MantineSelectProps {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
}

export const Select = ({
  size = 'md',
  width,
  fullWidth = false,
  placeholder = 'Select an option',
  styles,
  ...props
}: SelectProps) => {
  const selectedSize = componentSizes[size];

  const style = {
    root: {
      width: fullWidth ? '100%' : width || `${selectedSize.minWidth}rem`,
    },
    input: {
      height: `${selectedSize.height}rem`,
      paddingRight: selectedSize.inputPadding,
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[300],
      borderRadius: '8px',
      border: `1px solid ${neutral[100]}`,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      transition: 'all 200ms ease-in-out',
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.1rem)`,
      color: neutral[200],
    },
    dropdown: {
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    item: {
      padding: selectedSize.dropdownPadding,
      marginBottom: '0.5rem',
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
      borderRadius: '8px',
      backgroundColor: 'white',
      '&[data-selected]': {
        backgroundColor: neutral[50],
        color: neutral[200],
        '&:hover': {
          backgroundColor: neutral[50],
        },
      },
      '&:hover': {
        backgroundColor: neutral[50],
      },
      '&:not(:hover):not([data-selected])': {
        backgroundColor: 'white',
      },
    },
    rightSection: {
      color: neutral[200],
    },
    ...styles,
  };

  return (
    <MantineSelect
      radius="md"
      size={size}
      styles={style}
      placeholder={placeholder}
      maxDropdownHeight={selectedSize.dropdownHeight}
      {...props}
    />
  );
};
