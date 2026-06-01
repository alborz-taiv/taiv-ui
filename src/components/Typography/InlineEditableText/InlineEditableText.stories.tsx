import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../Text/Text';
import { InlineEditableText } from './InlineEditableText';

const meta: Meta<typeof InlineEditableText> = {
  component: InlineEditableText,
  parameters: {
    docs: {
      description: {
        component:
          'Heading-styled text that flips into an inline input on click or pencil press. Commits on Enter + blur; Escape cancels. Used for playlist titles and other inline-edited names.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Typography/InlineEditableText',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('Spring campaign');
    return (
      <Stack style={{ minWidth: 320 }}>
        <InlineEditableText onChange={setValue} value={value} />
        <Text variant='subtle'>Persisted: {value}</Text>
      </Stack>
    );
  },
};

export const EmptyStartsWithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InlineEditableText
        onChange={setValue}
        placeholder='Untitled Playlist'
        value={value}
      />
    );
  },
};

export const WithMaxLength: Story = {
  render: () => {
    const [value, setValue] = useState('My Playlist');
    return (
      <Stack style={{ minWidth: 320 }}>
        <InlineEditableText maxLength={32} onChange={setValue} value={value} />
        <Text variant='label'>Max 32 characters</Text>
      </Stack>
    );
  },
};

export const CardHeaderSize: Story = {
  render: () => {
    const [value, setValue] = useState('Short heading');
    return (
      <InlineEditableText
        onChange={setValue}
        value={value}
        variant='cardHeader'
      />
    );
  },
};

export const PencilHidden: Story = {
  render: () => {
    const [value, setValue] = useState('Click the text to edit');
    return <InlineEditableText hidePencil onChange={setValue} value={value} />;
  },
};
