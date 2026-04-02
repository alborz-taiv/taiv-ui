import {
  Progress as MantineProgress,
  type ProgressProps as MantineProgressProps,
} from '@mantine/core';
import { primary } from '../../../constants/colors';
import type { ProgressDataPoint } from '../../../types';

export interface ProgressProps
  extends Omit<
    MantineProgressProps,
    'animate' | 'style' | 'size' | 'radius' | 'sections'
  > {
  width?: string | number;
  scale?: string;
  cornerRadius?: string;
  data?: ProgressDataPoint[];
}

export const Progress = ({
  width,
  color,
  data,
  scale = 'md',
  cornerRadius = 'md',
  ...rest
}: ProgressProps) => {
  const hasData = Array.isArray(data) && data.length > 0;
  const resolvedColor = !hasData && color === undefined ? primary[200] : color;

  return (
    <MantineProgress
      {...rest}
      radius={cornerRadius}
      size={scale}
      sections={data}
      color={resolvedColor}
      style={width !== undefined ? { width } : undefined}
    />
  );
};
