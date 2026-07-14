import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconDeviceTvFilled } from '@tabler/icons-react';
import { StatsCard } from './StatsCard';
import { error } from '../../../../constants/colors';

const meta: Meta<typeof StatsCard> = {
  title: 'Components/Data/Cards/StatsCard',
  component: StatsCard,
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof StatsCard>;

export const NumericValue: Story = {
  args: {
    value: 42,
    title: 'Items Active',
    format: 'integer',
    description: 'Across your rotation and active events',
  },
};

export const StringHealthy: Story = {
  args: {
    value: 'Healthy',
    title: 'System Health',
    description: 'All devices are operating as expected',
    icon: <IconDeviceTvFilled size={18} />,
    iconColor: 'green',
  },
};

export const StringIssuesDetected: Story = {
  args: {
    value: 'Issues Detected',
    title: 'System Health',
    description:
      '2 of 5 devices have issues, your Taiv setup may not operate as expected',
    icon: <IconDeviceTvFilled size={18} />,
    iconColor: 'yellow',
  },
};

export const StringNeedsAttention: Story = {
  args: {
    value: 'Needs Attention',
    valueColor: error[200],
    title: 'System Health',
    description:
      '3 of 3 devices have issues, your Taiv setup may not operate as expected',
    icon: <IconDeviceTvFilled size={18} />,
    iconColor: 'red',
  },
};

export const StringNoDevices: Story = {
  args: {
    value: 'No Devices',
    title: 'System Health',
    description: 'Add a device to get started with Taiv',
    icon: <IconDeviceTvFilled size={18} />,
    iconColor: 'gray',
  },
};
