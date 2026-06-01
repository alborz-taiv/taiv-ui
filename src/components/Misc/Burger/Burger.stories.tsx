import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Burger } from './Burger';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { spacing } from '../../../constants/spacing';
import { neutral, primary, error } from '../../../constants/colors';

const meta: Meta<typeof Burger> = {
  title: 'Components/Misc/Burger',
  component: Burger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Animated hamburger / close icon toggle. Thin wrapper around Mantine Burger with Taiv default color (neutral[300]) and a 200ms transition. Controlled by the `opened` prop.',
      },
    },
  },
  argTypes: {
    opened: {
      control: { type: 'boolean' },
      description: 'false renders burger, true renders close (×)',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: "'md'" } },
    },
    color: {
      control: { type: 'color' },
      description: 'CSS color (not a theme token — Mantine limitation)',
      table: { defaultValue: { summary: 'neutral[300]' } },
    },
    transitionDuration: {
      control: { type: 'number' },
      table: { defaultValue: { summary: '200' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Burger>;

export const Default: Story = {
  args: {
    opened: false,
    size: 'md',
  },
  render: (args) => {
    const [opened, setOpened] = useState(args.opened);
    return <Burger {...args} opened={opened} onClick={() => setOpened((o) => !o)} />;
  },
};

export const Sizes: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <Group gap={spacing.xl} align='center'>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Stack key={size} gap={spacing.xs} align='center'>
            <Burger opened={opened} size={size} onClick={() => setOpened((o) => !o)} />
            <Text variant='label'>{size}</Text>
          </Stack>
        ))}
      </Group>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <Group gap={spacing.xl}>
        <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        <Burger color={primary[200]} opened={opened} onClick={() => setOpened((o) => !o)} />
        <Burger color={error[200]} opened={opened} onClick={() => setOpened((o) => !o)} />
        <Burger color={neutral[200]} opened={opened} onClick={() => setOpened((o) => !o)} />
      </Group>
    );
  },
};

export const InANavHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Typical use: toggling a mobile nav drawer.',
      },
    },
  },
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <Stack gap={spacing.sm} style={{ width: 320 }}>
        <Group
          position='apart'
          align='center'
          style={{
            padding: spacing.md,
            border: `1px solid ${neutral[50]}`,
            borderRadius: 8,
            background: 'white',
          }}
        >
          <Text variant='body' style={{ fontWeight: 600 }}>
            TAIV
          </Text>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        </Group>
        {opened && (
          <Stack
            gap={spacing.xs}
            style={{
              padding: spacing.md,
              border: `1px solid ${neutral[50]}`,
              borderRadius: 8,
              background: 'white',
            }}
          >
            <Text variant='body'>Dashboard</Text>
            <Text variant='body'>Account</Text>
            <Text variant='body'>Settings</Text>
          </Stack>
        )}
      </Stack>
    );
  },
};
