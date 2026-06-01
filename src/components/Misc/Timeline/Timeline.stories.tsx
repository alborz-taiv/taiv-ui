import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCheck, IconClock, IconCoin, IconReceipt } from '@tabler/icons-react';
import { Timeline } from './Timeline';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Misc/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/timeline/)\n\nDisplays a list of events along a vertical line. Wraps Mantine v6's Timeline with Taiv styling.",
      },
    },
  },
  argTypes: {
    active: {
      control: { type: 'number' },
      description: 'Index of the most recent active item',
    },
    bulletSize: {
      control: { type: 'number' },
      description: 'Diameter of the bullet in px',
    },
    lineWidth: {
      control: { type: 'number' },
      description: 'Width of the connecting line in px',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: 1,
    bulletSize: 24,
    lineWidth: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '480px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Timeline {...args}>
      <Timeline.Item title="Payment received" bullet={<IconCoin size={14} />}>
        <Text variant="subtle">$1,240.50 paid out on Mar 1</Text>
      </Timeline.Item>
      <Timeline.Item title="Statement issued" bullet={<IconReceipt size={14} />}>
        <Text variant="subtle">February statement is ready</Text>
      </Timeline.Item>
      <Timeline.Item title="Awaiting next cycle" bullet={<IconClock size={14} />}>
        <Text variant="subtle">Next payout scheduled for April 1</Text>
      </Timeline.Item>
    </Timeline>
  ),
};

export const Variants: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '480px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Stack spacing={spacing.xl}>
      <Timeline active={2} bulletSize={28}>
        <Timeline.Item title="Step 1" bullet={<IconCheck size={14} />}>
          <Text variant="subtle">Completed</Text>
        </Timeline.Item>
        <Timeline.Item title="Step 2" bullet={<IconCheck size={14} />}>
          <Text variant="subtle">Completed</Text>
        </Timeline.Item>
        <Timeline.Item title="Step 3" bullet={<IconClock size={14} />}>
          <Text variant="subtle">In progress</Text>
        </Timeline.Item>
        <Timeline.Item title="Step 4">
          <Text variant="subtle">Pending</Text>
        </Timeline.Item>
      </Timeline>
    </Stack>
  ),
};
