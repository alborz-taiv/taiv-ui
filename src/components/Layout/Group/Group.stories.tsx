import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from './Group';
import { Text } from '../../Typography/Text/Text';
import { Card } from '../Card/Card';
import { Stack } from '../Stack/Stack';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Group> = {
  title: 'Components/Layout/Group',
  component: Group,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content to arrange horizontally',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'apart'],
      description: 'Horizontal alignment of children',
      table: {
        type: { summary: "'left' | 'center' | 'right' | 'apart'" },
        defaultValue: { summary: "'left'" },
      },
    },
    align: {
      control: { type: 'select' },
      options: ['stretch', 'center', 'flex-start', 'flex-end'],
      description: 'Vertical alignment of children',
      table: {
        type: { summary: "'stretch' | 'center' | 'flex-start' | 'flex-end'" },
        defaultValue: { summary: "'stretch'" },
      },
    },
    gap: {
      control: { type: 'text' },
      description: 'Spacing between items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '16px' },
      },
    },
    noWrap: {
      control: { type: 'boolean' },
      description: 'Prevent items from wrapping to new lines',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    grow: {
      control: { type: 'boolean' },
      description: 'Whether children grow to fill available space',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width override',
      table: {
        type: { summary: 'string | number' },
      },
    },
    h: {
      control: { type: 'text' },
      description: 'Custom height override - use this sparingly',
      table: {
        type: { summary: 'string | number' },
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

const SampleCard = ({ label }: { label: string }) => (
  <Card styles={{ root: { overflow: 'hidden' } }}>
    <Text truncate="end" weight="bold">{label}</Text>
  </Card>
);

export const Default: Story = {
  args: {
    children: undefined,
    gap: undefined,
    position: undefined,
    align: undefined,
    grow: false,
    noWrap: false,
    width: undefined,
    h: undefined,
    styles: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', backgroundColor: neutral[25], padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Group {...args}>
      <SampleCard label="Item 1" />
      <SampleCard label="Item 2" />
      <SampleCard label="Item 3" />
    </Group>
  ),
};

export const PositionAlign: Story = {
  render: () => (
    <Stack spacing={spacing.md} sx={{ width: '500px' }}>
      {(['left', 'center', 'right', 'apart'] as const).map((pos) => (
        <div key={pos}>
          <Text variant="label" mb={spacing.sm}><code>position={'"' + pos + '"'}</code></Text>
          <Group position={pos} spacing={spacing.sm} sx={{ backgroundColor: neutral[25], padding: spacing.xs }}>
            <SampleCard label="A" />
            <SampleCard label="B" />
          </Group>
        </div>
      ))}
    </Stack>
  ),
};

export const WrapItems: Story = {
  render: () => (
    <Stack gap="40px">
      <div>
        <Text variant="label" mb={spacing.sm}><code>noWrap={'{false}'}</code> (default, will continue to grow vertically)</Text>
        <Group sx={{ backgroundColor: neutral[25], padding: spacing.xs, width: '250px' }}>
          <SampleCard label="First" />
          <SampleCard label="Second" />
          <SampleCard label="Third" />
          <SampleCard label="Fourth" />
        </Group>
      </div>
      <div>
        <Text variant="label" mb={spacing.sm}><code>noWrap={'{true}'}</code>, combined with <code>overflow='hidden'</code> on the card and <code>truncate='end'</code> on the text</Text>
        <Group noWrap spacing={spacing.sm} sx={{ backgroundColor: neutral[25], padding: spacing.xs, width: '250px' }}>
          <SampleCard label="First" />
          <SampleCard label="Second" />
          <SampleCard label="Third" />
          <SampleCard label="Fourth" />
        </Group>
      </div>
    </Stack>
  ),
};

export const GrowItems: Story = {
  render: () => (
    <div>
    <Text variant="label" mb={spacing.sm}><code>grow={'{true}'}</code></Text>
    <Group grow spacing={spacing.sm} sx={{ backgroundColor: neutral[25], padding: spacing.xs, width: '400px' }}>
      <SampleCard label="A" />
      <SampleCard label="B" />
    </Group>
  </div>
  ),
};