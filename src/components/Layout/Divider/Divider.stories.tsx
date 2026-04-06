import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Text } from '../../Typography/Text/Text';
import { Stack } from '../Stack/Stack';
import { neutral } from '../../../constants';

const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider (WIP)',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Thickness of the divider',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number" },
        defaultValue: { summary: "'md'" },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the divider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral[50]' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width override',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'100%'" },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles override - use this sparingly',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: undefined,
    color: undefined,
    width: undefined,
    orientation: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Stack>
      <Text>Content above</Text>
      <Divider {...args} />
      <Text>Content below</Text>
    </Stack>
  ),
};