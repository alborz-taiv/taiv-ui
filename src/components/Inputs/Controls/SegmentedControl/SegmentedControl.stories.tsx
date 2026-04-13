import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';
import { Group } from '../../../Layout/Group/Group';
import { Stack } from '../../../Layout/Stack/Stack';
import { spacing } from '../../../../constants/spacing';

const sampleData = [
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'ng' },
  { label: 'Vue', value: 'vue' },
];

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Inputs/Controls/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls segment padding and label font size',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    data: {
      control: { type: 'object' },
      description: 'Segments as strings or { value, label, disabled? } objects',
      table: {
        type: { summary: "string[] | SegmentedControlItem[]" },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Selected segment value (controlled)',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'Default value when uncontrolled',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the entire control',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Stretch to 100% of the container width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of segments',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
      },
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Non-interactive but not visually disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'Active segment color (Mantine color key or CSS color)',
      table: {
        type: { summary: 'MantineColor' },
      },
    },
    radius: {
      control: { type: 'text' },
      description: 'Border radius (theme key or CSS value)',
      table: {
        type: { summary: "MantineNumberSize" },
      },
    },
    transitionDuration: {
      control: { type: 'number' },
      description: 'Transition duration in ms (0 to disable)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    name: {
      control: { type: 'text' },
      description: 'Name attribute for the underlying radio group',
      table: {
        type: { summary: 'string' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object (Mantine Styles API)',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Called with the new value when selection changes',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 'react');
    return <SegmentedControl {...args} data={args.data ?? sampleData} value={value} onChange={setValue} />;
  },
  args: {
    data: sampleData,
    size: 'md',
    disabled: false,
    fullWidth: false,
    orientation: 'horizontal',
    readOnly: false,
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = useState('react');

<SegmentedControl
  data={[
    { label: 'React', value: 'react' },
    { label: 'Angular', value: 'ng' },
    { label: 'Vue', value: 'vue' },
  ]}
  value={value}
  onChange={setValue}
/>`,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={spacing.lg}>
      <SegmentedControl size="sm" data={sampleData} value="react" onChange={() => {}} />
      <SegmentedControl size="md" data={sampleData} value="ng" onChange={() => {}} />
      <SegmentedControl size="lg" data={sampleData} value="vue" onChange={() => {}} />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const StringData: Story = {
  render: () => (
    <SegmentedControl data={['Day', 'Week', 'Month', 'Year']} value="Week" onChange={() => {}} />
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Stack gap={spacing.lg} style={{ minWidth: '280px' }}>
      <SegmentedControl data={sampleData} value="react" onChange={() => {}} />
      <SegmentedControl data={sampleData} value="react" onChange={() => {}} disabled />
      <SegmentedControl
        data={[
          { value: 'preview', label: 'Preview', disabled: true },
          { value: 'code', label: 'Code' },
          { value: 'export', label: 'Export' },
        ]}
        value="code"
        onChange={() => {}}
      />
      <SegmentedControl data={sampleData} value="vue" onChange={() => {}} readOnly />
    </Stack>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '360px', maxWidth: '100%' }}>
      <SegmentedControl fullWidth data={sampleData} value="react" onChange={() => {}} />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const Orientation: Story = {
  render: () => (
    <Group gap={spacing.xxl} align="flex-start">
      <SegmentedControl data={sampleData} value="ng" onChange={() => {}} orientation="horizontal" />
      <SegmentedControl data={sampleData} value="vue" onChange={() => {}} orientation="vertical" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};

export const CustomStyles: Story = {
  render: () => (
    <Group gap="20px">
      <SegmentedControl
        data={sampleData}
        value="react"
        onChange={() => {}}
        styles={{
          root: {
            backgroundColor: '#f0f4f8',
          },
          label: {
            '&:not([data-active])': {
              color: '#495057',
            },
          },
        }}
      />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};
