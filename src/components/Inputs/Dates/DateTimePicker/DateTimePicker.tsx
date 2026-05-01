import React from 'react';
import {
  DateTimePicker as MantineDateTimePicker,
  DateTimePickerProps as MantineDateTimePickerProps,
} from '@mantine/dates';
import { createStyles } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral, primary, white } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { componentSizes } from '../../Dropdowns/shared/sizes';

export interface DateTimePickerProps extends Omit<MantineDateTimePickerProps, 'styles'> {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
  showIcon?: boolean;
}

export const DateTimePicker = ({
  size = 'md',
  width,
  fullWidth = false,
  placeholder = 'Pick date and time',
  showIcon = true,
  styles,
  ...props
}: DateTimePickerProps) => {
  const selectedSize = componentSizes[size];

  const { classes } = createStyles(() => ({
    root: {
      width: fullWidth ? '100%' : width || `${selectedSize.minWidth * 1.2}px`,
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
      '& .mantine-WeekdaysRow-weekday': {
        textAlign: 'center',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    timeWrapper: {
      '& input': {
        ...fontBase,
        fontSize: selectedSize.fontSize,
        color: neutral[300],
        borderRadius: '8px',
        border: `1px solid ${neutral[100]}`,
      },
      '& .mantine-ActionIcon-root': {
        borderRadius: '8px',
      },
    },
    ...styles,
  }))();

  return (
    <MantineDateTimePicker
      icon={showIcon ? <i className="far fa-calendar" style={{ fontSize: 14, marginLeft: spacing.xxs }} /> : undefined}
      radius="lg"
      size="xl"
      classNames={{
        root: classes.root,
        input: classes.input,
        placeholder: classes.placeholder,
        label: classes.label,
        calendar: classes.calendar,
        timeWrapper: classes.timeWrapper,
      }}
      placeholder={placeholder}
      popoverProps={{ radius: 'lg' }}
      {...props}
    />
  );
};
