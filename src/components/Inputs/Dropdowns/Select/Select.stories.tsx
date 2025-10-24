import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof Select> = {
  title: 'Components/Inputs/Dropdowns/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the select size',
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
        defaultValue: { summary: "'Select an option'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Select label',
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
    clearable: {
      control: { type: 'boolean' },
      description: 'Allow clearing selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Allow searching options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
        type: { summary: '(value: string | null) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  args: {
    label: 'Choose an option',
    data: basicOptions,
    placeholder: 'Select an option',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    clearable: false,
    searchable: false,
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
        code: `<Select
  label="Choose an option"
  value={selectedValue}
  onChange={setSelectedValue}
  data={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ]}
/>`,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <Select size="sm" label="Small Select" data={basicOptions} />
      <Select size="md" label="Medium Select (Default)" data={basicOptions} />
      <Select size="lg" label="Large Select" data={basicOptions} />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Select size="sm" label="Small Select" value={value} onChange={setValue} data={options} />
<Select size="lg" label="Large Select" value={value} onChange={setValue} data={options} />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <Select label="Normal Select" data={basicOptions} placeholder="Select option" />
      <Select label="Disabled Select" data={basicOptions} placeholder="Select option" disabled />
      <Select label="Required Select" data={basicOptions} placeholder="Select option" required />
      <Select label="Select with Description" description="Please choose an option" data={basicOptions} placeholder="Select option" />
      <Select label="Select with Error" error="This field is required" data={basicOptions} placeholder="Select option" />
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

export const WithFeatures: Story = {
  render: () => (
    <Group gap="2rem">
      <Select label="Searchable Select" placeholder="Type to search..." searchable data={countryOptions} />
      <Select label="Clearable Select" data={basicOptions} clearable value="option1" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Select
  label="Searchable Select"
  placeholder="Type to search..."
  searchable
  value={value}
  onChange={setValue}
  data={options}
/>`,
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Select label="Full Width Select" data={basicOptions} placeholder="Select option" fullWidth />
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
      <Select
        label="Custom Styled Select"
        data={basicOptions}
        placeholder="Select option"
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
      <Select
        label="Another Custom Style"
        data={basicOptions}
        placeholder="Select option"
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
