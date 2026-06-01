import type React from 'react';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Card, type CardProps } from '../../Layout/Card/Card';
import { Center } from '../../Layout/Center/Center';

export interface InfoCardProps extends Omit<CardProps, 'children'> {
  children: React.ReactNode;
  variant?: keyof typeof colors;
}

export const InfoCard = ({
  children,
  variant = 'primary',
  ...cardProps
}: InfoCardProps) => {
  const colorPalette = colors[variant];

  const style = {
    backgroundColor: colorPalette[25],
    border: `1px solid ${colorPalette[200]}`,
    color: colorPalette[200] + ' !important',
    padding: spacing.xl,
  };

  return (
    <Card
      shadow='lg'
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
