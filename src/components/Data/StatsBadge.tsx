import React from 'react';
import { Badge, BadgeProps } from '../Info/Badge';
import { formats } from '../../constants/data';

interface StatsBadgeProps extends BadgeProps {
  value: number;
  format?: keyof typeof formats;
  isDelta?: boolean;
}

const StatsBadge = ({ value, format = 'decimal', isDelta = false, ...props }: StatsBadgeProps) => {
  const delta = isDelta ? (value > 0 ? 'positive' : value < 0 ? 'negative' : 'equal') : null;
  const color = delta ? (delta === 'positive' ? 'success' : delta === 'negative' ? 'error' : 'neutral') : 'success';

  const formatValue = (): string => {
    const config = formats[format];
    const formattedNumber = value.toLocaleString('en-US', {
      minimumFractionDigits: config.decimalPlaces,
      maximumFractionDigits: config.decimalPlaces,
    });

    let result = formattedNumber;

    if (delta === 'positive') {
      result = `+${result}`;
    } else if (delta === 'negative') {
      result = `-${result}`;
    }
    result = `${config.prefix}${result}${config.suffix}`;

    return result;
  };
  return (
    <Badge color={color} {...props}>
      {formatValue()}
    </Badge>
  );
};

export { StatsBadge };
