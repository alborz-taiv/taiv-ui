import React from 'react';
import { CSSObject } from '@mantine/core';
import { ReactNode } from 'react';
import { Stack } from '../Layout/Stack';
import { Title } from '../Typography/Title';

interface FrameProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  width?: string | number;
  styles?: Record<string, CSSObject>;
}

const Frame = ({ title, subtitle, children, width, styles }: FrameProps) => {
  return (
    <Stack mt="1.25rem" width={width || '100%'} gap="0" {...styles}>
      <Stack mb="1.25rem" gap="0">
        <Title variant="sectionHeader">{title}</Title>
        {subtitle && <Title variant="sectionSubheader">{subtitle}</Title>}
      </Stack>
      {children}
    </Stack>
  );
};

export { Frame };
