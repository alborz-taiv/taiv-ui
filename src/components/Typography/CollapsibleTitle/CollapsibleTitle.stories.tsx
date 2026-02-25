import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CollapsibleTitle } from './CollapsibleTitle';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../Text/Text';

const meta: Meta<typeof CollapsibleTitle> = {
  title: 'Components/Typography/CollapsibleTitle',
  component: CollapsibleTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CollapsibleTitle shows a title and subtext with a caret; clicking toggles the expanded state and reveals optional children. Use it for section headers that expand to show more content.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Main heading text',
      table: { type: { summary: 'string' } },
    },
    subText: {
      control: { type: 'text' },
      description: 'Secondary text shown below the title',
      table: { type: { summary: 'string' } },
    },
    opened: {
      control: { type: 'boolean' },
      description: 'Whether the content is expanded',
      table: { type: { summary: 'boolean' } },
    },
    setOpened: {
      description: 'Called when the header is clicked to toggle open state',
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

const CollapsibleTitleWithState = (props: {
  title: string;
  subText: string;
  initialOpened?: boolean;
  children?: React.ReactNode;
}) => {
  const [opened, setOpened] = useState(props.initialOpened ?? false);
  return (
    <CollapsibleTitle title={props.title} subText={props.subText} opened={opened} setOpened={setOpened}>
      {props.children}
    </CollapsibleTitle>
  );
};

export const Default: Story = {
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <CollapsibleTitle
        title={args.title}
        subText={args.subText}
        opened={opened}
        setOpened={setOpened}
      >
        <Stack gap="0.8rem" style={{ paddingTop: '0.4rem' }}>
          <Text variant="body">Expanded content goes here. You can put forms, lists, or any other content.</Text>
        </Stack>
      </CollapsibleTitle>
    );
  },
  args: {
    title: 'Title',
    subText: 'Subtext',
  },
};

export const WithContent: Story = {
  render: () => (
    <CollapsibleTitleWithState
      title="Section with content"
      subText="Click to expand"
      children={
        <Stack gap="0.4rem" style={{ paddingTop: '0.4rem' }}>
          <Text variant="body">First paragraph of expanded content.</Text>
          <Text variant="body">Second paragraph. The header uses a medium-weight title and caption subtext by default.</Text>
        </Stack>
      }
    />
  ),
};

export const OpenAndClosed: Story = {
  render: () => (
    <Stack gap="2rem">
      <div>
        <Text variant="label" style={{ marginBottom: '0.4rem', display: 'block' }}>
          Closed
        </Text>
        <CollapsibleTitleWithState title="Closed state" subText="(click to expand)" />
      </div>
      <div>
        <Text variant="label" style={{ marginBottom: '0.4rem', display: 'block' }}>
          Open
        </Text>
        <CollapsibleTitleWithState title="Open state" subText="(click to collapse)" initialOpened>
          <Stack gap="0.4rem" style={{ paddingTop: '0.4rem' }}>
            <Text variant="body">Content is visible when opened.</Text>
          </Stack>
        </CollapsibleTitleWithState>
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
