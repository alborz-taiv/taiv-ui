import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconBell } from '@tabler/icons-react';
import { Group } from '../../Layout/Group/Group';
import { Avatar } from '../Avatar/Avatar';
import { Indicator } from './Indicator';

const meta: Meta<typeof Indicator> = {
  argTypes: {
    children: {
      control: false,
      description:
        'Element the indicator attaches to (e.g. avatar, icon button)',
      table: { type: { summary: 'ReactNode' } },
    },
    color: {
      control: { type: 'text' },
      description: 'Theme color key for the indicator',
      table: { type: { summary: 'MantineColor' } },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Renders only the child when true',
      table: { type: { summary: 'boolean' } },
    },
    inline: {
      control: { type: 'boolean' },
      description: 'Use inline layout for the wrapper',
      table: { type: { summary: 'boolean' } },
    },
    label: {
      control: { type: 'text' },
      description:
        'Content inside the badge (number, dot when empty, or custom node)',
      table: { type: { summary: 'ReactNode' } },
    },
    position: {
      control: { type: 'select' },
      description: 'Placement relative to the child',
      options: [
        'top-start',
        'top-center',
        'top-end',
        'middle-start',
        'middle-center',
        'middle-end',
        'bottom-start',
        'bottom-center',
        'bottom-end',
      ],
      table: { type: { summary: 'IndicatorPosition' } },
    },
    processing: {
      control: { type: 'boolean' },
      description: 'Pulses the indicator',
      table: { type: { summary: 'boolean' } },
    },
    size: {
      control: { type: 'number' },
      description: 'Indicator diameter',
      table: { type: { summary: 'number | string' } },
    },
    withBorder: {
      control: { type: 'boolean' },
      description: 'White ring around the indicator',
      table: { type: { summary: 'boolean' } },
    },
  },
  component: Indicator,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Info/Indicator',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Avatar
        radius='xl'
        size='lg'
        src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
      />
    ),
    color: 'red',
    inline: true,
    label: undefined,
    position: 'top-end',
    size: 10,
    withBorder: true,
  },
};

export const WithCount: Story = {
  args: {
    children: (
      <Avatar
        radius='xl'
        size='lg'
        src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
      />
    ),
    color: 'blue',
    inline: true,
    label: '12',
    position: 'top-end',
    size: 20,
    withBorder: true,
  },
};

export const OnIcon: Story = {
  parameters: {
    docs: { source: { code: false } },
  },
  render: () => (
    <Indicator color='red' inline position='top-end' size={10} withBorder>
      <Avatar color='gray' radius='md' size='lg' variant='light'>
        <IconBell size={22} />
      </Avatar>
    </Indicator>
  ),
};

export const Processing: Story = {
  args: {
    children: (
      <Avatar
        radius='xl'
        size='lg'
        src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'
      />
    ),
    color: 'green',
    inline: true,
    position: 'top-end',
    processing: true,
    size: 12,
    withBorder: true,
  },
};

const positionLabels: Record<
  'top-start' | 'top-end' | 'bottom-start' | 'bottom-end',
  string
> = {
  'bottom-end': 'BE',
  'bottom-start': 'BS',
  'top-end': 'TE',
  'top-start': 'TS',
};

export const Positions: Story = {
  parameters: {
    docs: { source: { code: false } },
    layout: 'padded',
  },
  render: () => (
    <Group spacing='xl'>
      {(Object.keys(positionLabels) as (keyof typeof positionLabels)[]).map(
        (position) => (
          <Indicator
            color='red'
            inline
            key={position}
            position={position}
            size={10}
            withBorder
          >
            <Avatar color='gray' radius='xl' size='md' variant='outline'>
              {positionLabels[position]}
            </Avatar>
          </Indicator>
        ),
      )}
    </Group>
  ),
};
