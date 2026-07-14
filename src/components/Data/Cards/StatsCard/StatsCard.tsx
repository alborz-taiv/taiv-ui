import React from 'react';
import { Card, CardProps } from '../../../Layout/Card/Card';
import { InfoTooltip } from '../../../Info/Tooltips/InfoTooltip/InfoTooltip';
import { Text } from '../../../Typography/Text/Text';
import { Title } from '../../../Typography/Title/Title';
import { Group } from '../../../Layout/Group/Group';
import { Stack } from '../../../Layout/Stack/Stack';
import { IconBadge } from '../../../Misc/IconBadge/IconBadge';
import { primitives, success, neutral } from '../../../../constants/colors';
import { formats, truncation } from '../../../../constants/data';
import { spacing } from '../../../../constants/spacing';

export interface StatsCardProps extends Omit<CardProps, 'children'> {
  value: number | string;
  valueColor?: string;
  title: string;
  description?: string;
  format?: keyof typeof formats;
  isDelta?: boolean;
  icon?: React.ReactNode;
  iconColor?: keyof typeof primitives;
  tooltip?: React.ReactNode;
  increaseDescription?: string;
  truncateAt?: keyof typeof truncation;
}

export const StatsCard = ({ value, valueColor, format = 'decimal', isDelta = false, title, description, increaseDescription, icon: Icon, iconColor = 'blue', tooltip, truncateAt, ...cardProps }: StatsCardProps) => {
  const getDelta = () => {
    const currentDirection = isDelta && typeof value === 'number' ? (value > 0 ? 'positive' : value < 0 ? 'negative' : null) : null;
    return {
      direction: currentDirection,
      color: currentDirection === 'positive' ? success[200] : currentDirection === 'negative' ? neutral[200] : undefined,
      showIncrementalText: currentDirection === 'positive',
    };
  };

  const delta = getDelta();

  const formatValue = (): string => {
    // String values are display text (e.g. a status word) — render verbatim,
    // no number formatting, truncation, or delta prefix.
    if (typeof value === 'string') return value;

    const config = formats[format];

    let formattedNumber: string;
    if (truncateAt && value >= truncation[truncateAt].threshold) {
      const truncConfig = truncation[truncateAt];
      formattedNumber = `${(value / truncConfig.threshold).toFixed(1)}${truncConfig.suffix}`;
    } else {
      formattedNumber = value.toLocaleString('en-US', {
        minimumFractionDigits: config.decimalPlaces,
        maximumFractionDigits: config.decimalPlaces,
      });
    }

    let result = formattedNumber;

    if (delta.direction === 'positive') {
      result = `+${result}`;
    } else if (delta.direction === 'negative') {
      result = `-${result}`;
    }
    result = `${config.prefix}${result}${config.suffix}`;

    return result;
  };

  return (
    <Card bg={neutral[25]} animate {...cardProps}>
      <Stack gap={spacing.lg}>
        <Stack gap={spacing.xxs}>
          <Group position="apart">
            <Title size="3xl" weight="bold" color={valueColor}>
              {formatValue()}
            </Title>
            {Icon && <IconBadge icon={Icon} color={iconColor} />}
          </Group>
          <Group gap={spacing.sm}>
            <Title variant="cardHeader" color="#6D6D6D" weight="medium">
              {title}
            </Title>
            {tooltip && <InfoTooltip text={tooltip} maxWidth="600px" />}
          </Group>
        </Stack>

        <Stack gap="0">
          {description && <Text variant="label">{description}</Text>}
          {delta.showIncrementalText && increaseDescription && (
            <Text variant="label" color={delta.color}>
              {increaseDescription}
            </Text>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
