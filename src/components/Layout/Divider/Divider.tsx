import React from 'react';
import { Divider as MantineDivider, DividerProps as MantineDividerProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';

interface DividerProps extends MantineDividerProps {
  width?: string | number;
  styles?: Record<string, CSSObject>;
  color?: string;
}

const Divider = ({ width, styles, color = neutral[50], ...props }: DividerProps) => {
  const isVertical = props.orientation === 'vertical';
  const resolvedWidth = width ?? (isVertical ? undefined : '100%');
  return <MantineDivider color={color} w={resolvedWidth} styles={styles} {...props} />;
};

export { Divider };
