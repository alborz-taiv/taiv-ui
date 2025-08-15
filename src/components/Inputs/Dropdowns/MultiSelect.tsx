import React from 'react';
import { MultiSelect as MantineMultiSelect, MultiSelectProps as MantineMultiSelectProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral, primary } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { componentSizes } from './shared/sizes';

interface MultiSelectProps extends MantineMultiSelectProps {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
}

export const MultiSelect = ({
  size = 'md',
  width,
  fullWidth = false,
  placeholder = 'Select options',
  styles,
  ...props
}: MultiSelectProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.maxWidth}rem`;

  const style = {
    input: {
      height: 'auto',
      minHeight: `${selectedSize.height}rem`,
      padding: selectedSize.inputPadding,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
      border: `1px solid ${neutral[100]}`,
      borderRadius: '8px',
      backgroundColor: 'white',
      transition: 'all 200ms ease-in-out',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
    dropdown: {
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    item: {
      padding: selectedSize.dropdownPadding,
      marginBottom: '0.5rem',
      borderRadius: '8px',
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
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
    value: {
      padding: selectedSize.valuePadding,
      borderRadius: '25px',
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.125rem)`,
      color: primary[300],
      backgroundColor: primary[50],
      '&:hover': {
        backgroundColor: primary[50],
      },
    },
    defaultValueRemove: {
      marginLeft: '0.75rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: primary[300],
      backgroundColor: primary[25],
      '&:hover': {
        backgroundColor: primary[25],
      },
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.1rem)`,
      color: neutral[200],
    },
    defaultValueLabel: {
      ...fontBase,
    },
    searchInput: {
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
    },
    ...styles,
  };

  return (
    <MantineMultiSelect
      placeholder={placeholder}
      size={size}
      w={computedWidth}
      styles={style}
      maxDropdownHeight={selectedSize.dropdownHeight}
      searchable
      {...props}
    />
  );
};
