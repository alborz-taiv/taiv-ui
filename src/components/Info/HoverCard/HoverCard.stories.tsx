import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconExternalLink, IconUser } from '@tabler/icons-react';
import { Avatar } from '@mantine/core';
import { HoverCard } from './HoverCard';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { Stack } from '../../Layout/Stack/Stack';
import { Group } from '../../Layout/Group/Group';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import { Divider } from '../../Layout/Divider/Divider';
import { spacing } from '../../../constants/spacing';
import { neutral } from '../../../constants/colors';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/Info/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A floating hover-card built on Mantine HoverCard. Renders into a portal (document.body) to escape sticky/transform stacking contexts. Use HoverCard.Target and HoverCard.Dropdown as compound children.',
      },
    },
  },
  argTypes: {
    openDelay: {
      control: { type: 'number' },
      description: 'Delay in ms before opening',
      table: { defaultValue: { summary: '80' } },
    },
    closeDelay: {
      control: { type: 'number' },
      description: 'Delay in ms before closing (keeps card open while moving cursor onto it)',
      table: { defaultValue: { summary: '120' } },
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'Preferred placement relative to target',
      table: { defaultValue: { summary: "'bottom'" } },
    },
    withArrow: {
      control: { type: 'boolean' },
      description: 'Show arrow pointing to target',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {
    openDelay: 80,
    closeDelay: 120,
    position: 'bottom',
    withArrow: false,
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCard.Target>
        <Button variant='secondary'>Hover me</Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text variant='body'>This is a hover card. Move the cursor here — it stays open.</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  ),
};

export const Position: Story = {
  render: () => (
    <Group gap={spacing.xl}>
      {(['top', 'bottom-start', 'right-end'] as const).map((pos) => (
        <HoverCard key={pos} position={pos} withArrow>
          <HoverCard.Target>
            <Button variant='secondary'>{pos}</Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text variant='label'>position=&quot;{pos}&quot;</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      ))}
    </Group>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <HoverCard withArrow position='top'>
      <HoverCard.Target>
        <Button variant='secondary'>With arrow</Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text variant='body'>Arrow points at the trigger.</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  ),
};

export const RichContent: Story = {
  render: () => (
    <HoverCard width={280} position='bottom-start'>
      <HoverCard.Target>
        <Avatar radius='xl' size='md' color='blue'>
          <IconUser size={18} />
        </Avatar>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Stack gap={spacing.sm}>
          <Group gap={spacing.sm}>
            <Avatar radius='xl' size='sm' color='blue'>
              <IconUser size={14} />
            </Avatar>
            <Stack gap={spacing.xxs}>
              <Title variant='cardHeader'>Jane Smith</Title>
              <Text variant='label' style={{ color: neutral[200] }}>
                jane@taiv.com
              </Text>
            </Stack>
          </Group>
          <Divider />
          <Stack gap={spacing.xs}>
            {['Profile', 'Settings', 'Sign out'].map((label) => (
              <Group key={label} gap={spacing.xs} style={{ cursor: 'pointer' }}>
                <IconExternalLink size={14} color={neutral[200]} />
                <Text variant='body'>{label}</Text>
              </Group>
            ))}
          </Stack>
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  ),
};

export const InsideStickyContainer: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Regression check: dropdown must render above the sticky header because withinPortal=true escapes the stacking context.',
      },
    },
  },
  render: () => (
    <div style={{ height: 300, overflowY: 'auto', border: `1px solid ${neutral[50]}`, borderRadius: 8 }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          padding: `${spacing.sm} ${spacing.lg}`,
          borderBottom: `1px solid ${neutral[50]}`,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.md,
        }}
      >
        <Text variant='label'>Sticky header</Text>
        <HoverCard position='bottom'>
          <HoverCard.Target>
            <Button variant='secondary' size='sm'>
              Hover (portal test)
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text variant='body'>Rendered in document.body — not clipped by sticky context.</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </div>
      <Stack gap={spacing.md} p={spacing.lg}>
        {Array.from({ length: 10 }, (_, i) => (
          <Text key={i} variant='subtle'>
            Scroll content row {i + 1}
          </Text>
        ))}
      </Stack>
    </div>
  ),
};
