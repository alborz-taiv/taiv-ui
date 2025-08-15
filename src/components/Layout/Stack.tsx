import React from 'react';
import { Stack as MantineStack, StackProps as MantineStackProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface StackProps extends MantineStackProps {
  width?: string | number;
  gap?: string;
  styles?: Record<string, CSSObject>;
}

const Stack = ({ width, gap, styles, ...props }: StackProps) => {
  return <MantineStack w={width} spacing={gap} styles={styles} {...props} />;
};

export { Stack };
