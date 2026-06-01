import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from './Pagination';
import { Stack } from '../Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Layout/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/pagination/)\n\nPaginates a list of items across multiple pages. Wraps Mantine v6's Pagination with Taiv styling.",
      },
    },
  },
  argTypes: {
    total: {
      control: { type: 'number' },
      description: 'Total number of pages',
    },
    value: {
      control: { type: 'number' },
      description: 'Active page (controlled)',
    },
    defaultValue: {
      control: { type: 'number' },
      description: 'Default active page (uncontrolled)',
    },
    siblings: {
      control: { type: 'number' },
      description: 'Sibling pages shown on each side of the active page',
    },
    boundaries: {
      control: { type: 'number' },
      description: 'Pages shown at each boundary',
    },
    withEdges: {
      control: { type: 'boolean' },
      description: 'Render first/last edge controls',
    },
    withControls: {
      control: { type: 'boolean' },
      description: 'Render previous/next controls',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 10,
    defaultValue: 1,
    size: 'md',
  },
};

export const WithEdges: Story = {
  args: {
    total: 25,
    defaultValue: 5,
    withEdges: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Stack spacing={spacing.sm} align="center">
        <Text variant="body">Active page: {page}</Text>
        <Pagination total={12} value={page} onChange={setPage} />
      </Stack>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={spacing.lg}>
      <Pagination total={8} defaultValue={3} size="sm" />
      <Pagination total={8} defaultValue={3} size="md" />
      <Pagination total={8} defaultValue={3} size="lg" />
    </Stack>
  ),
};
