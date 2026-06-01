import React from 'react';
import { Group as MantineGroup, GroupProps as MantineGroupProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface GroupProps extends MantineGroupProps {
  width?: string | number;
  styles?: Record<string, CSSObject>;
  // Maps to Mantine's `spacing`, which accepts a theme token OR a raw pixel
  // number — keep both so callers can pass `gap={6}` for one-off spacing.
  gap?: string | number;
}

const Group = ({ width, gap, styles, ...props }: GroupProps) => {
  return <MantineGroup w={width} spacing={gap} styles={styles} {...props} />;
};

export { Group };
