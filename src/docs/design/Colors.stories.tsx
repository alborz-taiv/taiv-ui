import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from '../../components/Layout/Group/Group';
import { Stack } from '../../components/Layout/Stack/Stack';
import { Text } from '../../components/Typography/Text/Text';
import { colors, primitives } from '../../constants/colors';

const meta: Meta = {
  title: 'Design/Colors',
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const Swatch = ({ color, label }: { color: string; label: string }) => (
  <Stack gap="0.4rem" align="center">
    <div
      style={{
        width: '64px',
        height: '64px',
        borderRadius: '8px',
        backgroundColor: color,
        border: '1px solid rgba(0,0,0,0.1)',
      }}
    />
    <Text size="xs" color="dimmed">{label}</Text>
    <Text size="xs" color="dimmed">{color}</Text>
  </Stack>
);

const ThemeRow = ({
  semantic,
  primitive,
  shades,
}: {
  semantic: string;
  primitive: string;
  shades: Record<string, string>;
}) => (
  <Stack gap="0.8rem">
    <Group gap="0.4rem">
      <Text weight="bold">{semantic}</Text>
      <Text>({primitive})</Text>
    </Group>
    <Group gap="1.6rem">
      {Object.entries(shades).map(([shade, hex]) => (
        <Swatch key={shade} color={hex} label={shade} />
      ))}
    </Group>
  </Stack>
);

const ColorRow = ({ name, shades }: { name: string; shades: Record<string, string> }) => (
  <Stack gap="0.8rem">
    <Text weight="bold" transform="capitalize">{name}</Text>
    <Group gap="1.6rem">
      {Object.entries(shades).map(([shade, hex]) => (
        <Swatch key={shade} color={hex} label={shade} />
      ))}
    </Group>
  </Stack>
);

export const TaivLight: Story = {
  render: () => (
    <Stack gap="2.4rem" align="flex-start">
      <Group gap="1.6rem">
        <Swatch color="#000000" label="black" />
        <Swatch color="#FFFFFF" label="white" />
      </Group>
      <ThemeRow semantic="primary" primitive="blue" shades={colors.primary} />
      <ThemeRow semantic="neutral" primitive="gray" shades={colors.neutral} />
      <ThemeRow semantic="success" primitive="green" shades={colors.success} />
      <ThemeRow semantic="warning" primitive="yellow" shades={colors.warning} />
      <ThemeRow semantic="error" primitive="red" shades={colors.error} />
    </Stack>
  ),
};

export const AdditionalPrimitives: Story = {
  render: () => (
    <Stack gap="2.4rem">
      <ColorRow name="purple" shades={primitives.purple} />
      <ColorRow name="salmon" shades={primitives.salmon} />
    </Stack>
  ),
};