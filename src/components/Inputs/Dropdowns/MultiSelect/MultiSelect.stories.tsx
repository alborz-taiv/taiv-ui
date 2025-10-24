import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from './MultiSelect';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Inputs/Dropdowns/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the multi select size',
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
        defaultValue: { summary: "'Select options'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Multi select label',
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
      description: 'Allow clearing all selections',
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
        defaultValue: { summary: 'true' },
      },
    },
    maxSelectedValues: {
      control: { type: 'number' },
      description: 'Maximum number of selected values',
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
        type: { summary: '(value: string[]) => void' },
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
  { value: 'option5', label: 'Option 5' },
];

const tagOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
];

export const Default: Story = {
  args: {
    label: 'Choose multiple options',
    data: basicOptions,
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    clearable: false,
    searchable: true,
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
        code: `<MultiSelect
  label="Choose multiple options"
  value={selectedValues}
  onChange={setSelectedValues}
  data={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ]}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <MultiSelect label="Basic Multi Select" data={basicOptions} />
      <MultiSelect label="Tag Selection" data={tagOptions} placeholder="Select technologies" />
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
      <MultiSelect size="sm" label="Small MultiSelect" data={basicOptions} />
      <MultiSelect size="md" label="Medium MultiSelect (Default)" data={basicOptions} />
      <MultiSelect size="lg" label="Large MultiSelect" data={basicOptions} />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<MultiSelect size="sm" label="Small MultiSelect" value={values} onChange={setValues} data={options} />
<MultiSelect size="lg" label="Large MultiSelect" value={values} onChange={setValues} data={options} />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <MultiSelect label="Normal Multi Select" data={basicOptions} />
      <MultiSelect label="Disabled Multi Select" data={basicOptions} disabled />
      <MultiSelect label="Required Multi Select" data={basicOptions} required />
      <MultiSelect label="Multi Select with Description" description="Select multiple options" data={basicOptions} />
      <MultiSelect label="Multi Select with Error" error="Please select at least one option" data={basicOptions} />
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
      <MultiSelect label="Tags" placeholder="Add or select tags" creatable clearable data={tagOptions} />
      <MultiSelect label="Limited Selection" data={basicOptions} maxSelectedValues={3} placeholder="Max 3 selections" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<MultiSelect
  label="Tags"
  placeholder="Add or select tags"
  creatable
  clearable
  value={tags}
  onChange={setTags}
  data={existingTags}
/>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <MultiSelect
        label="Custom Styled Multi Select"
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
          value: {
            backgroundColor: '#ff6b6b',
            color: 'white',
          },
        }}
      />
      <MultiSelect
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
          value: {
            backgroundColor: '#4CAF50',
            color: 'white',
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
