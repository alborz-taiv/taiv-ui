import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { Select } from '../../Inputs/Dropdowns/Select/Select';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { SelectionToolbar } from './SelectionToolbar';

const meta: Meta<typeof SelectionToolbar> = {
  component: SelectionToolbar,
  parameters: {
    docs: {
      description: {
        component:
          'Floating bottom toolbar that surfaces while items are selected. Pinned above page content and below modals (`z-index: 30`). Never wraps — all children should be shrink-0.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Misc/SelectionToolbar',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OneSelected: Story = {
  render: () => {
    const [opened, setOpened] = useState(true);
    return (
      <SelectionToolbar
        actions={<Button size='sm'>Append to playlist</Button>}
        count={1}
        onDismiss={() => setOpened(false)}
        opened={opened}
      />
    );
  },
};

export const ThreeSelected: Story = {
  render: () => {
    const [opened, setOpened] = useState(true);
    return (
      <SelectionToolbar
        actions={
          <>
            <Button size='sm' variant='cancel'>
              Delete
            </Button>
            <Button size='sm'>Append to playlist</Button>
          </>
        }
        count={3}
        onDismiss={() => setOpened(false)}
        opened={opened}
      />
    );
  },
};

export const TwelveWithDropdown: Story = {
  render: () => {
    const [opened, setOpened] = useState(true);
    const [target, setTarget] = useState<string | null>('main');
    return (
      <SelectionToolbar
        actions={<Button size='sm'>Append</Button>}
        count={12}
        dropdownSlot={
          <Select
            data={[
              { label: 'Main playlist', value: 'main' },
              { label: 'Holiday playlist', value: 'holiday' },
            ]}
            onChange={setTarget}
            size='sm'
            value={target}
          />
        }
        onDismiss={() => setOpened(false)}
        opened={opened}
      />
    );
  },
};

export const Playground: Story = {
  render: () => {
    const [opened, setOpened] = useState(true);
    return (
      <Stack>
        <Text>
          Scroll content — toolbar stays pinned to the viewport bottom.
        </Text>
        {Array.from({ length: 40 }, (_, i) => `row-${i + 1}`).map((key, i) => (
          <Text key={key} variant='subtle'>
            Row {i + 1}
          </Text>
        ))}
        <SelectionToolbar
          actions={<Button size='sm'>Append to playlist</Button>}
          count={4}
          onDismiss={() => setOpened(false)}
          opened={opened}
        />
      </Stack>
    );
  },
};
