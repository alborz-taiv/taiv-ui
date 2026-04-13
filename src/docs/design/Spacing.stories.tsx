import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from '../../components/Layout/Group/Group';
import { Stack } from '../../components/Layout/Stack/Stack';
import { Text } from '../../components/Typography/Text/Text';
import { spacing } from '../../constants/spacing';
import { neutral } from '../../constants/colors';

const meta: Meta = {
  title: 'Design/Spacing',
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const SpacingRow = ({ name, value }: { name: string; value: string }) => (
  <Group gap={spacing.lg} align="center" style={{ width: '400px' }}>
    <Text variant="label" style={{ width: '60px', flexShrink: 0 }}>
      <code>{name}</code>
    </Text>
    <div
      style={{
        height: '24px',
        width: value,
        backgroundColor: neutral[200],
        borderRadius: '3px',
        flexShrink: 0,
      }}
    />
    <Text variant="caption" style={{ color: neutral[200] }}>{value}</Text>
  </Group>
);

export const AllTokens: Story = {
  render: () => (
    <Stack gap={spacing.lg} align="flex-start">
      {Object.entries(spacing).map(([name, value]) => (
        <SpacingRow key={name} name={name} value={value} />
      ))}
    </Stack>
  ),
};
