import React from 'react';
import { Box as MantineBox, BoxProps as MantineBoxProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface BoxProps extends MantineBoxProps {
  width?: string | number;
  onClick?: () => void;
  styles?: Record<string, CSSObject>;
}

const Box = ({ width, styles, onClick, ...props }: BoxProps) => {
  return <MantineBox w={width} styles={styles} onClick={onClick} {...props} />;
};

export { Box };
