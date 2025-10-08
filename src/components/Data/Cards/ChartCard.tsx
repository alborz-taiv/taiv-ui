import React from 'react';
import { Card, CardProps } from '../../Layout/Card';
import { Chart, ChartProps } from '../Chart';
import { Stack } from '../../Layout/Stack';
import { Title } from '../../Typography/Title';
import { Text } from '../../Typography/Text';

export interface ChartCardProps extends ChartProps, Omit<CardProps, 'children'> {
  title: string;
  subtitle?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, series, yAxisFormat, xAxisFormat, showLegend, loading, height = '30rem', ...cardProps }) => {
  return (
    <>
      <Card {...cardProps} h={height}>
        <Stack gap="2.4rem" h="100%" w="100%">
          <Stack gap="0.5rem">
            <Title variant="cardHeader">{title}</Title>
            {subtitle && <Text variant="label">{subtitle}</Text>}
          </Stack>
          <Chart series={series} yAxisFormat={yAxisFormat} xAxisFormat={xAxisFormat} showLegend={showLegend} loading={loading} />
        </Stack>
      </Card>
      <style>{`.recharts-surface { outline: none; }`}</style>
    </>
  );
};
