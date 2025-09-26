import React from 'react';
import { Card, CardProps } from '../Layout/Card';
import { Text } from '../Typography/Text';
import { Title } from '../Typography/Title';
import { Stack } from '../Layout/Stack';
import { Center } from '../Layout/Center';
import { primary, neutral } from '../../constants/colors';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Group } from '../Layout/Group';
import { dataFormats, chartFormats } from './shared/dataFormats';

export interface ChartDataPoint {
  date: string | number;
  value: number;
  label?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
  type?: 'line' | 'area' | 'bar';
}

export interface ChartProps extends Omit<CardProps, 'children'> {
  title: string;
  subtitle?: string;
  series: ChartSeries[];
  height?: string | number;
  showLegend?: boolean;
  showGrid?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;

  // New flexible formatting options
  format?: keyof typeof dataFormats; // Use predefined formats
  formatYAxis?: (value: number) => string; // Custom formatter (overrides format)
  formatXAxis?: (value: string | number) => string;

  tooltipContent?: (data: any) => React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
}

export const Chart: React.FC<ChartProps> = ({
  title,
  subtitle,
  series,
  height = 300,
  showLegend = true,
  showGrid = true,
  xAxisLabel,
  yAxisLabel,

  // New formatting props
  format = 'decimal', // Default format
  formatYAxis, // Custom formatter
  formatXAxis = (value: string | number) => value.toString(),

  tooltipContent,
  loading = false,
  emptyMessage = 'No data available',
  ...cardProps
}) => {
  // Create the Y-axis formatter function
  const getYAxisFormatter = (): ((value: number) => string) => {
    // If custom formatYAxis is provided, use it (takes priority)
    if (formatYAxis) {
      return formatYAxis;
    }

    // Otherwise, use the smart chart format
    return chartFormats[format];
  };

  const yAxisFormatter = getYAxisFormatter();
  const hasData = series.some((s) => s.data.length > 0);

  // Custom tick components using our Text component
  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-50} y={0} width={100} height={20}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text variant="label">{formatXAxis(payload.value)}</Text>
          </div>
        </foreignObject>
      </g>
    );
  };

  const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-35} y={-10} width={35} height={20}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
            <Text variant="label">{yAxisFormatter(payload.value)}</Text>
          </div>
        </foreignObject>
      </g>
    );
  };

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

  // Transform data to match Recharts format
  const chartData = series[0]?.data.map((point, index) => {
    const dataPoint: any = { date: point.date };
    series.forEach((s, seriesIndex) => {
      if (s.data[index]) {
        dataPoint[s.name] = s.data[index].value;
      }
    });
    return dataPoint;
  });

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
          }}
        >
          <Text weight="semibold" color={neutral[300]}>
            {formatXAxis(label)}
          </Text>
          {payload.map((entry: any) => (
            <Group key={entry.name}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: entry.color,
                }}
              />
              <Group gap="0.25rem">
                <Text variant="label" color={neutral[300]}>
                  {entry.name}:
                </Text>
                <Text variant="label">{yAxisFormatter(entry.value)}</Text>
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
        <Stack gap="1rem">
          <Stack gap="0.5rem">
            <Title variant="cardHeader">{title}</Title>
            {subtitle && <Text variant="label">{subtitle}</Text>}
          </Stack>

          <Center style={{ height, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <defs>
                  {series.map((s, index) => (
                    <linearGradient key={s.name} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.color || primary[200]} stopOpacity={0.3} />
                      <stop offset="99%" stopColor={s.color || primary[200]} stopOpacity={0.05} />
                    </linearGradient>
                  ))}
                </defs>

                <XAxis dataKey="date" axisLine={{ stroke: neutral[50] }} tickLine={{ stroke: neutral[50] }} tick={<CustomXAxisTick />} />
                <YAxis width={40} axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />

                <CartesianGrid strokeDasharray="0" stroke={neutral[50]} horizontal={true} vertical={false} />

                {series.map((s, index) => {
                  const seriesType = s.type || 'line'; // Default to 'line' if no type specified

                  if (seriesType === 'area') {
                    return (
                      <Area
                        key={s.name}
                        type="monotone"
                        dataKey={s.name}
                        stroke={s.color || primary[200]}
                        strokeWidth={2}
                        fill={`url(#gradient-${index})`}
                        baseValue="dataMin"
                        style={{ outline: 'none' }}
                      />
                    );
                  } else if (seriesType === 'bar') {
                    return (
                      <Bar
                        key={s.name}
                        dataKey={s.name}
                        fill={s.color || primary[200]}
                        radius={[8, 8, 0, 0]}
                        style={{ outline: 'none' }}
                        onMouseEnter={(data, index, event) => {
                          // Highlight the entire bar on hover
                          const barElement = event.target as HTMLElement;
                          if (barElement) {
                            barElement.style.opacity = '0.8';
                          }
                        }}
                        onMouseLeave={(data, index, event) => {
                          // Reset bar appearance on mouse leave
                          const barElement = event.target as HTMLElement;
                          if (barElement) {
                            barElement.style.opacity = '1';
                          }
                        }}
                      />
                    );
                  } else {
                    // Default to line (seriesType === 'line')
                    return <Line key={s.name} type="monotone" dataKey={s.name} stroke={s.color || primary[200]} strokeWidth={2} dot={false} style={{ outline: 'none' }} />;
                  }
                })}

                <Tooltip
                  content={tooltipContent || <CustomTooltip />}
                  cursor={series.some((s) => s.type === 'bar') ? false : true}
                  wrapperStyle={{
                    border: 'none',
                    outline: 'none', // Remove any outline
                    boxShadow: 'none', // Remove default shadow
                  }}
                  contentStyle={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'transparent',
                  }}
                  labelStyle={{
                    display: 'none',
                  }}
                />

                {showLegend && (
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <Text variant="label" sx={{ color: neutral[300], display: 'inline', whiteSpace: 'nowrap' }}>
                        {value}
                      </Text>
                    )}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </Center>
        </Stack>
      </Card>
      <style>{`.recharts-surface { outline: none; }`}</style>
    </>
  );
};
