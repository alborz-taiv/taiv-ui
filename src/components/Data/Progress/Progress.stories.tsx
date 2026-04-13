import type { Meta, StoryObj } from '@storybook/react-vite';
import { primary, purple, success } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Stack } from '../../Layout/Stack/Stack';
import { Progress } from './Progress';

const presetOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const meta: Meta<typeof Progress> = {
  title: 'Components/Data/Progress',
  component: Progress,
  decorators: [
    (Story) => (
      <div style={{ width: '250px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Horizontal progress bar. **`data`** (`ProgressDataPoint[]`) for multi-part segments; **`value`** / **`color`** for a single fill. Root width: **`width`** (**rem** or **`%`**). Bar thickness and corners: **`scale`** and **`cornerRadius`** (`xs`–`xl` preset strings). **`styles`** for Mantine styling hooks when needed.',
      },
    },
  },
  argTypes: {
    scale: {
      control: { type: 'select' },
      options: [...presetOptions],
      description: 'Bar height on the xs–xl scale',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'md'" },
      },
    },
    cornerRadius: {
      control: { type: 'select' },
      options: [...presetOptions],
      description: 'Corner rounding on the xs–xl scale',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: undefined },
      },
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description:
        'Filled percent (single-bar mode; use `data` for multiple segments)',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    color: {
      control: { type: 'text' },
      description: 'Theme color of the bar (single-bar mode)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary[200]' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Root width (e.g. rem string or percentage)',
      table: {
        type: { summary: 'string | number' },
      },
    },
    data: {
      control: { type: 'object' },
      description: 'Multi-segment bar data',
      table: { type: { summary: 'ProgressDataPoint[]' } },
    },
    striped: {
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Label inside the bar (single-bar mode)',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    scale: 'md',
    cornerRadius: 'md',
    width: undefined,
    striped: false,
    data: undefined,
    label: undefined,
  },
};

export const Values: Story = {
  render: () => (
    <Stack spacing={spacing.md}>
      <Progress value={0} scale="xl" cornerRadius="xl" />
      <Progress value={25} scale="xl" cornerRadius="xl" />
      <Progress value={50} scale="xl" cornerRadius="xl" />
      <Progress value={100} scale="xl" cornerRadius="xl" />
    </Stack>
  ),
};

export const Scale: Story = {
  render: () => (
    <Stack spacing={spacing.md}>
      {presetOptions.map((preset) => (
        <Progress key={preset} value={60} scale={preset} cornerRadius="md" />
      ))}
    </Stack>
  ),
};

export const CornerRadius: Story = {
  render: () => (
    <Stack spacing={spacing.md}>
      {presetOptions.map((radius) => (
        <Progress key={radius} value={60} scale="xl" cornerRadius={radius} />
      ))}
    </Stack>
  ),
};

export const Striped: Story = {
  render: () => (
    <Stack spacing={spacing.md}>
      <Progress value={55} scale="xl" cornerRadius="xl" striped />
    </Stack>
  ),
};

export const WithLabel: Story = {
  args: {
    value: 70,
    scale: 'xl',
    cornerRadius: 'xl',
    label: '70%',
  },
};

export const Data: Story = {
  render: () => (
    <Progress
      scale="xl"
      cornerRadius="xl"
      data={[
        { value: 35, color: primary[200], label: '35%' },
        { value: 25, color: success[200], label: '25%' },
        { value: 30, color: purple[200], label: '30%' },
      ]}
    />
  ),
};

export const WithTooltips: Story = {
  render: () => (
    <Progress
      scale="xl"
      cornerRadius="xl"
      data={[
        {
          value: 40,
          color: primary[200],
          label: '40%',
          tooltip: 'Completed tasks — 40%',
        },
        {
          value: 35,
          color: success[200],
          label: '35%',
          tooltip: 'In progress — 35%',
        },
        {
          value: 25,
          color: purple[200],
          label: '25%',
          tooltip: 'Remaining — 25%',
        },
      ]}
    />
  ),
};

export const Width: Story = {
  args: {
    value: 45,
    scale: 'xl',
    cornerRadius: 'xl',
    width: '240px',
  },
};
