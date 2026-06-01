import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCheck, IconCircleFilled } from '@tabler/icons-react';
import { Badge } from './Badge';
import type { BadgeProps } from './Badge';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { spacing } from '../../../constants/spacing';

type LeftIconChoice = 'none' | 'IconCheck' | 'IconCircleFilled';

type BadgeStoryArgs = Omit<BadgeProps, 'leftIcon'> & {
  leftIcon?: LeftIconChoice;
};

const meta: Meta<BadgeStoryArgs> = {
  title: 'Components/Info/Badge',
  component: Badge as React.ComponentType<BadgeStoryArgs>,
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
      options: ['outline', 'filled', 'gradient', 'dark'],
      description: 'Visual style of the badge',
      table: {
        type: { summary: "'outline' | 'filled' | 'gradient' | 'dark'" },
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
      options: [
        'primary',
        'success',
        'warning',
        'error',
        'neutral',
        'white',
        'blue',
        'gray',
        'green',
        'purple',
        'red',
        'salmon',
        'teal',
        'yellow',
      ],
      description:
        'Color token key — semantic (theme-following) or primitive (fixed hue)',
      table: {
        type: { summary: 'keyof typeof colors | keyof typeof primitives' },
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
    leftIcon: {
      control: { type: 'select' },
      options: ['none', 'IconCheck', 'IconCircleFilled'],
      description: 'Icon shown to the left of the label',
      table: {
        type: { summary: "'IconCheck' | 'IconCircleFilled' | 'etc'" },
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
    leftIcon: 'none',
  },
  render: (args) => {
    const { leftIcon = 'none', ...badgeProps } = args;
    return <Badge {...badgeProps} leftIcon={leftIconMap[leftIcon]} />;
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <Badge variant="outline" color="primary">Outline</Badge>
      <Badge variant="filled" color="primary">Filled</Badge>
      <Badge variant="gradient" color="primary">Gradient</Badge>
      <Badge variant="dark" color="primary">Dark</Badge>
    </Group>
  ),
};

export const Colors: Story = {
  render: () => (
    <Group gap={spacing.lg} style={{ flexWrap: 'wrap' }}>
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
    <Group gap={spacing.lg} align="flex-end">
      <Badge size="sm" color="primary">Small</Badge>
      <Badge size="md" color="primary">Medium</Badge>
      <Badge size="lg" color="primary">Large</Badge>
    </Group>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <Stack gap={spacing.lg}>
      <Group gap={spacing.lg}>
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
      <Group gap={spacing.lg}>
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
      <Group gap={spacing.lg}>
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
