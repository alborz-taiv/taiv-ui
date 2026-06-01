import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { ColorPickerTrigger } from './ColorPickerTrigger';

const SWATCHES = [
  '#0F172A',
  '#1E293B',
  '#334155',
  '#64748B',
  '#0081CE',
  '#22C55E',
  '#F59E0B',
  '#EF4444',
];

const meta: Meta<typeof ColorPickerTrigger> = {
  component: ColorPickerTrigger,
  parameters: {
    docs: {
      description: {
        component:
          'Compact trigger that opens a Mantine `ColorPicker` in a popover. Four visual variants — `fontColor` (stacked "A" over a colored bar), `borderColor` (hollow "A" whose stroke reflects the chosen color), `shadowColor` (solid "A" with a soft drop shadow), and `fillColor` (16×16 swatch with a checkerboard when transparent).',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Inputs/ColorPickerTrigger',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FontColor: Story = {
  render: () => {
    const [color, setColor] = useState('#0F172A');
    return (
      <Group spacing={spacing.md}>
        <ColorPickerTrigger
          onChange={setColor}
          swatches={SWATCHES}
          value={color}
          variant='fontColor'
        />
        <Text variant='subtle'>Current: {color}</Text>
      </Group>
    );
  },
};

export const BorderColor: Story = {
  render: () => {
    const [color, setColor] = useState('#EF4444');
    return (
      <Group spacing={spacing.md}>
        <ColorPickerTrigger
          onChange={setColor}
          swatches={SWATCHES}
          value={color}
          variant='borderColor'
        />
        <Text variant='subtle'>Current: {color}</Text>
      </Group>
    );
  },
};

export const ShadowColor: Story = {
  render: () => {
    const [color, setColor] = useState('#64748B');
    return (
      <Group spacing={spacing.md}>
        <ColorPickerTrigger
          onChange={setColor}
          swatches={SWATCHES}
          value={color}
          variant='shadowColor'
        />
        <Text variant='subtle'>Current: {color}</Text>
      </Group>
    );
  },
};

export const FillColor: Story = {
  render: () => {
    const [color, setColor] = useState<string | null>('#0081CE');
    return (
      <Group spacing={spacing.md}>
        <ColorPickerTrigger
          format='hexa'
          onChange={setColor}
          swatches={SWATCHES}
          value={color}
          variant='fillColor'
        />
        <Text variant='subtle'>Current: {color ?? 'transparent'}</Text>
      </Group>
    );
  },
};

export const TransparentFill: Story = {
  render: () => {
    const [color, setColor] = useState<string | null>('transparent');
    return (
      <Group spacing={spacing.md}>
        <ColorPickerTrigger
          format='hexa'
          onChange={setColor}
          value={color}
          variant='fillColor'
        />
        <Text variant='subtle'>
          Renders a checkerboard when `null` or `'transparent'`.
        </Text>
      </Group>
    );
  },
};

export const DarkSurface: Story = {
  render: () => {
    const [fontColor, setFontColor] = useState('#FFFFFF');
    const [fillColor, setFillColor] = useState<string | null>('#0081CE');
    return (
      <Stack
        spacing={spacing.sm}
        style={{
          background: neutral[300],
          borderRadius: 12,
          padding: spacing.lg,
        }}
      >
        <Text style={{ color: 'white' }} variant='label'>
          Dark chrome variant
        </Text>
        <Group spacing={spacing.sm}>
          <ColorPickerTrigger
            dark
            onChange={setFontColor}
            value={fontColor}
            variant='fontColor'
          />
          <ColorPickerTrigger
            dark
            format='hexa'
            onChange={setFillColor}
            value={fillColor}
            variant='fillColor'
          />
        </Group>
      </Stack>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Group spacing={spacing.sm}>
      <ColorPickerTrigger
        disabled
        onChange={() => {}}
        value='#0F172A'
        variant='fontColor'
      />
      <ColorPickerTrigger
        disabled
        onChange={() => {}}
        value='#0081CE'
        variant='fillColor'
      />
    </Group>
  ),
};
