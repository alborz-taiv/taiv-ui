import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from './TextInput';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Inputs/TextInputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the text input size',
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
      description: 'Text input label',
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
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'text'" },
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
        type: { summary: '(event: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    type: 'text',
  },
  parameters: {
    docs: {
      source: {
        code: `<TextInput
  label="Full Name"
  placeholder="Enter your full name"
  value={name}
  onChange={(event) => setName(event.currentTarget.value)}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <TextInput label="Basic Text Input" />
      <TextInput label="With Placeholder" placeholder="Enter your text here" />
      <TextInput label="With Description" description="This is a description" />
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
      <TextInput size="sm" label="Small Input" placeholder="Small text input" />
      <TextInput size="md" label="Medium Input (Default)" placeholder="Medium text input" />
      <TextInput size="lg" label="Large Input" placeholder="Large text input" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TextInput size="sm" label="Small Input" placeholder="Small text input" />
<TextInput size="lg" label="Large Input" placeholder="Large text input" />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <TextInput label="Normal Text Input" />
      <TextInput label="Disabled Text Input" disabled />
      <TextInput label="Required Text Input" required />
      <TextInput label="Text Input with Description" description="Please enter your information" />
      <TextInput label="Text Input with Error" error="This field is required" />
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
      <TextInput label="Email Address" description="We'll never share your email" placeholder="your@email.com" type="email" />
      <TextInput label="Password" type="password" placeholder="Enter password" error="Password must be at least 8 characters" />
      <TextInput label="Custom Width" placeholder="Custom width input" width="300px" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TextInput
  label="Email Address"
  description="We'll never share your email"
  placeholder="your@email.com"
  type="email"
  value={email}
  onChange={handleEmailChange}
/>

<TextInput
  label="Password"
  type="password"
  placeholder="Enter password"
  error="Password must be at least 8 characters"
  value={password}
  onChange={handlePasswordChange}
/>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <TextInput
        label="Custom Styled Text Input"
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
      <TextInput
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
