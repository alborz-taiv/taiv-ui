import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import { Text } from '../../Typography/Text/Text';
import { Card } from '../Card/Card';
import { Group } from '../Group/Group';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Stack> = {
  title: 'Components/Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content to arrange within the stack',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    justify: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Vertical alignment',
      table: {
        type: { summary: "'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'" },
        defaultValue: { summary: "'flex-start'" },
      },
    },
    align: {
      control: { type: 'select' },
      options: ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
      description: 'Horizontal alignment',
      table: {
        type: { summary: "'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline'" },
        defaultValue: { summary: "'stretch'" },
      },
    },
    gap: {
      control: { type: 'text' },
      description: 'Spacing between items',
      table: {
        type: { summary: 'string' },
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
      description: 'Custom height override',
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
  <Card>
    <Text weight="bold">{label}</Text>
  </Card>
);

export const Default: Story = {
  args: {
    children: undefined,
    justify: undefined,
    align: undefined,
    gap: undefined,
    h: undefined,
    width: undefined,
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
    <Stack {...args}>
      <SampleCard label="Item 1" />
      <SampleCard label="Item 2" />
      <SampleCard label="Item 3" />
    </Stack>
  ),
};

export const PositionContent: Story = {
  render: () => (
    <Stack gap={spacing.lg} justify="flex-start">
      <Group>
        {(['flex-start', 'center', 'space-between'] as const).map((val) => (
          <div key={val}>
            <Text variant="label" mb={spacing.sm}><code>justify={'"' + val + '"'}</code></Text>
            <Stack justify={val} spacing={spacing.sm} sx={{ height: '200px', width: '200px', border: `1px dashed ${neutral[50]}`, padding: spacing.xs }}>
              <SampleCard label="A" />
              <SampleCard label="B" />
            </Stack>
          </div>
        ))}
      </Group>
    </Stack>
  ),
};