export const dataFormats = {
  integer: { decimalPlaces: 0, prefix: '', suffix: '' },
  decimal: { decimalPlaces: 1, prefix: '', suffix: '' },
  currency: { decimalPlaces: 2, prefix: '$', suffix: '' },
  percentage: { decimalPlaces: 1, prefix: '', suffix: '%' },
  multiple: { decimalPlaces: 1, prefix: '', suffix: 'x' },
} as const;

// Helper function to format numbers with truncation
const formatWithTruncation = (value: number, prefix: string, suffix: string, decimalPlaces: number, truncateAt1000: boolean = true): string => {
  const absValue = Math.abs(value);

  if (absValue >= 1000000) {
    return `${prefix}${(value / 1000000).toFixed(1)}M${suffix}`;
  }

  if (truncateAt1000 && absValue >= 1000) {
    return `${prefix}${(value / 1000).toFixed(1)}k${suffix}`;
  }

  return `${prefix}${value.toFixed(decimalPlaces)}${suffix}`;
};

export const chartFormats = {
  integer: (value: number): string => formatWithTruncation(value, '', '', 0, true),

  decimal: (value: number): string => formatWithTruncation(value, '', '', 1, true),

  currency: (value: number): string => formatWithTruncation(value, '$', '', 2, true),

  percentage: (value: number): string => formatWithTruncation(value, '', '%', 1, true),

  multiple: (value: number): string => formatWithTruncation(value, '', 'x', 1, true),
} as const;
