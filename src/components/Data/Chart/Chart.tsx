import React from 'react';
import { Text } from '../../Typography/Text/Text';
import { Center } from '../../Layout/Center/Center';
import { Box } from '../../Layout/Box/Box';
import { Stack } from '../../Layout/Stack/Stack';
import { Group } from '../../Layout/Group/Group';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formats } from '../../../constants/data';
import { getChartFormatter } from '../../../utils/charts';
import { fontStyle } from '../../../constants/font';
import { primary, neutral } from '../../../constants/colors';
import { ChartSeries } from '../../../types/types';
import { createStyles } from '@mantine/core';

export interface ChartProps {
  series: ChartSeries[];
  yAxisFormat?: keyof typeof formats;
  xAxisFormat?: keyof typeof formats;
  height?: string | number;
  showLegend?: boolean;
  loading?: boolean;
}

export const Chart: React.FC<ChartProps> = ({ series, yAxisFormat = 'decimal', xAxisFormat = 'string', showLegend = true, loading = false, height = '100%' }) => {
  const formatYAxisValue: (value: number | string) => string = getChartFormatter(yAxisFormat);
  const formatXAxisValue: (value: number | string) => string = getChartFormatter(xAxisFormat);
  const hasData = series.some((s) => s.data.length > 0);

  // Transform our ChartSeries array to match the Recharts format (just a singular data array keyed by the series name)
  const transformedData = (() => {
    if (!series.length) return [];
    return series[0].data.map((_, i) => {
      const point: Record<string, string | number> = { key: series[0].data[i].key };
      series.forEach((s) => {
        point[s.name] = s.data[i].value;
      });
      return point;
    });
  })();

  const getTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '1rem',
            border: `1px solid ${neutral[100]}`,
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Stack gap="0.25rem">
            <Text weight="semibold" color={neutral[300]}>
              {formatXAxisValue(label)}
            </Text>
            {payload.map((entry: any) => (
              <Group key={entry.name} gap="0.5rem">
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
                  <Text variant="label">{formatYAxisValue(entry.value)}</Text>
                </Group>
              </Group>
            ))}
          </Stack>
        </Box>
      );
    }
    return null;
  };

  const { classes } = createStyles(() => ({
    rechartsText: {
      '& .recharts-text.recharts-cartesian-axis-tick-value tspan': {
        ...fontStyle.label,
      },
    },
    rechartsSurface: {
      '& .recharts-surface': {
        outline: 'none',
      },
    },
  }))();

  return (
    <>
      {loading || !hasData ? (
        <Center style={{ height, backgroundColor: neutral[25], borderRadius: '8px' }}>
          <Text variant="label" color={neutral[200]}>
            {loading ? 'Loading...' : 'No data available'}
          </Text>
        </Center>
      ) : (
        <>
          <Center h={height} w="100%" className={classes.rechartsText}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={transformedData} className={classes.rechartsSurface}>
                <defs>
                  {series.map((s, index) => (
                    <linearGradient key={s.name} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={s.color || primary[200]} stopOpacity={0.3} />
                      <stop offset="99%" stopColor={s.color || primary[200]} stopOpacity={0.05} />
                    </linearGradient>
                  ))}
                </defs>

                <XAxis dataKey="key" axisLine={{ stroke: neutral[50] }} tickLine={{ stroke: neutral[50] }} tickMargin={8} tickFormatter={formatXAxisValue} />
                <YAxis width={50} axisLine={false} tickLine={false} tickFormatter={formatYAxisValue} />

                <CartesianGrid strokeDasharray="0" stroke={neutral[50]} horizontal={true} vertical={false} />

                {series.map((s, index) => {
                  const seriesType = s.type || 'line';
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
                        maxBarSize={140}
                        style={{ outline: 'none' }}
                        onMouseEnter={(data, index, event) => {
                          const barElement = event.target as HTMLElement;
                          if (barElement) {
                            barElement.style.opacity = '0.8';
                          }
                        }}
                        onMouseLeave={(data, index, event) => {
                          const barElement = event.target as HTMLElement;
                          if (barElement) {
                            barElement.style.opacity = '1';
                          }
                        }}
                      />
                    );
                  } else {
                    return <Line key={s.name} type="monotone" dataKey={s.name} stroke={s.color || primary[200]} strokeWidth={2} dot={false} style={{ outline: 'none' }} />;
                  }
                })}

                <Tooltip content={getTooltip} cursor={series.some((s) => s.type === 'bar') ? false : true} />

                {showLegend && (
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingTop: '0.6rem' }}
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
        </>
      )}
    </>
  );
};
