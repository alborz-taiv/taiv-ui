import React from 'react';
import { TextInput } from './TextInput';
import { TextInputProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { componentSizes } from './shared/sizes';

interface SearchBarProps extends TextInputProps {
  fullWidth?: boolean;
}

const SearchBar = ({ width, fullWidth = false, size = 'md', styles, ...props }: SearchBarProps) => {
  const selectedSize = componentSizes[(size as 'sm' | 'md' | 'lg') || 'md'];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}rem`;

  const style = {
    input: {
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
      border: `1px solid ${neutral[100]}`,
      borderRadius: '8px',
      height: `${selectedSize.height}rem`,
      transition: 'all 200ms ease-in-out',
    },
    ...styles,
  };

  return (
    <TextInput
      placeholder="Search"
      width={computedWidth}
      styles={style}
      icon={<i className="fas fa-search" style={{ fontSize: 14, marginLeft: '0.25rem' }} />}
      size={'lg'}
      fullWidth={fullWidth}
      {...props}
    />
  );
};

export { SearchBar };
