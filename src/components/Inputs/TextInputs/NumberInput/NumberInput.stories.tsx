import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInput } from './NumberInput';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof NumberInput> = {
  title: 'Components/Inputs/TextInputs/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the number input size',
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
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Number input label',
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
    width: {
      control: { type: 'text' },
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
      table: {
        type: { summary: 'number' },
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
      table: {
        type: { summary: 'number' },
      },
    },
    step: {
      control: { type: 'number' },
      description: 'Step value for increment/decrement',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    precision: {
      control: { type: 'number' },
      description: 'Number of decimal places',
      table: {
        type: { summary: 'number' },
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
        type: { summary: '(value: number | string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    step: 1,
    min: 0,
    max: 120,
  },
  parameters: {
    docs: {
      source: {
        code: `<NumberInput
  label="Age"
  placeholder="Enter your age"
  min={0}
  max={120}
  step={1}
  value={age}
  onChange={setAge}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <NumberInput label="Basic Number Input" />
      <NumberInput label="With Placeholder" placeholder="Enter a value" />
      <NumberInput label="With Description" description="Enter a value between 0 and 100" min={0} max={100} />
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

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <NumberInput size="sm" label="Small Number Input" placeholder="Small value" />
      <NumberInput size="md" label="Medium Number Input (Default)" placeholder="Medium value" />
      <NumberInput size="lg" label="Large Number Input" placeholder="Large value" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<NumberInput size="sm" label="Small Number Input" placeholder="Small value" />
<NumberInput size="lg" label="Large Number Input" placeholder="Large value" />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <NumberInput label="Normal Number Input" />
      <NumberInput label="Disabled Number Input" disabled />
      <NumberInput label="Required Number Input" required />
      <NumberInput label="Number Input with Description" description="Please enter a numeric value" />
      <NumberInput label="Number Input with Error" error="Value is required" />
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

export const AdditionalFunctionality: Story = {
  render: () => (
    <Group gap="2rem">
      <NumberInput label="Step of 1" placeholder="Integer values" step={1} />
      <NumberInput label="Step of 0.5" placeholder="Decimal values" step={0.5} precision={1} />
      <NumberInput label="With Min/Max" placeholder="Between 0 and 10" min={0} max={10} step={1} />
      <NumberInput label="Custom Width" placeholder="Custom width" width="300px" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<NumberInput
  label="Step of 0.5"
  placeholder="Decimal values"
  step={0.5}
  precision={1}
  value={amount}
  onChange={setAmount}
/>

<NumberInput
  label="With Min/Max"
  placeholder="Between 0 and 10"
  min={0}
  max={10}
  step={1}
  value={count}
  onChange={setCount}
/>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <NumberInput
        label="Custom Styled Number Input"
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
      <NumberInput
        label="Another Custom Style"
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
