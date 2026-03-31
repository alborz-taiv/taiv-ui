import dayjs from 'dayjs';
import { formats, numberFormats, truncation } from '../constants/data';
import { ChartFormatOptions, DataPoint } from '../types/types';

const formatAndTruncate = (value: number, format: keyof typeof numberFormats, options?: ChartFormatOptions): string => {
  const absValue = Math.abs(value);
  const config = numberFormats[format];
  const truncateConfig = truncation[options?.truncateAt ?? 'thousand'];
  const computedDecimalPlaces = options?.decimalPlaces ?? config.decimalPlaces;

  if (absValue >= truncateConfig.threshold) {
    return `${config.prefix}${(value / truncateConfig.threshold).toFixed(1)}${truncateConfig.suffix}${config.suffix}`;
  } else {
    return `${config.prefix}${value.toFixed(computedDecimalPlaces)}${config.suffix}`;
  }
};

export const getChartFormatter = (format: keyof typeof formats, options?: ChartFormatOptions): ((value: string | number) => string) => {
  if (format === 'string') {
    return (value: string | number): string => String(value);
  } else if (format in numberFormats) {
    return (value: string | number): string => {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (isNaN(numValue)) {
        return String(value);
      }
      return formatAndTruncate(numValue, format, options);
    };
  }
  throw new Error(`Invalid format: ${format}`);
};

export const aggregateDataByDate = (data: DataPoint[]) => {
  const dailyTotals = data.reduce((acc: Record<string, number>, item: DataPoint) => {
    const date = dayjs(item.key).format('MMM DD');
    const value = typeof item.value === 'number' ? item.value : 0;

    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += value;
    return acc;
  }, {});

  const result = Object.keys(dailyTotals)
    .map((date) => ({
      key: date,
      value: dailyTotals[date],
    }))
    .sort((a, b) => dayjs(a.key, 'MMM DD').valueOf() - dayjs(b.key, 'MMM DD').valueOf());
  return result;
};
