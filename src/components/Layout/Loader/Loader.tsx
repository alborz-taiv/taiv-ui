import React from 'react';
import { Loader as MantineLoader, LoaderProps as MantineLoaderProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';

import { primary } from '../../../constants';

interface LoaderProps extends MantineLoaderProps {
  styles?: Record<string, CSSObject>;
}

const Loader = ({ styles, color = `${primary[200]}`, ...props }: LoaderProps) => {
  return <MantineLoader color={color} styles={styles} {...props} />;
};

export { Loader };
