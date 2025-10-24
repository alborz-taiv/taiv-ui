import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';
import { Group } from '../../../Layout/Group/Group';
import { useState } from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Inputs/Dates/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the date picker size',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Pick a date'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Date picker label',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description text',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: { type: 'text' },
      description: 'Error message',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width of container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Show calendar icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
      table: {
        type: { summary: '(value: Date | null) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Pick Date',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    showIcon: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '220px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  placeholder="Pick Date"
  value={selectedDate}
  onChange={(value) => setSelectedDate(value)}
/>`,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <DatePicker size="sm" />
      <DatePicker />
      <DatePicker size="lg" />
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

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <DatePicker label="Normal DatePicker" />
      <DatePicker label="Disabled DatePicker" disabled />
      <DatePicker label="Required DatePicker" required />
      <DatePicker label="DatePicker with Description" description="Please select your preferred date" />
      <DatePicker label="DatePicker with Error" error="This field is required" />
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

export const WithAndWithoutIcon: Story = {
  render: () => (
    <Group gap="2rem">
      <DatePicker label="With Icon" placeholder="Select date" showIcon={true} />
      <DatePicker label="Without Icon" placeholder="Select date" showIcon={false} />
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

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <DatePicker label="Full Width DatePicker" placeholder="Select date" fullWidth />
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

export const CustomStyles: Story = {
  render: () => (
    <Group gap="2rem">
      <DatePicker
        label="Custom Styled DatePicker"
        placeholder="Select date"
        styles={{
          input: {
            borderColor: '#ff6b6b',
            '&:focus': {
              borderColor: '#ff6b6b',
              boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.2)',
            },
          },
          label: {
            color: '#ff6b6b',
            fontWeight: 600,
          },
        }}
      />
      <DatePicker
        label="Another Custom Style"
        placeholder="Select date"
        styles={{
          input: {
            backgroundColor: '#f8f9fa',
            borderColor: '#4CAF50',
            '&:focus': {
              borderColor: '#4CAF50',
              boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
            },
          },
          label: {
            color: '#4CAF50',
            fontSize: '16px',
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
