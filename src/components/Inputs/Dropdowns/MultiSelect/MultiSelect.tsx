import {
  MultiSelect as MantineMultiSelect,
  type MultiSelectProps as MantineMultiSelectProps,
} from '@mantine/core';
import type { CSSObject } from '@mantine/styles';
import React from 'react';
import { neutral, primary, red } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { componentSizes } from '../shared/sizes';

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
  const computedWidth = fullWidth
    ? '100%'
    : width || `${selectedSize.maxWidth}px`;

  const style = {
    defaultValueLabel: {
      ...fontBase,
    },
    defaultValueRemove: {
      '&:hover': {
        backgroundColor: primary[25],
      },
      alignItems: 'center',
      backgroundColor: primary[25],
      borderRadius: '50%',
      color: primary[300],
      display: 'flex',
      justifyContent: 'center',
      marginLeft: spacing.sm,
    },
    dropdown: {
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    // Match the error-label typography used by TextInput/TextArea/Select so
    // validation messages read at the same scale across all inputs (Mantine's
    // default sizes this much smaller).
    error: {
      ...fontBase,
      color: red[200],
      fontSize: `calc(${selectedSize.fontSize} - 0.5px)`,
    },
    input: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      height: 'auto',
      minHeight: `${selectedSize.height}px`,
      padding: selectedSize.inputPadding,
      ...fontBase,
      '&:hover': {
        backgroundColor: 'white',
      },
      backgroundColor: 'white',
      border: `1px solid ${neutral[100]}`,
      borderRadius: '8px',
      color: neutral[200],
      fontSize: selectedSize.fontSize,
      transition: 'all 200ms ease-in-out',
      '&[data-invalid]': {
        borderColor: red[200],
        color: neutral[200],
        '& input::placeholder': {
          color: red[200],
        },
      },
    },
    item: {
      borderRadius: '8px',
      marginBottom: spacing.xs,
      padding: selectedSize.dropdownPadding,
      ...fontBase,
      // Mantine v6 highlights the keyboard-focused item with `data-hovered`,
      // so we mirror the mouse `:hover` style there.
      '&:hover, &[data-hovered]': {
        backgroundColor: neutral[50],
      },
      '&:not(:hover):not([data-hovered]):not([data-selected])': {
        backgroundColor: 'white',
      },
      '&[data-selected]': {
        '&:hover, &[data-hovered]': {
          backgroundColor: neutral[50],
        },
        backgroundColor: neutral[50],
        color: neutral[200],
      },
      backgroundColor: 'white',
      color: neutral[200],
      fontSize: selectedSize.fontSize,
    },
    label: {
      ...fontBase,
      color: neutral[200],
      fontSize: `calc(${selectedSize.fontSize} - 1px)`,
    },
    searchInput: {
      ...fontBase,
      color: neutral[200],
      fontSize: selectedSize.fontSize,
    },
    value: {
      borderRadius: '25px',
      padding: selectedSize.valuePadding,
      ...fontBase,
      '&:hover': {
        backgroundColor: primary[25],
      },
      backgroundColor: primary[25],
      color: primary[300],
      fontSize: `calc(${selectedSize.fontSize} - 1.25px)`,
    },
    ...styles,
  };

  return (
    <MantineMultiSelect
      maxDropdownHeight={selectedSize.dropdownHeight}
      placeholder={placeholder}
      searchable
      size={size}
      styles={style}
      w={computedWidth}
      {...props}
    />
  );
};
