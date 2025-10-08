export const numberFormats = {
  integer: { decimalPlaces: 0, prefix: '', suffix: '' },
  decimal: { decimalPlaces: 1, prefix: '', suffix: '' },
  currency: { decimalPlaces: 2, prefix: '$', suffix: '' },
  percentage: { decimalPlaces: 1, prefix: '', suffix: '%' },
  multiple: { decimalPlaces: 1, prefix: '', suffix: 'x' },
};

export const formats = {
  string: { decimalPlaces: 0, prefix: '', suffix: '' },
  ...numberFormats,
};

export const truncation = {
  thousand: { threshold: 1000, suffix: 'k' },
  million: { threshold: 1000000, suffix: 'M' },
} as const;
