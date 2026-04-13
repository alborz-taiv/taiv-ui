import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Loader } from './Loader';
import { Center } from '../Center/Center';
import { Stack } from '../Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { Group } from '../Group/Group';
import { useNotifications } from '../../../hooks/useNotifications';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Loader> = {
  title: 'Components/Misc/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the loader',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number" },
        defaultValue: { summary: "'md'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

const LoadingNotificationDemo = () => {
  const { show, showLoading, hide } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = () => {
    setIsLoading(true);
    const id = showLoading({ message: 'Saving your changes...' });
    setTimeout(() => {
      hide(id);
      show({ variant: 'success', message: 'Your changes have been saved.' });
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Group gap={spacing.xs}>
      <Button onClick={handleSuccess} loading={isLoading}>
        Save
      </Button>
    </Group>
  );
};

export const LoadingNotification: Story = {
  render: () => <LoadingNotificationDemo />,
  parameters: {
    docs: { source: { code: false } },
  },
};

export const ButtonLoading: Story = {
  render: () => <Button loading>Save</Button>,
  parameters: {
    docs: { source: { code: false } },
  },
};

export const CenteredLoader: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: spacing.xxl}}>
        <Story />
      </div>
    ),
  ],
  render: () => (
  <Stack align="center">
    <Loader />
    <Text variant="subtle"> Loading data...</Text>
  </Stack>
  ),
  parameters: {
    docs: { source: { code: false } },
  },
};
