import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { neutral, primary, white } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { SelectableObject } from './SelectableObject';

const meta: Meta<typeof SelectableObject> = {
  component: SelectableObject,
  parameters: {
    docs: {
      description: {
        component:
          'Selection chrome for canvas-like editors — animated marching-ants border + 4 corner resize handles wrapped around arbitrary children. Drag / resize math stays in the consumer; this component only renders the chrome.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Misc/SelectableObject',
};

export default meta;
type Story = StoryObj<typeof meta>;

const CANVAS: React.CSSProperties = {
  background: neutral[25],
  border: `1px solid ${neutral[50]}`,
  borderRadius: 8,
  height: 260,
  padding: spacing.xl,
  position: 'relative',
  width: 420,
};

export const TextObject: Story = {
  render: () => (
    <div style={CANVAS}>
      <SelectableObject>
        <div
          style={{
            background: white,
            border: `1px solid ${neutral[50]}`,
            borderRadius: 6,
            color: neutral[300],
            fontSize: 28,
            fontWeight: 600,
            padding: `${spacing.sm} ${spacing.md}`,
          }}
        >
          Heading text
        </div>
      </SelectableObject>
    </div>
  ),
};

export const ImageObject: Story = {
  render: () => (
    <div style={CANVAS}>
      <SelectableObject>
        <div
          style={{
            background: `linear-gradient(135deg, ${primary[100]}, ${primary[200]})`,
            borderRadius: 6,
            color: white,
            display: 'flex',
            fontSize: 12,
            fontWeight: 500,
            height: 140,
            letterSpacing: 0.5,
            placeContent: 'center',
            placeItems: 'center',
            textTransform: 'uppercase',
            width: 200,
          }}
        >
          Image
        </div>
      </SelectableObject>
    </div>
  ),
};

export const ToggleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>('one');
    return (
      <Stack spacing={spacing.sm}>
        <Text variant='subtle'>Click an object to select it.</Text>
        <div style={{ ...CANVAS, width: 520 }}>
          <Group spacing={spacing.xl}>
            {(['one', 'two'] as const).map((id) => (
              <SelectableObject
                key={id}
                onSelect={() => setSelected(id)}
                selected={selected === id}
              >
                <div
                  style={{
                    background: white,
                    border: `1px solid ${neutral[50]}`,
                    borderRadius: 6,
                    padding: `${spacing.md} ${spacing.lg}`,
                  }}
                >
                  Object {id}
                </div>
              </SelectableObject>
            ))}
          </Group>
        </div>
      </Stack>
    );
  },
};

export const NoHandles: Story = {
  render: () => (
    <div style={CANVAS}>
      <SelectableObject showHandles={false}>
        <div
          style={{
            background: white,
            border: `1px solid ${neutral[50]}`,
            borderRadius: 6,
            padding: `${spacing.md} ${spacing.lg}`,
          }}
        >
          Lightweight hover / focus chrome
        </div>
      </SelectableObject>
    </div>
  ),
};

export const StaticBorder: Story = {
  render: () => (
    <div style={CANVAS}>
      <SelectableObject animated={false}>
        <div
          style={{
            background: white,
            border: `1px solid ${neutral[50]}`,
            borderRadius: 6,
            padding: `${spacing.md} ${spacing.lg}`,
          }}
        >
          Dashed border, no animation
        </div>
      </SelectableObject>
    </div>
  ),
};
