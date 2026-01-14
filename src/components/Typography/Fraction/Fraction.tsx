import React from 'react';
import { Divider } from '../../Layout/Divider/Divider';
import { textStyle } from '../../../constants';
import { Text } from '../Text/Text';
import { Stack } from '../../Layout/Stack/Stack';
import { TextProps } from '../Text/Text';

interface FractionProps extends Omit<TextProps, 'children' | 'styles'> {
  numerator: React.ReactNode;
  denominator: React.ReactNode;
}

const Fraction = ({ numerator, denominator, variant = 'body', color, weight, size }: FractionProps) => {
  const selectedVariant = textStyle[variant];
  return (
    <Stack sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }} gap="0.25rem">
      <Text variant={variant} color={color} weight={weight} size={size} sx={{ display: 'block', textAlign: 'center' }}>
        {numerator}
      </Text>
      <Divider color={color || selectedVariant.color} width="100%" />
      <Text variant={variant} color={color} weight={weight} size={size} sx={{ display: 'block', textAlign: 'center' }}>
        {denominator}
      </Text>
    </Stack>
  );
};

export { Fraction };
