import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateTimePicker } from './DateTimePicker';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/Inputs/Dates/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the date-time picker size',
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
        defaultValue: { summary: "'Pick date and time'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Input label',
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
    withSeconds: {
      control: { type: 'boolean' },
      description: 'Allow picking seconds',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Show clear button when value is set',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    valueFormat: {
      control: { type: 'text' },
      description: 'Format used to display the selected value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'DD/MM/YYYY HH:mm'" },
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
    placeholder: 'Pick date and time',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    showIcon: true,
    withSeconds: false,
    clearable: false,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '360px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `<DateTimePicker
  placeholder="Pick date and time"
  value={selectedDateTime}
  onChange={(value) => setSelectedDateTime(value)}
/>`,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Group gap="20px">
      <DateTimePicker size="sm" />
      <DateTimePicker />
      <DateTimePicker size="lg" />
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
    <Group gap="20px">
      <DateTimePicker label="Normal" />
      <DateTimePicker label="Disabled" disabled />
      <DateTimePicker label="Required" required />
      <DateTimePicker label="With Description" description="Pick both date and time" />
      <DateTimePicker label="With Error" error="This field is required" />
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
    <Group gap="20px">
      <DateTimePicker label="With Icon" placeholder="Pick date and time" showIcon={true} />
      <DateTimePicker label="Without Icon" placeholder="Pick date and time" showIcon={false} />
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

export const WithSeconds: Story = {
  render: () => (
    <DateTimePicker label="Includes seconds" withSeconds placeholder="Pick date and time" />
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
      <DateTimePicker label="Full Width DateTimePicker" placeholder="Pick date and time" fullWidth />
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
    <Group gap="20px">
      <DateTimePicker
        label="Custom Styled"
        placeholder="Pick date and time"
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
      <DateTimePicker
        label="Another Custom Style"
        placeholder="Pick date and time"
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
