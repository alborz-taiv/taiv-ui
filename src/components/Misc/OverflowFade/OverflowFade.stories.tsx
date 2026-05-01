import type { Meta, StoryObj } from '@storybook/react-vite';
import { neutral, primary } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Badge } from '../../Info/Badge/Badge';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { OverflowFade } from './OverflowFade';

const meta: Meta<typeof OverflowFade> = {
  argTypes: {
    background: {
      control: { type: 'color' },
      description:
        'Color the gradient fades into. Match the surrounding surface.',
      table: { defaultValue: { summary: "'white'" } },
    },
    fadeWidth: {
      control: { type: 'number' },
      table: { defaultValue: { summary: '40' } },
    },
  },
  component: OverflowFade,
  parameters: {
    docs: {
      description: {
        component:
          'Bidirectional gradient fades for horizontal or vertical overflow. Horizontal (default): left/right fades ' +
          'on `overflow-x` scroll. Vertical (`orientation="vertical"`): top/bottom fades — pass `maxHeight` so ' +
          'the viewport clips. Fades auto-hide when content fits.\n\n' +
          'The scrollbar is hidden by design — the gradient is the affordance.',
      },
    },
    layout: 'padded',
  },
  title: 'Components/Misc/OverflowFade',
};

export default meta;
type Story = StoryObj<typeof OverflowFade>;

const chips = [
  'All',
  'Trending',
  'Recently Added',
  'Most Played',
  'Editor Picks',
  'Sports',
  'News',
  'Holiday',
  'Promotions',
  'Announcements',
  'Weather',
];

const Chip = ({ label, active }: { label: string; active?: boolean }) => (
  <div
    style={{
      background: active ? primary[200] : 'white',
      border: `1px solid ${active ? primary[200] : neutral[100]}`,
      borderRadius: 999,
      color: active ? 'white' : neutral[300],
      flexShrink: 0,
      fontSize: 14,
      padding: `${spacing.xs} ${spacing.md}`,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  args: {
    background: 'white',
    fadeWidth: 40,
  },
  render: (args) => (
    <div style={{ background: 'white', maxWidth: 480, padding: spacing.md }}>
      <Stack gap={spacing.sm}>
        <Text variant='label'>
          Resize the panel narrower to see the right-edge fade appear.
        </Text>
        <OverflowFade {...args}>
          <Group gap={spacing.xs} noWrap>
            {chips.map((label) => (
              <Chip key={label} label={label} />
            ))}
          </Group>
        </OverflowFade>
      </Stack>
    </div>
  ),
};

export const NoOverflow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When content fits the container, neither fade renders — auto-detection via scrollWidth/clientWidth.',
      },
    },
  },
  render: () => (
    <div style={{ background: 'white', maxWidth: 480, padding: spacing.md }}>
      <OverflowFade>
        <Group gap={spacing.xs} noWrap>
          <Chip active label='All' />
          <Chip label='Sports' />
          <Chip label='News' />
        </Group>
      </OverflowFade>
    </div>
  ),
};

export const OnNonWhiteSurface: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass `background` to match a non-white surface so the gradient ends in the parent color, not white.',
      },
    },
  },
  render: () => (
    <div
      style={{ background: neutral[25], maxWidth: 480, padding: spacing.md }}
    >
      <Stack gap={spacing.sm}>
        <Text variant='label'>On neutral[25] — fade matches surface.</Text>
        <OverflowFade background={neutral[25]}>
          <Group gap={spacing.xs} noWrap>
            {chips.map((label, i) => (
              <Chip active={i === 0} key={label} label={label} />
            ))}
          </Group>
        </OverflowFade>
      </Stack>
    </div>
  ),
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Vertical scroll with top/bottom fades. Requires `maxHeight` on the viewport so content can overflow.',
      },
    },
  },
  render: () => (
    <div style={{ background: 'white', maxWidth: 360, padding: spacing.md }}>
      <OverflowFade fadeWidth={48} maxHeight={220} orientation='vertical'>
        <Stack gap={spacing.sm}>
          {Array.from({ length: 14 }, (_, i) => (
            <Text key={i} variant='body'>
              Row {i + 1} — scroll to see top and bottom edge fades.
            </Text>
          ))}
        </Stack>
      </OverflowFade>
    </div>
  ),
};

export const WithBadges: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates use with richer children — a tab-strip-like row with counts.',
      },
    },
  },
  render: () => (
    <div style={{ background: 'white', maxWidth: 520, padding: spacing.md }}>
      <OverflowFade>
        <Group gap={spacing.lg} noWrap>
          {[
            'Your Slides',
            'Smart Content',
            'Premades',
            'Playlists',
            'Drafts',
            'Archived',
          ].map((label, i) => (
            <Group
              gap={spacing.xs}
              key={label}
              noWrap
              style={{ flexShrink: 0 }}
            >
              <Text
                style={{ color: i === 0 ? primary[200] : neutral[300] }}
                variant='body'
              >
                {label}
              </Text>
              <Badge color='neutral' size='sm' variant='filled'>
                {[12, 4, 8, 31, 2, 17][i]}
              </Badge>
            </Group>
          ))}
        </Group>
      </OverflowFade>
    </div>
  ),
};
