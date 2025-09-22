// src/components/Typography/Fraction.tsx
import React from 'react';
import { Box } from '@mantine/core';
import { textStyle } from '../../constants';
import { Text } from './Text';

interface FractionProps {
  numerator: React.ReactNode;
  denominator: React.ReactNode;
  variant: keyof typeof textStyle;
}

const Fraction = ({ numerator, denominator, variant }: FractionProps) => {
  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
      <Box component="span" sx={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
        <Text variant={variant} sx={{ display: 'block', textAlign: 'center' }}>
          {numerator}
        </Text>
        <Box component="span" sx={{ width: '100%', borderTop: '1px solid currentColor', margin: '2px 0' }} />
        <Text variant={variant} sx={{ display: 'block', textAlign: 'center' }}>
          {denominator}
        </Text>
      </Box>
    </Box>
  );
};

export { Fraction };
