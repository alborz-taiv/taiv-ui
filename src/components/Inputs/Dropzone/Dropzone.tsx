import React from 'react';
import {
  Dropzone as MantineDropzone,
  DropzoneProps as MantineDropzoneProps,
} from '@mantine/dropzone';
import { CSSObject } from '@mantine/core';
import { colors } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export interface DropzoneProps extends Omit<MantineDropzoneProps, 'styles'> {
  styles?: Record<string, CSSObject>;
}

const DropzoneComponent = ({ styles, children, ...props }: DropzoneProps) => {
  const style: Record<string, CSSObject> = {
    root: {
      ...fontBase,
      backgroundColor: 'white',
      border: `1px dashed ${colors.neutral[100]}`,
      borderRadius: '8px',
      color: colors.neutral[300],
      cursor: 'pointer',
      padding: spacing.xl,
      transition: 'background-color 200ms ease, border-color 200ms ease',
      '&:hover': {
        backgroundColor: colors.neutral[25],
        borderColor: colors.neutral[200],
      },
      '&[data-accept]': {
        backgroundColor: colors.primary[25],
        borderColor: colors.primary[200],
        borderStyle: 'solid',
      },
      '&[data-reject]': {
        backgroundColor: colors.error[25],
        borderColor: colors.error[200],
        borderStyle: 'solid',
      },
    },
    ...styles,
  };

  return (
    <MantineDropzone styles={style} {...props}>
      {children}
    </MantineDropzone>
  );
};

export const Dropzone = Object.assign(DropzoneComponent, {
  Accept: MantineDropzone.Accept,
  Reject: MantineDropzone.Reject,
  Idle: MantineDropzone.Idle,
  FullScreen: MantineDropzone.FullScreen,
});

// Re-export the MIME-type presets so consumers can do:
//   import { Dropzone, IMAGE_MIME_TYPE } from '@taiv/ui';
export {
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
  MS_WORD_MIME_TYPE,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  MIME_TYPES,
} from '@mantine/dropzone';
export type { FileWithPath, FileRejection } from '@mantine/dropzone';
