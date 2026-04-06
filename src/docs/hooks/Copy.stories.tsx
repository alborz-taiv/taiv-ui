import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCopy } from '../../hooks/useCopy';
import { Button } from '../../components/Inputs/Buttons/Button/Button';
import { IconCopy } from '@tabler/icons-react';

const meta: Meta = {
  title: 'Hooks/Copy',
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The value to copy',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Optional label for what the value is',
      table: {
        type: { summary: 'string' },
      },
    },
    showNotification: {
      control: { type: 'boolean' },
      description: 'Show notification after copy',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    notificationMessage: {
      control: { type: 'text' },
      description: 'Custom notification message override - use this sparingly',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const DefaultDemo = (args: any) => {
  const { copy } = useCopy();

  return (
    <Button
      variant="secondary"
      leftIcon={<IconCopy />}
      onClick={() =>
        copy({
          value: args.value,
          label: args.label || undefined,
          showNotification: args.showNotification,
          notificationMessage: args.notificationMessage || undefined,
        })
      }
    >
      Copy {args.label}
    </Button>
  );
};

export const Default: Story = {
  args: {
    value: '12345',
    label: undefined,
    showNotification: true,
    notificationMessage: undefined,
  },
  render: (args) => <DefaultDemo {...args} />,
};