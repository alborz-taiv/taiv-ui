import React from 'react';
import { DatePickerInput as MantineDatePickerInput, DatePickerInputProps as MantineDatePickerInputProps } from '@mantine/dates';
import { createStyles } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral, primary, white } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { componentSizes } from '../../Dropdowns/shared/sizes';

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
  showIcon = true,
  styles,
  ...props
}: DatePickerProps<T>) => {
  const selectedSize = componentSizes[size];

  const { classes } = createStyles(() => ({
    root: {
      width: fullWidth ? '100%' : width || (props.type === 'range' ? `${selectedSize.minWidth * 1.2}px` : `${selectedSize.minWidth}px`), // Range inputs are slightly wider than regular inputs
    },
    input: {
      height: `${selectedSize.height}px`,
      paddingRight: selectedSize.inputPadding,
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[300],
      borderRadius: '8px',
      border: `1px solid ${neutral[100]}`,
      transition: 'all 200ms ease-in-out',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    placeholder: {
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 1px)`,
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
        backgroundColor: primary[200],
        color: white,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: primary[300],
          color: white,
        },
        '&:focus-visible': {
          outline: `2px solid ${primary[200]}`,
          outlineOffset: 2,
        },
      },
      '& .mantine-Day-day[data-in-range="true"]': {
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '50%',
        backgroundColor: primary[25],
        '&:hover': {
          backgroundColor: primary[50],
        },
      },
      '& .mantine-Day-day[data-first-in-range="true"], & .mantine-Day-day[data-last-in-range="true"]': {
        fontFamily: 'Poppins, sans-serif',
        borderRadius: '50%',
        backgroundColor: primary[200],
        color: white,
        '&:hover': {
          backgroundColor: primary[300],
        },
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
      icon={showIcon ? <i className="far fa-calendar" style={{ fontSize: 14, marginLeft: spacing.xxs }} /> : undefined}
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
      firstDayOfWeek={0}
      {...props}
    />
  );
};
