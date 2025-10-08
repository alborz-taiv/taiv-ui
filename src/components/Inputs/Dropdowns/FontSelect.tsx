import React from 'react';
import { Box } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { componentSizes } from './shared/sizes';
import { Select, SelectProps } from './Select';
import { SelectOption } from '../../../utils/select';
import Fonts from './shared/fontSelectList';

export interface FontSelectProps extends Omit<SelectProps, 'value' | 'data'> {
  data?: SelectOption[];
  value?: string | null;
  width?: string | number;
  fullWidth?: boolean;
}

const FontSelect = ({ data, value, placeholder = 'Select a font', size = 'md', width, fullWidth = false, styles, ...props }: FontSelectProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.minWidth}rem`;

  const DropdownItem = ({ value, label, ...others }: SelectOption) => (
    <Box title={label}>
      <div
        style={{
          fontFamily: value,
          fontSize: selectedSize.fontSize,
          color: neutral[200],
          padding: selectedSize.dropdownPadding,
          borderRadius: '0.5rem',
          transition: 'background-color 200ms ease-in-out',
        }}
        {...others}
      >
        {label}
      </div>
    </Box>
  );

  const style: Record<string, CSSObject> = {
    input: {
      fontFamily: value || 'Poppins, sans-serif',
      color: neutral[200],
      border: `1px solid ${neutral[100]}`,
      borderRadius: '8px',
      transition: 'all 200ms ease-in-out',
      height: `${selectedSize.height}rem`,
      fontSize: selectedSize.fontSize,
      padding: selectedSize.inputPadding,
    },
    item: {
      fontFamily: 'Poppins, sans-serif',
      color: neutral[200],
      borderRadius: '8px',
      transition: 'background-color 200ms ease-in-out',
      padding: selectedSize.dropdownPadding,
      fontSize: selectedSize.fontSize,
      '&[data-selected]': {
        backgroundColor: neutral[50],
        color: neutral[200],
      },
      '&[data-hovered]': {
        backgroundColor: neutral[50],
      },
      ...styles,
    },
  };

  return <Select placeholder={placeholder} width={computedWidth} value={value} size={size} styles={style} itemComponent={DropdownItem} data={data || Fonts.FONTS} {...props} />;
};

export { FontSelect };
