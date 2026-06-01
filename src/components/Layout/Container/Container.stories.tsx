import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './Container';
import { Text } from '../../Typography/Text/Text';
import { Stack } from '../Stack/Stack';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Container> = {
  title: 'Components/Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Page or section content constrained to the container max-width',
      table: { type: { summary: 'ReactNode' } },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Max-width preset from the theme',
      table: { type: { summary: 'MantineNumberSize' } },
    },
    fluid: {
      control: { type: 'boolean' },
      description: 'When true, the container grows to full width',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    fluid: false,
    children: (
      <Stack spacing={spacing.md} py={spacing.xl}>
        <Text weight="semibold">Centered content with a max width</Text>
        <Text size="sm" color={neutral[200]}>
          Resize the preview to see horizontal padding and the container cap. Use the size control to change the
          breakpoint preset.
        </Text>
      </Stack>
    ),
    sx: {
      borderLeft: `1px dashed ${neutral[100]}`,
      borderRight: `1px dashed ${neutral[100]}`,
    },
  },
};

export const Fluid: Story = {
  args: {
    fluid: true,
    children: (
      <Stack spacing={spacing.sm} py={spacing.lg}>
        <Text weight="semibold">Fluid container</Text>
        <Text size="sm" color={neutral[200]}>
          With fluid set, content can use the full width of the viewport (aside from default horizontal padding).
        </Text>
      </Stack>
    ),
    sx: {
      backgroundColor: neutral[25],
    },
  },
};
