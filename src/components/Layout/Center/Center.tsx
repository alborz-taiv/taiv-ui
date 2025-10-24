import React from 'react';
import { Center as MantineCenter, CenterProps as MantineCenterProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface CenterProps extends MantineCenterProps {
  width?: string | number;
  styles?: Record<string, CSSObject>;
}

const Center = ({ width, styles, ...props }: CenterProps) => {
  return <MantineCenter w={width} styles={styles} {...props} />;
};

export { Center };
