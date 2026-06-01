import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';
import { Group } from '../../Layout/Group/Group';
import { Text } from '../../Typography/Text/Text';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Misc/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Thin wrapper around Mantine v6\'s `Kbd` component with Taiv typography and color tokens. Use inline within help text to render keyboard shortcuts.',
      },
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Key label to display',
      table: { type: { summary: 'ReactNode' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '⌘K' },
  parameters: {
    docs: {
      source: { code: `<Kbd>⌘K</Kbd>` },
    },
  },
};

export const InContext: Story = {
  render: () => (
    <Text variant='subtle'>
      Press <Kbd>⌘K</Kbd> to open search, or <Kbd>Esc</Kbd> to dismiss.
    </Text>
  ),
  parameters: {
    docs: {
      description: { story: 'Typical usage — inline within a sentence of help text.' },
      source: {
        code: `<Text variant="subtle">
  Press <Kbd>⌘K</Kbd> to open search, or <Kbd>Esc</Kbd> to dismiss.
</Text>`,
      },
    },
  },
};

export const CommonShortcuts: Story = {
  render: () => (
    <Group spacing={spacing.sm}>
      <Kbd>⌘K</Kbd>
      <Kbd>⌘Z</Kbd>
      <Kbd>⌘⇧Z</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Tab</Kbd>
    </Group>
  ),
  parameters: {
    docs: { source: { code: false } },
  },
};
