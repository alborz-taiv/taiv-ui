import React from 'react';
import { Card, CardProps } from '../Layout/Card/Card';
import { Center } from '../Layout/Center/Center';
import { colors } from '../../constants/colors';

export interface InfoCardProps extends Omit<CardProps, 'children'> {
  children: React.ReactNode;
  variant?: keyof typeof colors;
}

export const InfoCard = ({ children, variant = 'primary', ...cardProps }: InfoCardProps) => {
  const colorPalette = colors[variant];

  const style = {
    border: `1px solid ${colorPalette[200]}`,
    backgroundColor: colorPalette[25],
    color: colorPalette[200] + ' !important',
    padding: '3.2rem 6.4rem',
  };

  return (
    <Card
      shadow="lg"
      style={style}
      sx={{
        '& *': {
          color: `${colorPalette[200]} !important`,
        },
      }}
      {...cardProps}
    >
      <Center>{children}</Center>
    </Card>
  );
};
