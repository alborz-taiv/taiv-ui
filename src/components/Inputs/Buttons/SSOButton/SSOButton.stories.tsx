import type { Meta, StoryObj } from '@storybook/react-vite';
import { SSOButton } from './SSOButton';
import { Group } from '../../../Layout/Group/Group';
import { Stack } from '../../../Layout/Stack/Stack';
import { IconBrandApple, IconBrandGithub, IconBrandWindows } from '@tabler/icons-react';
import { GoogleIcon } from '../../../../assets/icons';

const meta: Meta<typeof SSOButton> = {
  title: 'Components/Inputs/Buttons/SSOButton',
  component: SSOButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sign-in button for third-party authentication providers. Use the `provider` shorthand for built-in providers, or pass `providerName` and `providerIcon` for any custom provider.',
      },
    },
  },
  argTypes: {
    provider: {
      control: { type: 'select' },
      options: ['google'],
      description: 'Shorthand — resolves the provider name and icon automatically',
      table: {
        type: { summary: "'google'" },
      },
    },
    providerName: {
      control: { type: 'text' },
      description: 'Display name of the provider. Overrides provider lookup.',
      table: {
        type: { summary: 'string' },
      },
    },
    providerIcon: {
      control: false,
      description: 'Provider icon rendered to the left of the label. Overrides provider lookup.',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: "Controls the button's height, padding, and font size",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Custom label. Defaults to "Continue with {providerName}"',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the button span the full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    loading: {
      control: { type: 'boolean' },
      description: 'Indicate loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SSOButton>;

export const Default: Story = {
  args: {
    provider: 'google',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    onClick: () => {},
  },
};

export const BuiltInProvider: Story = {
  render: () => (
    <Stack gap="1.2rem">
      <SSOButton provider="google" />
    </Stack>
  ),
};

export const CustomProviders: Story = {
  render: () => (
    <Stack gap="1.2rem">
      <SSOButton providerName="Apple" providerIcon={<IconBrandApple size={18} />} />
      <SSOButton providerName="GitHub" providerIcon={<IconBrandGithub size={18} />} />
      <SSOButton providerName="Microsoft" providerIcon={<IconBrandWindows size={18} />} />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap="1.6rem" align="center">
      <SSOButton provider="google" size="sm" />
      <SSOButton provider="google" size="md" />
      <SSOButton provider="google" size="lg" />
    </Group>
  ),
};

export const States: Story = {
  render: () => (
    <Group gap="1.6rem">
      <SSOButton provider="google" />
      <SSOButton provider="google" disabled />
      <SSOButton provider="google" loading />
    </Group>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <Stack gap="1.2rem">
      <SSOButton provider="google">Sign in with Google</SSOButton>
      <SSOButton providerName="Apple" providerIcon={<IconBrandApple size={18} />}>Sign in with Apple</SSOButton>
    </Stack>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Stack gap="1.2rem">
        <SSOButton provider="google" fullWidth />
        <SSOButton providerName="Apple" providerIcon={<IconBrandApple size={18} />} fullWidth />
        <SSOButton providerName="GitHub" providerIcon={<IconBrandGithub size={18} />} fullWidth />
      </Stack>
    </div>
  ),
};

export const ProviderOverride: Story = {
  render: () => (
    <Stack gap="1.2rem">
      <SSOButton provider="google" providerIcon={<GoogleIcon size={24} />}>
        Custom icon size override
      </SSOButton>
    </Stack>
  ),
};
