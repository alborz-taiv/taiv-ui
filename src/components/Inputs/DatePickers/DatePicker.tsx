import React from 'react';
import { DatePickerInput as MantineDatePickerInput, DatePickerInputProps as MantineDatePickerInputProps } from '@mantine/dates';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { componentSizes } from '../Dropdowns/shared/sizes';

export interface DatePickerProps<T extends 'default' | 'multiple' | 'range' = 'default'> extends Omit<MantineDatePickerInputProps<T>, 'styles'> {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
  showIcon?: boolean;
}

export const DatePicker = <T extends 'default' | 'multiple' | 'range' = 'default'>({
  size = 'md',
  width,
  fullWidth = false,
  placeholder = 'Pick Date',
  styles,
  showIcon = true,
  ...props
}: DatePickerProps<T>) => {
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
      transition: 'all 200ms ease-in-out',
    },
    placeholder: {
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.1rem)`,
      color: neutral[200],
    },
    ...styles,
  };

  return (
    <MantineDatePickerInput
      icon={showIcon ? <i className="far fa-calendar" style={{ fontSize: 14, marginLeft: '0.25rem' }} /> : undefined}
      radius="lg"
      size="xl"
      styles={style}
      placeholder={placeholder}
      popoverProps={{ radius: 'lg' }}
      {...props}
    />
  );
};
