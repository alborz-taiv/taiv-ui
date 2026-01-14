import React from 'react';
import { Card, CardProps } from '../../../Layout/Card/Card';
import { Chart, ChartProps } from '../../Chart/Chart';
import { Stack } from '../../../Layout/Stack/Stack';
import { Title } from '../../../Typography/Title/Title';
import { Text } from '../../../Typography/Text/Text';
import { InfoTooltip } from '../../../Info/Tooltips/InfoTooltip/InfoTooltip';
import { Group } from '@mantine/core';

export interface ChartCardProps extends ChartProps, Omit<CardProps, 'children'> {
  title: string;
  subtitle?: string;
  tooltip?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, series, yAxisFormat, xAxisFormat, showLegend, loading, height = '30rem', tooltip, ...cardProps }) => {
  return (
    <>
      <Card {...cardProps} h={height}>
        <Stack gap="2.4rem" h="100%" w="100%">
          <Stack gap="0.5rem">
            <Group position="apart">
              <Title variant="cardHeader">{title}</Title>
              {tooltip && <InfoTooltip text={tooltip} maxWidth="600px" />}
            </Group>
            {subtitle && <Text variant="label">{subtitle}</Text>}
          </Stack>
          <Chart series={series} yAxisFormat={yAxisFormat} xAxisFormat={xAxisFormat} showLegend={showLegend} loading={loading} />
        </Stack>
      </Card>
      <style>{`.recharts-surface { outline: none; }`}</style>
    </>
  );
};
