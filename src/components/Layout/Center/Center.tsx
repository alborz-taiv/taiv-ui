import React from 'react';
import { Center as MantineCenter, CenterProps as MantineCenterProps } from '@mantine/core';

interface CenterProps extends MantineCenterProps {
  width?: string | number;
  height?: string | number;
}

const Center = ({ width, height, ...props }: CenterProps) => {
  return <MantineCenter w={width} h={height} {...props} />;
};

export { Center };
