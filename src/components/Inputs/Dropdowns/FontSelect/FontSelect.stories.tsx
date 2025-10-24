import type { Meta, StoryObj } from '@storybook/react-vite';
import { FontSelect } from './FontSelect';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof FontSelect> = {
  title: 'Components/Inputs/Dropdowns/FontSelect',
  component: FontSelect,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the font select size',
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
        defaultValue: { summary: "'Select a font'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Font select label',
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
      description: 'Allow searching fonts',
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

export const Default: Story = {
  args: {
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
        code: `<FontSelect
  value={selectedFont}
  onChange={(value) => setSelectedFont(value)}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <FontSelect label="Default Font Select" />
      <FontSelect
        label="With Custom Data"
        data={[
          { value: 'Arial', label: 'Arial' },
          { value: 'Helvetica', label: 'Helvetica' },
          { value: 'Times New Roman', label: 'Times New Roman' },
          { value: 'Georgia', label: 'Georgia' },
        ]}
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

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <FontSelect size="sm" />
      <FontSelect size="md" />
      <FontSelect size="lg" />
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
      <FontSelect label="Normal Font Select" />
      <FontSelect label="Disabled Font Select" disabled />
      <FontSelect label="Required Font Select" required />
      <FontSelect label="Font Select with Description" description="Choose your preferred font" />
      <FontSelect label="Font Select with Error" error="Please select a font" />
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
      <FontSelect label="Clearable Font Select" clearable value="Poppins" />
      <FontSelect label="Searchable Font Select" searchable />
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

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <FontSelect
        label="Custom Styled Font Select"
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
      <FontSelect
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
