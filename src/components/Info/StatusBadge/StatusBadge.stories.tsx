import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconMoodHappy, IconWifi } from '@tabler/icons-react';
import { StatusBadge } from './StatusBadge';
import { Group } from '../../Layout/Group/Group';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/Info/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A pill-shaped badge for showing online or offline status. Size presets: sm, md (default), lg. Border radius 10rem.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['online', 'offline'],
      description: 'Visual state: online (green) or offline (gray/red)',
      table: {
        type: { summary: "'online' | 'offline'" },
        defaultValue: { summary: "'offline'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Preset size (width, height, icon size)',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Custom label; defaults to "Online" or "Offline" based on variant',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Override width (overrides size preset)',
      table: {
        type: { summary: 'string' },
      },
    },
    height: {
      control: { type: 'text' },
      description: 'Override height (overrides size preset)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'offline',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="1.6rem">
      <StatusBadge variant="online" />
      <StatusBadge variant="offline" />
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap="1.6rem" align="flex-end">
      <StatusBadge variant="online" size="sm" />
      <StatusBadge variant="offline" size="md" />
      <StatusBadge variant="online" size="lg" />
    </Group>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <Group gap="1.6rem" align="flex-end">
      <StatusBadge variant="online" width="6rem" height="1.8rem" />
      <StatusBadge variant="offline" size="md" />
      <StatusBadge variant="online" width="9rem" height="2.8rem" />
    </Group>
  ),
};

export const CustomTitle: Story = {
  render: () => (
    <Group gap="1.6rem">
      <StatusBadge variant="online" title="Available" />
      <StatusBadge variant="offline" title="Away" />
      <StatusBadge variant="online" title="Connected" />
    </Group>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Group gap="1.6rem">
      <StatusBadge variant="online" icon={<IconMoodHappy size={20} />} />
      <StatusBadge variant="offline" icon={<IconWifi size={20} />} />
      <StatusBadge variant="online" icon={<IconWifi size={20} />} title="Connected" />
    </Group>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <Group gap="1.6rem">
      <StatusBadge variant="online" backgroundColor="#e8f5e9" color="#2e7d32" />
      <StatusBadge variant="offline" backgroundColor="#ffebee" color="#c62828" />
      <StatusBadge variant="online" backgroundColor="#e3f2fd" color="#1565c0" />
      <StatusBadge variant="offline" backgroundColor="#f5f5f5" color="#616161" />
    </Group>
  ),
};
