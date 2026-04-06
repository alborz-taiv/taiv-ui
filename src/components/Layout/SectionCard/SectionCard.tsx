import React from 'react';
import { Card, CardProps } from '../Card/Card';
import { Stack } from '../Stack/Stack';
import { Title } from '../../Typography/Title/Title';
import { Box } from '../Box/Box';

export interface SectionCardProps extends Omit<CardProps, 'children'> {
  title: string;
  subtitle?: string;
  children: React.ReactNode;

}

export const SectionCard = ({ title, subtitle, children, ...props }: SectionCardProps) => {
  return (
    <Card p="2.4rem" {...props}>
      <Stack gap="2rem">
      {/* Header Section */}
        <Stack gap="0">
          <Title variant="cardHeader">{title}</Title>
          {subtitle && <Title variant="cardSubheader">{subtitle}</Title>}
        </Stack>
        {/* Content Section */}
        <Box>{children}</Box>
      </Stack>
    </Card>
  );
};
