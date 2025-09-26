import React from 'react';
import { DatePickerInput as MantineDatePickerInput, DatePickerInputProps as MantineDatePickerInputProps } from '@mantine/dates';
import { createStyles } from '@mantine/core';
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

  const { classes } = createStyles(() => ({
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
    calendar: {
      '& .mantine-UnstyledButton-root': {
        borderRadius: '8px',
        fontFamily: 'Poppins, sans-serif',
      },
      '& .mantine-Day-day': {
        borderRadius: '50%',
      },
      '& .mantine-Day-day[data-selected="true"]': {
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '50%',
      },
      '& .mantine-Day-day[data-in-range="true"]': {
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '50%',
      },
      '& .mantine-Day-day[data-first-in-range="true"]': {
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '50%',
      },
      '& .mantine-Day-day[data-last-in-range="true"]': {
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '50%',
      },
      '& .mantine-WeekdaysRow-weekday': {
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    ...styles,
  }))();

  return (
    <MantineDatePickerInput
      icon={showIcon ? <i className="far fa-calendar" style={{ fontSize: 14, marginLeft: '0.25rem' }} /> : undefined}
      radius="lg"
      size="xl"
      classNames={{
        root: classes.root,
        input: classes.input,
        placeholder: classes.placeholder,
        label: classes.label,
        calendar: classes.calendar,
      }}
      placeholder={placeholder}
      popoverProps={{ radius: 'lg' }}
      {...props}
    />
  );
};
