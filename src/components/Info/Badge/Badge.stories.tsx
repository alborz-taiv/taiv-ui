import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCheck, IconCircleFilled } from '@tabler/icons-react';
import { Badge } from './Badge';
import type { BadgeProps } from './Badge';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';

type LeftIconChoice = 'none' | 'IconCheck' | 'IconCircleFilled';

type BadgeStoryArgs = BadgeProps & {
  leftIconChoice?: LeftIconChoice;
};

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/Info/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable badge built on Mantine Badge. Supports sizes (sm, md, lg), design system colors, and outline, filled, or gradient variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outline', 'filled', 'gradient'],
      description: 'Visual style of the badge',
      table: {
        type: { summary: "'outline' | 'filled' | 'gradient'" },
        defaultValue: { summary: "'outline'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Badge size (height and font size)',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'neutral', 'white'],
      description: 'Design system color',
      table: {
        type: { summary: 'keyof typeof colors' },
        defaultValue: { summary: "'primary'" },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Badge label or content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    leftIconChoice: {
      control: { type: 'select' },
      options: ['none', 'IconCheck', 'IconCircleFilled'],
      description: 'Icon shown to the left of the label',
      table: {
        type: { summary: "'none' | 'IconCheck' | 'IconCircleFilled'" },
        defaultValue: { summary: "'IconCircleFilled'" },
      },
    },
  },
};

const leftIconMap: Record<LeftIconChoice, React.ReactElement | undefined> = {
  none: undefined,
  IconCheck: <IconCheck />,
  IconCircleFilled: <IconCircleFilled />,
};

export default meta;
type Story = StoryObj<BadgeStoryArgs>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'outline',
    size: 'md',
    color: 'primary',
    leftIconChoice: 'IconCircleFilled',
  },
  render: (args) => {
    const { leftIconChoice = 'IconCircleFilled', ...badgeProps } = args;
    return <Badge {...badgeProps} leftIcon={leftIconMap[leftIconChoice]} />;
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="1.6rem">
      <Badge variant="outline" color="primary">Outline</Badge>
      <Badge variant="filled" color="primary">Filled</Badge>
      <Badge variant="gradient" color="primary">Gradient</Badge>
    </Group>
  ),
};

export const Colors: Story = {
  render: () => (
    <Group gap="1.6rem" style={{ flexWrap: 'wrap' }}>
      <Badge variant="outline" color="primary">Primary</Badge>
      <Badge variant="outline" color="success">Success</Badge>
      <Badge variant="outline" color="warning">Warning</Badge>
      <Badge variant="outline" color="error">Error</Badge>
      <Badge variant="outline" color="neutral">Neutral</Badge>
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap="1.6rem" align="flex-end">
      <Badge size="sm" color="primary">Small</Badge>
      <Badge size="md" color="primary">Medium</Badge>
      <Badge size="lg" color="primary">Large</Badge>
    </Group>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <Stack gap="1.6rem">
      <Group gap="1.6rem">
        <Badge size="sm" leftIcon={<IconCheck />} color="success">
          Completed
        </Badge>
        <Badge size="sm" variant="filled" leftIcon={<IconCircleFilled />} color="success">
          Online
        </Badge>
        <Badge size="sm" variant="gradient" leftIcon={<IconCheck />} color="success">
          In Progress
        </Badge>
      </Group>
      <Group gap="1.6rem">
        <Badge leftIcon={<IconCheck />} color="success">
          Completed
        </Badge>
        <Badge variant="filled" leftIcon={<IconCircleFilled />} color="success">
          Online
        </Badge>
        <Badge variant="gradient" leftIcon={<IconCheck />} color="success">
          In Progress
        </Badge>
      </Group>
      <Group gap="1.6rem">
        <Badge size="lg" leftIcon={<IconCheck />} color="success">
          Completed
        </Badge>
        <Badge size="lg" variant="filled" leftIcon={<IconCircleFilled />} color="success">
          Online
        </Badge>
        <Badge size="lg" variant="gradient" leftIcon={<IconCheck />} color="success">
          In Progress
        </Badge>
      </Group>
    </Stack>
  ),
};
