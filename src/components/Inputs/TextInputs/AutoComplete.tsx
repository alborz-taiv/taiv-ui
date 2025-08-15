import React from 'react';
import { Autocomplete as MantineAutocomplete, AutocompleteProps as MantineAutocompleteProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { componentSizes } from '../Dropdowns/shared/sizes';

export interface AutoCompleteProps extends MantineAutocompleteProps {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
}

export const AutoComplete = ({
  size = 'md',
  width,
  fullWidth = false,
  placeholder = 'Select an option',
  styles,
  ...props
}: AutoCompleteProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.minWidth}rem`;

  const style: Record<string, CSSObject> = {
    input: {
      height: `${selectedSize.height}rem`,
      fontSize: selectedSize.fontSize,
      padding: selectedSize.inputPadding,
      ...fontBase,
      color: neutral[300],
      transition: 'all 200ms ease-in-out',
      borderRadius: '8px',
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
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
    <MantineAutocomplete
      w={computedWidth}
      size={size}
      styles={style}
      placeholder={placeholder}
      maxDropdownHeight={selectedSize.dropdownHeight}
      {...props}
    />
  );
};
