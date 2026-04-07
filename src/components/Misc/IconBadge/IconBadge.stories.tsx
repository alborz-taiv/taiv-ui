import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconBadge } from './IconBadge';
import { IconHeart, IconBell, IconStar, IconCheck, IconSettings, IconShield } from '@tabler/icons-react';

const meta: Meta<typeof IconBadge> = {
  title: 'Components/Misc/IconBadge',
  component: IconBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The IconBadge component is just a colored icon wrapped in a circular background.',
      },
    },
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['Heart', 'Bell', 'Star', 'Check', 'Settings', 'Shield'],
      mapping: {
        Heart: <IconHeart size={20} />,
        Bell: <IconBell size={20} />,
        Star: <IconStar size={20} />,
        Check: <IconCheck size={20} />,
        Settings: <IconSettings size={20} />,
        Shield: <IconShield size={20} />,
      },
      description: 'The icon element to display inside the badge',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['blue', 'green', 'yellow', 'red', 'purple', 'salmon', 'gray'],
      description: 'Primitive color for the badge background and icon',
      table: {
        type: { summary: "'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'salmon' | 'gray'" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <IconHeart size={20} />,
    color: 'blue',
  },
};
