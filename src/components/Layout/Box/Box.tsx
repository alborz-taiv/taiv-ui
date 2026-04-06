import React from 'react';
import { Box as MantineBox, BoxProps as MantineBoxProps } from '@mantine/core';

interface BoxProps extends MantineBoxProps {
  width?: string | number;
  onClick?: () => void;
}

const Box = ({ width, onClick, ...props }: BoxProps) => {
  return <MantineBox w={width} onClick={onClick} {...props} />;
};

export { Box };
