import React from 'react';
import { Card, CardProps } from '../../Layout/Card';
import { InfoTooltip } from '../../Info/Tooltips/InfoTooltip';
import { Text } from '../../Typography/Text';
import { Title } from '../../Typography/Title';
import { Group } from '../../Layout/Group';
import { Stack } from '../../Layout/Stack';
import { IconBadge } from '../../Misc/IconBadge';
import { primitives, success, neutral } from '../../../constants/colors';
import { formats } from '../../../constants/data';

export interface StatsCardProps extends Omit<CardProps, 'children'> {
  value: number;
  title: string;
  description?: string;
  format?: keyof typeof formats;
  isDelta?: boolean;
  icon?: React.ReactNode;
  iconColor?: keyof typeof primitives;
  tooltip?: React.ReactNode;
  increaseDescription?: string;
}

export const StatsCard = ({ value, format = 'decimal', isDelta = false, title, description, increaseDescription, icon: Icon, iconColor = 'blue', tooltip, ...cardProps }: StatsCardProps) => {
  const getDelta = () => {
    const currentDirection = isDelta ? (value > 0 ? 'positive' : value < 0 ? 'negative' : null) : null;
    return {
      direction: currentDirection,
      color: currentDirection === 'positive' ? success[200] : currentDirection === 'negative' ? neutral[200] : undefined,
      showIncrementalText: currentDirection === 'positive',
    };
  };

  const delta = getDelta();

  const formatValue = (): string => {
    const config = formats[format];
    const formattedNumber = value.toLocaleString('en-US', {
      minimumFractionDigits: config.decimalPlaces,
      maximumFractionDigits: config.decimalPlaces,
    });

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
      <Stack gap="1.6rem">
        <Stack gap="0.25rem">
          <Group position="apart">
            <Title size="3xl" weight="bold">
              {formatValue()}
            </Title>
            {Icon && <IconBadge icon={Icon} color={iconColor} />}
          </Group>
          <Group gap="0.75rem">
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
