import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CollapsibleText } from './CollapsibleText';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../Text/Text';
import { textStyle } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof CollapsibleText> = {
  title: 'Components/Typography/CollapsibleText',
  component: CollapsibleText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CollapsibleText shows a single line of text with a caret; clicking toggles the expanded state and reveals optional children. Use it for simple expand/collapse toggles (e.g. "Show more", inline details).',
      },
    },
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'The label text',
      table: { type: { summary: 'string' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['body', 'subtle', 'label', 'caption'],
      description: 'Text variant for the label',
      table: { type: { summary: 'keyof textStyle' }, defaultValue: { summary: "'body'" } },
    },
    opened: {
      control: { type: 'boolean' },
      description: 'Whether the content is expanded',
      table: { type: { summary: 'boolean' } },
    },
    setOpened: {
      description: 'Called when the label is clicked to toggle open state',
      table: { type: { summary: '(opened: boolean) => void' } },
    },
    children: {
      description: 'Content shown when expanded',
      control: false,
      table: { type: { summary: 'ReactNode' }, disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CollapsibleTextWithState = (props: {
  text: string;
  variant?: keyof typeof textStyle;
  initialOpened?: boolean;
  children?: React.ReactNode;
}) => {
  const [opened, setOpened] = useState(props.initialOpened ?? false);
  return (
    <CollapsibleText text={props.text} variant={props.variant} opened={opened} setOpened={setOpened}>
      {props.children}
    </CollapsibleText>
  );
};

export const Default: Story = {
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <CollapsibleText text={args.text} variant={args.variant} opened={opened} setOpened={setOpened}>
        <Stack gap={spacing.sm} style={{ paddingTop: spacing.xs }}>
          <Text variant="body">Expanded content goes here. You can put forms, lists, or any other content.</Text>
        </Stack>
      </CollapsibleText>
    );
  },
  args: {
    text: 'Show more',
    variant: 'body',
  },
};

export const WithContent: Story = {
  render: () => (
    <CollapsibleTextWithState text="Section with content">
      <Stack gap={spacing.xs} style={{ paddingTop: spacing.xs }}>
        <Text variant="body">First paragraph of expanded content.</Text>
        <Text variant="body">Second paragraph. Use CollapsibleText for a single-line label that expands.</Text>
      </Stack>
    </CollapsibleTextWithState>
  ),
};

export const OpenAndClosed: Story = {
  render: () => (
    <Stack gap="20px">
      <div>
        <Text variant="label" style={{ marginBottom: spacing.xs, display: 'block' }}>
          Closed
        </Text>
        <CollapsibleTextWithState text="Closed state (click to expand)" />
      </div>
      <div>
        <Text variant="label" style={{ marginBottom: spacing.xs, display: 'block' }}>
          Open
        </Text>
        <CollapsibleTextWithState text="Open state (click to collapse)" initialOpened>
          <Stack gap={spacing.xs} style={{ paddingTop: spacing.xs }}>
            <Text variant="body">Content is visible when opened.</Text>
          </Stack>
        </CollapsibleTextWithState>
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Controlled by opened/setOpened. The caret rotates when expanded.',
      },
    },
  },
};
