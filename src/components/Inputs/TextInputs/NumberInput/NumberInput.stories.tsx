import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from '../../../Layout/Group/Group';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = {
  argTypes: {
    description: {
      control: { type: 'text' },
      description: 'Description text',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    error: {
      control: { type: 'text' },
      description: 'Error message',
      table: {
        type: { summary: 'string' },
      },
    },
    exposed: {
      control: { type: 'boolean' },
      description: 'Shows external increment/decrement buttons',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width of container',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Number input label',
      table: {
        type: { summary: 'string' },
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
      table: {
        type: { summary: 'number' },
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
      table: {
        type: { summary: 'number' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
      table: {
        type: { summary: '(value: number | string) => void' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    precision: {
      control: { type: 'number' },
      description: 'Number of decimal places',
      table: {
        type: { summary: 'number' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'select' },
      description: 'Controls the number input size',
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: "'md'" },
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    step: {
      control: { type: 'number' },
      description: 'Step value for increment/decrement',
      table: {
        defaultValue: { summary: '1' },
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
    width: {
      control: { type: 'text' },
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Inputs/TextInputs/NumberInput',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    fullWidth: false,
    label: 'Age',
    max: 120,
    min: 0,
    placeholder: 'Enter your age',
    required: false,
    size: 'md',
    step: 1,
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
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <NumberInput label='Basic Number Input' />
      <NumberInput label='With Placeholder' placeholder='Enter a value' />
      <NumberInput
        description='Enter a value between 0 and 100'
        label='With Description'
        max={100}
        min={0}
      />
      <NumberInput exposed label='Exposed'  />
    </Group>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `<NumberInput size="sm" label="Small Number Input" placeholder="Small value" />
<NumberInput size="lg" label="Large Number Input" placeholder="Large value" />`,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <NumberInput
        label='Small Number Input'
        placeholder='Small value'
        size='sm'
      />
      <NumberInput
        label='Medium Number Input (Default)'
        placeholder='Medium value'
        size='md'
      />
      <NumberInput
        label='Large Number Input'
        placeholder='Large value'
        size='lg'
      />
    </Group>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <NumberInput label='Normal Number Input' />
      <NumberInput disabled label='Disabled Number Input' />
      <NumberInput label='Required Number Input' required />
      <NumberInput
        description='Please enter a numeric value'
        label='Number Input with Description'
      />
      <NumberInput error='Value is required' label='Number Input with Error' />
    </Group>
  ),
};

export const AdditionalFunctionality: Story = {
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
  render: () => (
    <Group gap='20px'>
      <NumberInput label='Step of 1' placeholder='Integer values' step={1} />
      <NumberInput
        label='Step of 0.5'
        placeholder='Decimal values'
        precision={1}
        step={0.5}
      />
      <NumberInput
        label='With Min/Max'
        max={10}
        min={0}
        placeholder='Between 0 and 10'
        step={1}
      />
      <NumberInput
        label='Custom Width'
        placeholder='Custom width'
        width='3000px'
      />
    </Group>
  ),
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <NumberInput
        label='Custom Styled Number Input'
        styles={{
          input: {
            '&:focus': {
              borderColor: '#ff6b6b',
              boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.2)',
            },
            borderColor: '#ff6b6b',
          },
          label: {
            color: '#ff6b6b',
            fontWeight: 600,
          },
        }}
      />
      <NumberInput
        label='Another Custom Style'
        styles={{
          input: {
            '&:focus': {
              borderColor: '#4CAF50',
              boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
            },
            backgroundColor: '#f8f9fa',
            borderColor: '#4CAF50',
          },
          label: {
            color: '#4CAF50',
            fontSize: '16px',
          },
        }}
      />
    </Group>
  ),
};
