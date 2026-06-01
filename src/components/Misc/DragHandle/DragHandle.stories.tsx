import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { DragHandle } from './DragHandle';

const meta: Meta<typeof DragHandle> = {
  component: DragHandle,
  parameters: {
    docs: {
      description: {
        component:
          'Six-dot drag handle rendered as a real `<button>` — owns focus, keyboard reorder (arrow keys), and `aria-label`. Pair with a DnD library (e.g. `@dnd-kit`) by attaching listeners via the forwarded ref.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Misc/DragHandle',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DragHandle />,
};

export const InListRow: Story = {
  render: () => (
    <Stack
      spacing={spacing.xs}
      style={{
        border: `1px solid ${neutral[50]}`,
        borderRadius: 8,
        padding: spacing.sm,
        width: 320,
      }}
    >
      {['Nike ad', 'Spotify ad', 'Apple ad'].map((name) => (
        <Group
          key={name}
          spacing={spacing.sm}
          style={{
            border: `1px solid ${neutral[50]}`,
            borderRadius: 6,
            padding: spacing.xs,
          }}
        >
          <DragHandle ariaLabel={`Reorder ${name}`} />
          <Text variant='body'>{name}</Text>
        </Group>
      ))}
    </Stack>
  ),
};

export const KeyboardReorder: Story = {
  render: () => {
    const [items, setItems] = useState(['A', 'B', 'C', 'D']);
    const reorder = (i: number, dir: -1 | 1) => {
      const next = [...items];
      const target = i + dir;
      if (target < 0 || target >= next.length) return;
      [next[i], next[target]] = [next[target], next[i]];
      setItems(next);
    };
    return (
      <Stack spacing={spacing.xs} style={{ width: 280 }}>
        <Text variant='subtle'>Focus a handle and press ↑/↓ to reorder.</Text>
        {items.map((name, i) => (
          <Group
            key={name}
            spacing={spacing.sm}
            style={{
              border: `1px solid ${neutral[50]}`,
              borderRadius: 6,
              padding: spacing.xs,
            }}
          >
            <DragHandle
              ariaLabel={`Reorder ${name}`}
              onReorder={(dir) => reorder(i, dir)}
            />
            <Text variant='body'>{name}</Text>
          </Group>
        ))}
      </Stack>
    );
  },
};
