import React from 'react';
import { Textarea as MantineTextarea, TextareaProps as MantineTextareaProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral, red } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { componentSizes } from '../shared/sizes';

type TextAreaProps = MantineTextareaProps & {
  size?: keyof typeof componentSizes;
  width?: string | number;
  fullWidth?: boolean;
  styles?: Record<string, CSSObject>;
};

const TextArea = ({ size = 'md', width, fullWidth = false, styles, ...props }: TextAreaProps) => {
  const selectedSize = componentSizes[size];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}rem`;

  const style: Record<string, CSSObject> = {
    input: {
      minHeight: `${selectedSize.height}rem`,
      fontSize: selectedSize.fontSize,
      padding: '0.75rem 1rem',
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
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
      color: neutral[200],
    },
    error: {
      ...fontBase,
      fontSize: `calc(${selectedSize.fontSize} - 0.05rem)`,
      color: red[200],
    },
    ...styles,
  };

  return <MantineTextarea {...props} size={size} styles={style} w={computedWidth} minRows={props.minRows || selectedSize.minRows} maxRows={props.maxRows || selectedSize.maxRows} />;
};

export { TextArea };
