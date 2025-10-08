import React from 'react';
import { Divider as MantineDivider, DividerProps as MantineDividerProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../constants/colors';

interface DividerProps extends MantineDividerProps {
  width?: string | number;
  styles?: Record<string, CSSObject>;
  color?: string;
}

const Divider = ({ width = '100%', styles, color = neutral[50], ...props }: DividerProps) => {
  return <MantineDivider color={color} w={width} styles={styles} {...props} />;
};

export { Divider };
