import type { Meta, StoryObj } from '@storybook/react-vite';
import { primitives } from '../../../constants/colors';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  argTypes: {
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the image, or title for placeholder',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: { type: 'text' },
      description: 'Fallback content when there is no image (e.g. initials)',
      table: { type: { summary: 'ReactNode' } },
    },
    color: {
      control: { type: 'select' },
      description:
        'Taiv primitives palette key (applied via Mantine styles API)',
      options: Object.keys(primitives),
      table: { type: { summary: 'AvatarPrimitiveColor' } },
    },
    radius: {
      control: { type: 'select' },
      description: 'Border radius',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { type: { summary: 'MantineNumberSize' } },
    },
    size: {
      control: { type: 'select' },
      description: 'Width and height',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { type: { summary: 'MantineNumberSize' } },
    },
    src: {
      control: { type: 'text' },
      description: 'Image URL',
      table: { type: { summary: 'string | null' } },
    },
    variant: {
      control: { type: 'select' },
      description: 'Visual style',
      options: ['filled', 'light', 'gradient', 'outline'],
      table: {
        type: { summary: "'filled' | 'light' | 'gradient' | 'outline'" },
      },
    },
  },
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Info/Avatar',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'Profile photo',
    radius: 'xl',
    size: 'lg',
    src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  },
};

export const Initials: Story = {
  args: {
    alt: 'User initials',
    children: 'AB',
    color: 'blue',
    radius: 'xl',
    size: 'lg',
    variant: 'filled',
  },
};

export const Grouped: Story = {
  parameters: {
    docs: { source: { code: false } },
  },
  render: () => (
    <Avatar.Group spacing='sm'>
      <Avatar
        radius='xl'
        src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
      />
      <Avatar
        radius='xl'
        src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
      />
      <Avatar color='gray' radius='xl' variant='light'>
        +3
      </Avatar>
    </Avatar.Group>
  ),
};
