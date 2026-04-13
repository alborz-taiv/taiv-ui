import React from 'react';
import { Textarea as MantineTextarea, TextareaProps as MantineTextareaProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral, red } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { componentSizes } from '../shared/sizes';

type TextAreaProps = MantineTextareaProps & {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
};

const TextArea = ({ size = 'md', width, fullWidth = false, styles, ...props }: TextAreaProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}px`;

  const style: Record<string, CSSObject> = {
    input: {
      minHeight: `${selectedSize.height}px`,
      fontSize: selectedSize.fontSize,
      padding: `${spacing.sm} 10px`,
      ...fontBase,
      color: neutral[200],
      transition: 'all 200ms ease-in-out',
      borderRadius: '8px',
      resize: 'vertical',
      '&[data-invalid]': {
        borderColor: red[200],
        color: neutral[200],
        '&::placeholder': {
          color: red[200],
        },
      },
    },
    label: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.5px)`,
      color: neutral[200],
    },
    error: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.5px)`,
      color: red[200],
    },
    ...styles,
  };

  return <MantineTextarea {...props} size={size} styles={style} w={computedWidth} minRows={props.minRows || selectedSize.minRows} maxRows={props.maxRows || selectedSize.maxRows} />;
};

export { TextArea };
