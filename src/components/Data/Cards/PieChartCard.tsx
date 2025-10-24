import React from 'react';
import { Card, CardProps } from '../../Layout/Card/Card';
import { PieChart, PieChartProps } from '../PieChart';
import { Stack } from '../../Layout/Stack/Stack';
import { Title } from '../../Typography/Title';
import { Text } from '../../Typography/Text';

export interface PieChartCardProps extends PieChartProps, Omit<CardProps, 'children'> {
  title: string;
  subtitle?: string;
  height?: number | string;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  subtitle,
  data,
  height = '100%',
  showLegend,
  innerRadius,
  outerRadius,
  paddingAngle,
  format = 'percentage',
  loading,
  centerContent,
  ...cardProps
}) => {
  return (
    <>
      <Card {...cardProps} h={height}>
        <Stack gap="0rem" h="100%" w="100%">
          <Stack gap="0.5rem">
            <Title variant="cardHeader">{title}</Title>
            {subtitle && <Text variant="label">{subtitle}</Text>}
          </Stack>
          <PieChart
            data={data}
            showLegend={showLegend}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={paddingAngle}
            format={format}
            loading={loading}
            centerContent={centerContent}
          />
        </Stack>
      </Card>
      <style>{`.recharts-surface { outline: none; }`}</style>
    </>
  );
};
