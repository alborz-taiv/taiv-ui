import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './Box';
import { Stack } from '../Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Box> = {
  title: 'Components/Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Content to render inside the Box',
      table: { type: { summary: 'ReactNode' } },
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width',
      table: { type: { summary: 'string | number' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: { type: { summary: '() => void' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box is a styled div — use it as a wrapper or for custom styling',
    sx: {
      backgroundColor: neutral[50],
      padding: spacing.xl,
      borderRadius: '8px',
    },
  },
};

export const BoxStyling: Story = {
  render: () => (
    <Box
      sx={{
        backgroundColor: neutral[25],
        padding: spacing.xl,
        borderRadius: '8px',
        border: `1px dashed ${neutral[100]}`,
      }}
    >
      <Text weight="semibold">This is a box that has been styled</Text>
    </Box>
  ),
  parameters: {
    docs: { source: { code: false } },
  },
};
