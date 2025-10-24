import type { Meta, StoryObj } from '@storybook/react-vite';
import { AutoComplete } from './AutoComplete';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof AutoComplete> = {
  title: 'Components/Inputs/TextInputs/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the autocomplete size',
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
      description: 'Autocomplete label',
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
    data: {
      control: { type: 'object' },
      description: 'Autocomplete data array',
      table: {
        type: { summary: 'string[] | AutocompleteItem[]' },
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
        type: { summary: '(value: string) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew'];

const countryOptions = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Brazil', 'India', 'China'];

export const Default: Story = {
  args: {
    data: basicOptions,
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
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
        code: `<AutoComplete
  data={['Apple', 'Banana', 'Cherry', 'Date']}
  value={selectedValue}
  onChange={setSelectedValue}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <AutoComplete label="Basic AutoComplete" data={basicOptions} />
      <AutoComplete label="With Placeholder" placeholder="Search fruits..." data={basicOptions} />
      <AutoComplete label="With Description" description="Select your favorite fruit" data={basicOptions} />
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
      <AutoComplete size="sm" label="Small AutoComplete" data={basicOptions} />
      <AutoComplete size="md" label="Medium AutoComplete (Default)" data={basicOptions} />
      <AutoComplete size="lg" label="Large AutoComplete" data={basicOptions} />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AutoComplete size="sm" label="Small AutoComplete" data={options} />
<AutoComplete size="lg" label="Large AutoComplete" data={options} />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <AutoComplete label="Normal AutoComplete" data={basicOptions} />
      <AutoComplete label="Disabled AutoComplete" data={basicOptions} disabled />
      <AutoComplete label="Required AutoComplete" data={basicOptions} required />
      <AutoComplete label="AutoComplete with Description" description="Please select an option" data={basicOptions} />
      <AutoComplete label="AutoComplete with Error" error="This field is required" data={basicOptions} />
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
      <AutoComplete label="Country Search" data={countryOptions} placeholder="Search countries..." />
      <AutoComplete label="Custom Width AutoComplete" width="300px" data={basicOptions} />
      <AutoComplete label="Large Dataset" data={Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`)} placeholder="Search options..." />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<AutoComplete
  label="Country Search"
  data={['United States', 'Canada', 'United Kingdom']}
  placeholder="Search countries..."
  value={selectedCountry}
  onChange={setSelectedCountry}
/>

<AutoComplete
  label="Custom Width AutoComplete"
  width="300px"
  data={options}
  value={selectedValue}
  onChange={setSelectedValue}
/>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <AutoComplete
        label="Custom Styled AutoComplete"
        data={basicOptions}
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
      <AutoComplete
        label="Another Custom Style"
        data={basicOptions}
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
