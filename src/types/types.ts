//TODO: Maybe move these out into separate files whenever it gets more complex

import { truncation } from "../constants";

export type SelectOption = {
  value: string;
  label: string;
};

export type DataPoint = {
  key: string;
  value: string | number;
};

export type PieDataPoint = {
  key: string;
  value: string | number;
  color?: string;
};

export type ChartSeries = {
  name: string;
  data: DataPoint[];
  color?: string;
  type?: 'line' | 'area' | 'bar';
};

export type ChartFormatOptions = {
  truncateAt?: keyof typeof truncation;
  decimalPlaces?: number;
};

export type ProgressDataPoint = {
  value: number;
  color: string;
  label?: string;
  tooltip?: string;
};