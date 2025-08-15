import React from 'react';
import { Loader as MantineLoader, LoaderProps as MantineLoaderProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface LoaderProps extends MantineLoaderProps {
  styles?: Record<string, CSSObject>;
}

const Loader = ({ styles, ...props }: LoaderProps) => {
  return <MantineLoader styles={styles} {...props} />;
};

export { Loader };
