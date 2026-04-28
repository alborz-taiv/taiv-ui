import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconPlus } from '@tabler/icons-react';
import { Picker } from './Picker';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { IconButton } from '../../Inputs/Buttons/IconButton/IconButton';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Picker> = {
  title: 'Components/Misc/Picker',
  component: Picker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A searchable list popover for picking a single item. Idle state ' +
          'surfaces the most recent N items + a "Show all" toggle; typing in ' +
          'the search filters across the full list. Use for "add to playlist", ' +
          '"move to folder", or any compact pick-one flow.\n\n' +
          'Compose via `Picker.Target` for the trigger; the dropdown is owned ' +
          'by the component. For nested triggers (e.g. inside another Menu), ' +
          'use the controlled `opened` prop.',
      },
    },
  },
  argTypes: {
    recentCount: {
      control: { type: 'number' },
      table: { defaultValue: { summary: '3' } },
    },
    width: {
      control: { type: 'number' },
      table: { defaultValue: { summary: '280' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Picker>;

const fewPlaylists = [
  { id: 'p1', label: 'Morning Mix', meta: '12 slides', recencyKey: Date.now() },
  { id: 'p2', label: 'Lunch Specials', meta: '4 slides', recencyKey: Date.now() - 1_000 },
  { id: 'p3', label: 'Evening Wind-down', meta: '7 slides', recencyKey: Date.now() - 2_000 },
];

const manyPlaylists = [
  { id: 'p1', label: 'Morning Mix', meta: '12 slides', recencyKey: 9 },
  { id: 'p2', label: 'Lunch Specials', meta: '4 slides', recencyKey: 8 },
  { id: 'p3', label: 'Evening Wind-down', meta: '7 slides', recencyKey: 7 },
  { id: 'p4', label: 'Trivia Night', meta: '20 slides', recencyKey: 6 },
  { id: 'p5', label: 'Weekend Brunch', meta: '8 slides', recencyKey: 5 },
  { id: 'p6', label: 'Holidays — December', meta: '15 slides', recencyKey: 4 },
  { id: 'p7', label: 'Local Sports', meta: '10 slides', recencyKey: 3 },
  { id: 'p8', label: 'Promotions', meta: '6 slides', recencyKey: 2 },
];

export const Default: Story = {
  render: () => {
    const [picked, setPicked] = useState<string | null>(null);
    return (
      <Stack gap={spacing.sm} align='center'>
        <Picker
          items={fewPlaylists}
          onSelect={(item) => setPicked(item.label)}
          searchPlaceholder='Search playlists…'
          emptyMessage='No playlists yet'
        >
          <Picker.Target>
            <Button>Add to playlist</Button>
          </Picker.Target>
        </Picker>
        {picked && (
          <Text variant='subtle'>You picked: {picked}</Text>
        )}
      </Stack>
    );
  },
};

export const WithRecentAndShowAll: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When `items.length > recentCount`, the idle view shows only the top N (sorted by `recencyKey` desc) with a "Show all N" toggle. Typing in search jumps to filtered full list.',
      },
    },
  },
  render: () => {
    const [picked, setPicked] = useState<string | null>(null);
    return (
      <Stack gap={spacing.sm} align='center'>
        <Picker
          items={manyPlaylists}
          recentCount={3}
          onSelect={(item) => setPicked(item.label)}
          searchPlaceholder='Search 8 playlists…'
        >
          <Picker.Target>
            <Button>Pick one of 8</Button>
          </Picker.Target>
        </Picker>
        {picked && (
          <Text variant='subtle'>You picked: {picked}</Text>
        )}
      </Stack>
    );
  },
};

export const WithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A common pattern: a "+ Create new …" button below the list. The footer slot is always visible regardless of search state.',
      },
    },
  },
  render: () => (
    <Picker
      items={manyPlaylists}
      recentCount={3}
      onSelect={() => undefined}
      searchPlaceholder='Search playlists…'
      footer={
        <Button
          variant='text'
          size='sm'
          leftIcon={<IconPlus size={14} />}
          fullWidth
        >
          Create new playlist
        </Button>
      }
    >
      <Picker.Target>
        <Button>Add to playlist</Button>
      </Picker.Target>
    </Picker>
  ),
};

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Empty state shows the configured message when no items exist.',
      },
    },
  },
  render: () => (
    <Picker
      items={[]}
      onSelect={() => undefined}
      emptyMessage='No playlists yet'
      footer={
        <Button
          variant='text'
          size='sm'
          leftIcon={<IconPlus size={14} />}
          fullWidth
        >
          Create your first playlist
        </Button>
      }
    >
      <Picker.Target>
        <Button>Add to playlist</Button>
      </Picker.Target>
    </Picker>
  ),
};

export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Items can be disabled with an explanatory tooltip — useful for ' +
          '"already in playlist" or permission-gated entries.',
      },
    },
  },
  render: () => (
    <Picker
      items={[
        { id: 'p1', label: 'Morning Mix', meta: '12 slides', recencyKey: 3 },
        {
          id: 'p2',
          label: 'Lunch Specials',
          meta: 'Already in this playlist',
          recencyKey: 2,
          disabled: true,
          disabledReason: 'This slide is already in "Lunch Specials".',
        },
        { id: 'p3', label: 'Evening Wind-down', meta: '7 slides', recencyKey: 1 },
      ]}
      onSelect={() => undefined}
    >
      <Picker.Target>
        <Button>Add to playlist</Button>
      </Picker.Target>
    </Picker>
  ),
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Controlled-open mode for triggering programmatically — e.g. when ' +
          'the trigger lives in another popover that needs to close first.',
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Group gap={spacing.sm} align='center'>
        <Button onClick={() => setOpen(true)}>Open Picker</Button>
        <Picker
          items={fewPlaylists}
          onSelect={() => setOpen(false)}
          opened={open}
          onOpenChange={setOpen}
        >
          <Picker.Target>
            <span style={{ display: 'inline-block', width: 1, height: 1 }} />
          </Picker.Target>
        </Picker>
      </Group>
    );
  },
};

export const AnchoredToIconButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Mounting on an IconButton trigger — common in card kebabs.',
      },
    },
  },
  render: () => (
    <Picker
      items={fewPlaylists}
      onSelect={() => undefined}
      position='bottom-end'
    >
      <Picker.Target>
        <IconButton aria-label='Add to playlist' variant='secondary' subtle>
          <IconPlus size={16} />
        </IconButton>
      </Picker.Target>
    </Picker>
  ),
};

export const OnDarkSurface: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Picker dropdown stays light/neutral against a dark anchor surface ' +
          '(e.g. when triggered from a dark selection toolbar).',
      },
    },
  },
  render: () => (
    <div
      style={{
        background: '#1a1a22',
        borderRadius: 12,
        padding: spacing.md,
      }}
    >
      <Picker
        items={manyPlaylists}
        recentCount={3}
        onSelect={() => undefined}
        position='top-end'
        footer={
          <Button
            variant='text'
            size='sm'
            leftIcon={<IconPlus size={14} />}
            fullWidth
          >
            Create new playlist
          </Button>
        }
      >
        <Picker.Target>
          <Button variant='ghost' size='sm'>
            Add to playlist
          </Button>
        </Picker.Target>
      </Picker>
    </div>
  ),
};
