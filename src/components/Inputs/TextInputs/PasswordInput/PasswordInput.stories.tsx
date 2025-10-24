import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './PasswordInput';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Inputs/TextInputs/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the password input size',
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
        defaultValue: { summary: "'Enter password'" },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Password input label',
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
    visible: {
      control: { type: 'boolean' },
      description: 'Controlled visibility state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultVisible: {
      control: { type: 'boolean' },
      description: 'Default visibility state',
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
        type: { summary: '(event: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onVisibilityChange: {
      action: 'visibility changed',
      description: 'Visibility change handler',
      table: {
        type: { summary: '(visible: boolean) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Password',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    defaultVisible: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<PasswordInput
  label="Password"
  value={password}
  onChange={(event) => setPassword(event.currentTarget.value)}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <PasswordInput label="Basic Password Input" />
      <PasswordInput label="With Placeholder" placeholder="Enter your password" />
      <PasswordInput label="With Description" description="Password must be at least 8 characters" />
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
      <PasswordInput size="sm" label="Small Password" placeholder="Enter password" />
      <PasswordInput size="md" label="Medium Password (Default)" placeholder="Enter password" />
      <PasswordInput size="lg" label="Large Password" placeholder="Enter password" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<PasswordInput size="sm" label="Small Password" placeholder="Enter password" />
<PasswordInput size="lg" label="Large Password" placeholder="Enter password" />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <PasswordInput label="Normal Password Input" />
      <PasswordInput label="Disabled Password Input" disabled />
      <PasswordInput label="Required Password Input" required />
      <PasswordInput label="Password Input with Description" description="Password must be at least 8 characters" />
      <PasswordInput label="Password Input with Error" error="Password is too short" />
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
      <PasswordInput label="New Password" description="Password must be at least 8 characters" placeholder="Create a strong password" />
      <PasswordInput label="Confirm Password" placeholder="Re-enter password" error="Passwords do not match" />
      <PasswordInput label="Custom Width Password" width="300px" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<PasswordInput
  label="New Password"
  description="Password must be at least 8 characters"
  placeholder="Create a strong password"
  value={newPassword}
  onChange={handleNewPassword}
/>

<PasswordInput
  label="Confirm Password"
  placeholder="Re-enter password"
  value={confirmPassword}
  onChange={handleConfirmPassword}
  error="Passwords do not match"
/>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <PasswordInput
        label="Custom Styled Password Input"
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
          visibilityToggle: {
            color: '#ff6b6b',
          },
        }}
      />
      <PasswordInput
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
          visibilityToggle: {
            color: '#4CAF50',
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
