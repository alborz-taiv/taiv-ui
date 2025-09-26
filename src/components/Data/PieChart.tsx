import React from 'react';
import { Card, CardProps } from '../Layout/Card';
import { Text } from '../Typography/Text';
import { Title } from '../Typography/Title';
import { Stack } from '../Layout/Stack';
import { Center } from '../Layout/Center';
import { Group } from '../Layout/Group';
import { primary, neutral } from '../../constants/colors';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export interface PieChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps extends Omit<CardProps, 'children'> {
  title: string;
  subtitle?: string;
  data: PieChartDataPoint[];
  height?: string | number;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  colors?: string[];
  formatValue?: (value: number) => string;
  tooltipContent?: (data: any) => React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
}

// Default color palette
const DEFAULT_COLORS = [primary[200], primary[300], primary[100], primary[50], '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];

export const PieChart: React.FC<PieChartProps> = ({
  title,
  subtitle,
  data,
  height = '30rem',
  showLegend = true,
  innerRadius = 80,
  outerRadius = 100,
  paddingAngle = 5,
  colors = DEFAULT_COLORS,
  formatValue = (value: number) => value.toString(),
  tooltipContent,
  loading = false,
  emptyMessage = 'No data available',
  ...cardProps
}) => {
  const hasData = data && data.length > 0;
  const totalValue = hasData ? data.reduce((sum, item) => sum + item.value, 0) : 0;
  const firstDataPoint = hasData ? data[0] : null;
  const firstDataPercentage = firstDataPoint && totalValue > 0 ? Math.round((firstDataPoint.value / totalValue) * 100) : 0;

  if (loading) {
    return (
      <Card {...cardProps}>
        <Stack gap="1rem">
          <Title variant="cardHeader">{title}</Title>
          {subtitle && <Text variant="label">{subtitle}</Text>}
          <Center style={{ height, backgroundColor: neutral[25], borderRadius: '8px' }}>
            <Text variant="label" color={neutral[200]}>
              Loading...
            </Text>
          </Center>
        </Stack>
      </Card>
    );
  }

  if (!hasData) {
    return (
      <Card {...cardProps}>
        <Stack gap="1rem">
          <Title variant="cardHeader">{title}</Title>
          {subtitle && <Text variant="label">{subtitle}</Text>}
          <Center style={{ height, backgroundColor: neutral[25], borderRadius: '8px' }}>
            <Text variant="label" color={neutral[200]}>
              {emptyMessage}
            </Text>
          </Center>
        </Stack>
      </Card>
    );
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '10px',
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
            <Group key={entry.name}>
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
                  {entry.payload.name}:
                </Text>
                <Text variant="label">{formatValue(entry.payload.value)}</Text>
              </Group>
            </Group>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Card {...cardProps}>
        <Stack gap="0">
          <Stack gap="0.5rem">
            <Title variant="cardHeader">{title}</Title>
            {subtitle && <Text variant="label">{subtitle}</Text>}
          </Stack>

          <Center style={{ height, width: '100%', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
              <RechartsPieChart style={{ outline: 'none' }}>
                <Pie data={data} innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={paddingAngle} dataKey="value" style={{ outline: 'none' }}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color || colors[index % colors.length]} style={{ outline: 'none' }} />
                  ))}
                </Pie>

                <Tooltip
                  content={tooltipContent || <CustomTooltip />}
                  wrapperStyle={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    zIndex: 1000,
                  }}
                  contentStyle={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'transparent',
                  }}
                />

                {showLegend && (
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    style={{
                      marginTop: '1rem',
                    }}
                    formatter={(value) => (
                      <Text variant="label" style={{ color: neutral[300], display: 'inline', whiteSpace: 'nowrap' }}>
                        {value}
                      </Text>
                    )}
                  />
                )}
              </RechartsPieChart>
            </ResponsiveContainer>

            {/* Center content displaying first data point percentage and title */}
            <Center
              style={{
                position: 'absolute',
                top: '45%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <Stack gap="0" align="center">
                <Title variant="cardHeader" color={neutral[300]}>
                  {firstDataPercentage}%
                </Title>
                <Text variant="label">{title}</Text>
              </Stack>
            </Center>
          </Center>
        </Stack>
      </Card>
      <style>{`.recharts-surface { outline: none; }`}</style>
    </>
  );
};
