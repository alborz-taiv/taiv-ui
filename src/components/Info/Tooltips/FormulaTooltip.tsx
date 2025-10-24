import React from 'react';
import { Box } from '../../Layout/Box/Box';
import { Text } from '../../Typography/Text';
import { Formula } from '../../Typography/Formula';
import { Stack } from '../../Layout/Stack/Stack';
import { blue } from '../../../constants/colors';
import { Center } from '../../Layout/Center/Center';

interface FormulaTooltipProps {
  title: string;
  description: string;
  expression: string;
}

const FormulaTooltip = ({ title, description, expression }: FormulaTooltipProps) => {
  return (
    <Box p="0.8rem">
      <Stack gap="1.6rem">
        <Stack gap="0.8rem" sx={{ maxWidth: '375px' }}>
          <Text weight="semibold">{title}</Text>
          <Text variant="label">{description}</Text>
        </Stack>
        <div style={{ padding: '1.6rem 2.4rem', borderRadius: '16px', backgroundColor: blue[25], width: '100%' }}>
          <Center>
            <Formula expression={expression} color={blue[300]} />
          </Center>
        </div>
      </Stack>
    </Box>
  );
};

export { FormulaTooltip };
