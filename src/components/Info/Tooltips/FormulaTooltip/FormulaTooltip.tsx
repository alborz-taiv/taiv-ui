import React from 'react';
import { Box } from '../../../Layout/Box/Box';
import { Text } from '../../../Typography/Text/Text';
import { Formula } from '../../../Typography/Formula/Formula';
import { Stack } from '../../../Layout/Stack/Stack';
import { blue } from '../../../../constants/colors';
import { Center } from '../../../Layout/Center/Center';

interface FormulaTooltipProps {
  title: string;
  description: string;
  expression: string;
}

const FormulaTooltip = ({ title, description, expression }: FormulaTooltipProps) => {
  return (
    <Box p="8px">
      <Stack gap="16px">
        <Stack gap="8px" sx={{ maxWidth: '500px' }}>
          <Text weight="semibold">{title}</Text>
          <Text variant="label">{description}</Text>
        </Stack>
        <div style={{ padding: '16px 24px', borderRadius: '16px', backgroundColor: blue[25], width: '100%' }}>
          <Center>
            <Formula expression={expression} color={blue[300]} />
          </Center>
        </div>
      </Stack>
    </Box>
  );
};

export { FormulaTooltip };
