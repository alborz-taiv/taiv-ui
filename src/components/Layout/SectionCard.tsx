import React from 'react';
import { Card as MantineCard, CardProps as MantineCardProps } from '@mantine/core';
import { colors } from '../../constants/colors';
import { Stack } from './Stack';
import { Title } from '../Typography/Title';
import { Text } from '../Typography/Text';

export interface SectionCardProps extends Omit<MantineCardProps, 'children'> {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  color?: keyof typeof colors;
}

export const SectionCard = ({ title, subtitle, children, color = 'primary', ...props }: SectionCardProps) => {
  return (
    <MantineCard radius="20px" shadow="lg" withBorder padding={0} {...props}>
      {/* Header Section */}
      <div
        style={{
          // background: `linear-gradient(to right, ${colors[color][300]}, ${colors[color][200]})`,
          backgroundColor: 'white',
          padding: '1.6rem 2rem 0 2rem',
          borderRadius: '20px 20px 0 0',
        }}
      >
        <Stack gap="0.25rem">
          <Title variant="cardHeader">{title}</Title>
          {subtitle && <Title variant="cardSubheader">{subtitle}</Title>}
        </Stack>
      </div>

      {/* Content Section */}
      <div style={{ padding: '2rem 3.2rem 3.2rem 3.2rem' }}>{children}</div>
    </MantineCard>
  );
};
