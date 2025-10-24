import React from 'react';
import { Group as MantineGroup, GroupProps as MantineGroupProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface GroupProps extends MantineGroupProps {
  width?: string | number;
  styles?: Record<string, CSSObject>;
  gap?: string;
}

const Group = ({ width, gap, styles, ...props }: GroupProps) => {
  return <MantineGroup w={width} spacing={gap} styles={styles} {...props} />;
};

export { Group };
