import React from 'react';
import { Kbd as MantineKbd, KbdProps as MantineKbdProps } from '@mantine/core';
import { colors } from '../../../constants/colors';
import { fontBase, fontSize } from '../../../constants/font';

export interface KbdProps extends MantineKbdProps {}

const Kbd = ({ ...props }: KbdProps) => {
  return (
    <MantineKbd
      sx={{
        ...fontBase,
        ...fontSize['sm'],
        backgroundColor: colors.neutral[25],
        borderColor: colors.neutral[100],
        color: colors.neutral[300],
        padding: '1px 6px',
        borderRadius: '4px',
      }}
      {...props}
    />
  );
};

export { Kbd };
