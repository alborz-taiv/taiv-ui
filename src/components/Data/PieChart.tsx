import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Label } from 'recharts';
import { Text } from '../Typography/Text';
import { Center } from '../Layout/Center/Center';
import { Group } from '../Layout/Group/Group';
import { Title } from '../Typography/Title';
import { Stack } from '../Layout/Stack/Stack';
import { Box } from '../Layout/Box/Box';
import { neutral } from '../../constants/colors';
import { textStyle } from '../../constants/font';
import { numberFormats } from '../../constants/data';
import { getChartFormatter } from '../../utils/charts';
import { PieDataPoint } from '../../types/types';
export interface PieCardCenterContentProps {
  title: string;
  subtitle?: string;
  value?: number;
}
export interface PieChartProps {
  data: PieDataPoint[];
  format: keyof typeof numberFormats;
  height?: string | number;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  loading?: boolean;
  centerContent?: PieCardCenterContentProps;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  showLegend = true,
  innerRadius = 80,
  outerRadius = 100,
  paddingAngle = 5,
  format = 'percentage',
  loading = false,
  centerContent,
  height = '100%',
}) => {
  const hasData = data && data.length > 0;

  const transformedData = data.map((item) => ({
    ...item,
    name: item.key,
  }));

  const getCenterContent = () => {
    return (
      <g>
        <foreignObject x="0%" y="35%" width="100%" height="100%" style={{ pointerEvents: 'none' }}>
          <Stack gap="0" align="center">
            {centerContent?.value && (
              <Title variant="sectionHeader" color={neutral[300]}>
                {getChartFormatter(format, { decimalPlaces: 0 })(centerContent.value)}
              </Title>
            )}
            {centerContent?.title && <Title variant="cardSubheader">{centerContent.title}</Title>}
            {centerContent?.subtitle && <Text variant="label">{centerContent.subtitle}</Text>}
          </Stack>
        </foreignObject>
      </g>
    );
  };

  const getTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '1rem',
            border: `1px solid ${neutral[100]}`,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 1000,
            position: 'relative',
          }}
        >
          <Text weight="semibold" color={neutral[300]}>
            {label}
          </Text>
          {payload.map((entry: any) => (
            <Group key={entry.key}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: entry.payload.color,
                }}
              />
              <Group gap="0.25rem">
                <Text variant="label" color={neutral[300]}>
                  {entry.payload.key}:
                </Text>
                <Text variant="label">{getChartFormatter(format)(entry.payload.value)}</Text>
              </Group>
            </Group>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <>
      {loading || !hasData ? (
        <Center style={{ backgroundColor: neutral[25], borderRadius: '8px' }}>
          <Text variant="label" color={neutral[200]}>
            {loading ? 'Loading...' : 'No data available'}
          </Text>
        </Center>
      ) : (
        <Center h={height} w="100%" style={{ position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
            <RechartsPieChart style={{ outline: 'none' }}>
              <Pie data={transformedData} innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={paddingAngle} dataKey="value" style={{ outline: 'none' }}>
                <Label content={getCenterContent()} position="center" />
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.key}`} fill={entry.color} style={{ outline: 'none' }} />
                ))}
              </Pie>

              <Tooltip content={getTooltip} />

              {showLegend && <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '0.6rem' }} />}
            </RechartsPieChart>
          </ResponsiveContainer>
        </Center>
      )}

      {/* TODO: This is kind of hacky, clean this up by using a className const so we can just spread textStyle.label */}
      <style>{`
        .recharts-legend-item-text {
          font-family: ${textStyle.label.fontFamily};
          font-size: ${textStyle.label.fontSize};
          line-height: ${textStyle.label.lineHeight};
          font-weight: ${textStyle.label.fontWeight};
          -webkit-font-smoothing: ${textStyle.label.WebkitFontSmoothing};
          -moz-osx-font-smoothing: ${textStyle.label.MozOsxFontSmoothing};
          display: inline !important;
          white-space: nowrap !important;
          color: ${neutral[300]} !important;
        }
      `}</style>
    </>
  );
};
