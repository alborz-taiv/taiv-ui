import type { Meta, StoryObj } from '@storybook/react-vite';
import { SSOButton } from './SSOButton';
import { Group } from '../../../Layout/Group/Group';
import { Stack } from '../../../Layout/Stack/Stack';
import { IconBrandGoogle, IconBrandApple, IconBrandGithub, IconBrandWindows } from '@tabler/icons-react';

const meta: Meta<typeof SSOButton> = {
  title: 'Components/Inputs/Buttons/SSOButton',
  component: SSOButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sign-in button for third-party authentication providers. Pass any provider name and icon — the component handles the outlined styling and default label.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'text' },
      description: 'Display name of the provider (used in the default label)',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Provider icon rendered to the left of the label',
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
      description: 'Custom label. Defaults to "Continue with {name}"',
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
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Google',
    icon: <IconBrandGoogle size={18} />,
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    onClick: () => {},
  },
};

export const Providers: Story = {
  render: () => (
    <Stack gap="1.2rem">
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} />
      <SSOButton name="Apple" icon={<IconBrandApple size={18} />} />
      <SSOButton name="GitHub" icon={<IconBrandGithub size={18} />} />
      <SSOButton name="Microsoft" icon={<IconBrandWindows size={18} />} />
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap="1.6rem" align="center">
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} size="sm" />
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} size="md" />
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} size="lg" />
    </Group>
  ),
};

export const States: Story = {
  render: () => (
    <Group gap="1.6rem">
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} />
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} disabled />
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} loading />
    </Group>
  ),
};

export const CustomLabels: Story = {
  render: () => (
    <Stack gap="1.2rem">
      <SSOButton name="Google" icon={<IconBrandGoogle size={18} />}>Sign in with Google</SSOButton>
      <SSOButton name="Apple" icon={<IconBrandApple size={18} />}>Sign in with Apple</SSOButton>
    </Stack>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Stack gap="1.2rem">
        <SSOButton name="Google" icon={<IconBrandGoogle size={18} />} fullWidth />
        <SSOButton name="Apple" icon={<IconBrandApple size={18} />} fullWidth />
        <SSOButton name="GitHub" icon={<IconBrandGithub size={18} />} fullWidth />
      </Stack>
    </div>
  ),
};

export const CustomStyles: Story = {
  args: {
    name: 'Google',
    icon: <IconBrandGoogle size={18} color="#4285F4" />,
    styles: {
      root: {
        borderRadius: '20px',
        border: '1px solid #4285F4',
        '&:hover': {
          background: '#F8FAFE',
          border: '1px solid #4285F4',
        },
      },
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<SSOButton
  name="Google"
  icon={<IconBrandGoogle size={18} color="#4285F4" />}
  styles={{
    root: {
      borderRadius: '20px',
      border: '1px solid #4285F4',
      '&:hover': {
        background: '#F8FAFE',
        border: '1px solid #4285F4',
      },
    },
  }}
/>`,
      },
    },
  },
};
