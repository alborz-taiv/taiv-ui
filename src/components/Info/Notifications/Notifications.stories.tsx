import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { NotificationProvider } from './NotificationProvider/NotificationProvider';
import { Group } from '../../Layout/Group/Group';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { useNotifications } from '../../../hooks/useNotifications';

const meta: Meta<typeof NotificationProvider> = {
  title: 'Hooks/Notifications',
  tags: ['!dev'],
  component: NotificationProvider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info', 'copy'],
      description: 'Visual style and icon of the notification',
      table: {
        type: { summary: "'success' | 'error' | 'warning' | 'info' | 'copy'" },
        defaultValue: { summary: "'info'" },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Notification body text',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title override (defaults to variant title)',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: { type: 'text' },
      description: 'Optional unique ID for tracking or hiding',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultDemo = (args: any) => {
  const { show } = useNotifications();

  return (
    <Button
      onClick={() =>
        show({
          variant: args.variant,
          message: args.message,
          title: args.title || undefined,
          id: args.id || undefined,
        })
      }
    >
      Show Notification
    </Button>
  );
};

export const Default: Story = {
  args: {
    variant: 'info',
    message: 'Operation completed successfully!',
    title: undefined,
    id: undefined,
  },
  render: (args) => <DefaultDemo {...args} />,
};

const VariantsDemo = () => {
  const { show } = useNotifications();

  return (
    <Group gap="0.5rem">
      <Button variant="success" onClick={() => show({ variant: 'success', message: 'Operation completed successfully!' })}>Success</Button>
      <Button variant="cancel" onClick={() => show({ variant: 'error', message: 'Something went wrong!' })}>Error</Button>
      <Button variant="warning" onClick={() => show({ variant: 'warning', message: 'Please review your input' })}>Warning</Button>
      <Button variant="primary" onClick={() => show({ variant: 'info', message: 'Here is some useful information' })}>Info</Button>
      <Button variant="secondary" onClick={() => show({ variant: 'copy', message: 'Copied to clipboard!' })}>Copy</Button>
    </Group>
  );
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
};

const GenericErrorDemo = () => {
  const { showError } = useNotifications();

  return <Button variant="cancel" onClick={showError}>Show Generic Error</Button>;
};

export const GenericError: Story = {
  render: () => <GenericErrorDemo />,
};

const AsyncDemo = () => {
  const { show, showLoading, showError, hide } = useNotifications();
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(false);
  const [isLoadingFailure, setIsLoadingFailure] = useState(false);

  const handleSuccess = () => {
    setIsLoadingSuccess(true);
    const id = showLoading({ message: 'Processing your request...' });

    setTimeout(() => {
      hide(id);
      show({ variant: 'success', message: 'Operation completed!' });
      setIsLoadingSuccess(false);
    }, 3000);
  };

  const handleFailure = () => {
    setIsLoadingFailure(true);
    const id = showLoading({ message: 'Processing your request...' });

    setTimeout(() => {
      hide(id);
      showError();
      setIsLoadingFailure(false);
    }, 3000);
  };

  return (
    <Group gap="0.5rem">
      <Button variant="success" onClick={handleSuccess} loading={isLoadingSuccess}>
        {isLoadingSuccess ? 'Processing...' : 'Async Success'}
      </Button>
      <Button variant="cancel" onClick={handleFailure} loading={isLoadingFailure}>
        {isLoadingFailure ? 'Processing...' : 'Async Failure'}
      </Button>
    </Group>
  );
};

export const AsyncNotifications: Story = {
  render: () => <AsyncDemo />,
};