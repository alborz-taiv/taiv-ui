import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconPlus } from '@tabler/icons-react';
import { neutral } from '../../../constants/colors';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { DataState } from './DataState';

const meta: Meta<typeof DataState> = {
  component: DataState,
  parameters: {
    docs: {
      description: {
        component:
          "Placeholder for the slot where data would render. Use as an early return:\n\n```tsx\nif (isLoading) return <DataState variant='loading' />;\nif (items.length === 0) return <DataState variant='empty' />;\nreturn <ActualContent />;\n```",
      },
    },
    layout: 'centered',
  },
  title: 'Components/Layout/DataState',
};

export default meta;
type Story = StoryObj<typeof meta>;

const FRAME = {
  border: `1px solid ${neutral[50]}`,
  borderRadius: 8,
  width: 480,
};

export const Loading: Story = {
  render: () => (
    <div style={FRAME}>
      <DataState variant='loading' />
    </div>
  ),
};

export const LoadingWithMessage: Story = {
  render: () => (
    <div style={FRAME}>
      <DataState message='Loading devices...' variant='loading' />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={FRAME}>
      <DataState variant='empty' />
    </div>
  ),
};

export const EmptyWithAction: Story = {
  render: () => (
    <div style={FRAME}>
      <DataState
        action={
          <Button leftIcon={<IconPlus size={16} />} size='sm'>
            Add device
          </Button>
        }
        message='No devices found. Register a new device.'
        variant='empty'
      />
    </div>
  ),
};

export const InTablePlaceholder: Story = {
  render: () => (
    <div style={{ ...FRAME, width: 640 }}>
      <DataState minHeight={320} variant='loading' />
    </div>
  ),
};
