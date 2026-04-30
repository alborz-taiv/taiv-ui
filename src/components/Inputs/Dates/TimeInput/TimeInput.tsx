import React from 'react';
import {
  TimeInput as MantineTimeInput,
  TimeInputProps as MantineTimeInputProps,
} from '@mantine/dates';
import { createStyles } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { componentSizes } from '../../Dropdowns/shared/sizes';

export interface TimeInputProps extends Omit<MantineTimeInputProps, 'styles'> {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
  showIcon?: boolean;
}

/**
 * A pure time-of-day input. Wraps Mantine's `TimeInput` (which uses a native
 * `<input type='time'>`) so the user can't accidentally drift the date — use
 * this any time only the time-of-day matters and a separate `<DatePicker>`
 * owns the date. The displayed format (12h vs 24h) is determined by the
 * browser's locale; the value is always `"HH:mm"` (24h) for consumers.
 */
export const TimeInput = ({
  size = 'md',
  width,
  fullWidth = false,
  placeholder = 'Pick a time',
  showIcon = true,
  styles,
  ...props
}: TimeInputProps) => {
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
    ...styles,
  }))();

  return (
    <MantineTimeInput
      icon={
        showIcon ? (
          <i
            className='far fa-clock'
            style={{ fontSize: 14, marginLeft: spacing.xxs }}
          />
        ) : undefined
      }
      radius='lg'
      size='xl'
      classNames={{
        root: classes.root,
        input: classes.input,
        label: classes.label,
      }}
      placeholder={placeholder}
      {...props}
    />
  );
};
