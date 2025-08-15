import React from 'react';
import { Divider as MantineDivider, DividerProps as MantineDividerProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../constants/colors';

interface DividerProps extends MantineDividerProps {
  width?: string | number;
  styles?: Record<string, CSSObject>;
}

const Divider = ({ width, styles, ...props }: DividerProps) => {
  return <MantineDivider color={neutral[50]} w={width} styles={styles} {...props} />;
};

export { Divider };
