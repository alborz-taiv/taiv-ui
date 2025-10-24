import React from 'react';
import { Card, CardProps } from '../../Layout/Card/Card';
import { PieChart, PieChartProps } from '../PieChart';
import { Stack } from '../../Layout/Stack/Stack';
import { Title } from '../../Typography/Title';
import { Text } from '../../Typography/Text';
import { InfoTooltip } from '../../Info/Tooltips/InfoTooltip';
import { Group } from '@mantine/core';

export interface PieChartCardProps extends PieChartProps, Omit<CardProps, 'children'> {
  title: string;
  subtitle?: string;
  tooltip?: React.ReactNode;
  height?: number | string;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
  title,
  subtitle,
  data,
  tooltip,
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
            <Group>
              <Title variant="cardHeader">{title}</Title>
              {tooltip && <InfoTooltip text={tooltip} maxWidth="600px" />}
            </Group>
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
