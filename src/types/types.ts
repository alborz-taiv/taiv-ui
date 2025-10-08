//TODO: Maybe move these out into separate files whenever it gets more complex

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
