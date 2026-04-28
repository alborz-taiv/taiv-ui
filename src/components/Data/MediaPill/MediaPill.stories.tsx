import type { Meta, StoryObj } from '@storybook/react-vite';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { MediaPill } from './MediaPill';

const meta: Meta<typeof MediaPill> = {
  argTypes: {
    duration: { control: { type: 'text' } },
    imageLabel: { control: { type: 'text' } },
    size: { control: { type: 'inline-radio' }, options: ['xs', 'sm'] },
    type: { control: { type: 'inline-radio' }, options: ['video', 'image'] },
  },
  component: MediaPill,
  parameters: {
    docs: {
      description: {
        component:
          'Small pill overlay for thumbnails that tags media type (video / image) plus a duration or `IMG` label. Parent container must handle absolute positioning.',
      },
    },
    layout: 'centered',
  },
  title: 'Components/Data/MediaPill',
};

export default meta;
type Story = StoryObj<typeof meta>;

const Thumbnail = ({
  children,
  size = 160,
}: {
  children: React.ReactNode;
  size?: number;
}) => (
  <div
    style={{
      alignItems: 'center',
      background: `linear-gradient(135deg, ${neutral[100]}, ${neutral[200]})`,
      borderRadius: 8,
      display: 'flex',
      height: size,
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      width: size,
    }}
  >
    <div style={{ left: spacing.sm, position: 'absolute', top: spacing.sm }}>
      {children}
    </div>
  </div>
);

export const Video: Story = {
  args: { duration: '0:15', type: 'video' },
  render: (args) => (
    <Thumbnail>
      <MediaPill {...args} />
    </Thumbnail>
  ),
};

export const Image: Story = {
  args: { type: 'image' },
  render: (args) => (
    <Thumbnail>
      <MediaPill {...args} />
    </Thumbnail>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group spacing={spacing.xl}>
      <Stack align='center' spacing={spacing.xs}>
        <Thumbnail size={120}>
          <MediaPill duration='0:15' size='xs' type='video' />
        </Thumbnail>
        <Text variant='label'>xs</Text>
      </Stack>
      <Stack align='center' spacing={spacing.xs}>
        <Thumbnail size={160}>
          <MediaPill duration='0:30' size='sm' type='video' />
        </Thumbnail>
        <Text variant='label'>sm</Text>
      </Stack>
    </Group>
  ),
};

export const Matrix: Story = {
  render: () => (
    <Group spacing={spacing.lg}>
      <Thumbnail>
        <MediaPill duration='0:06' type='video' />
      </Thumbnail>
      <Thumbnail>
        <MediaPill duration='1:24' type='video' />
      </Thumbnail>
      <Thumbnail>
        <MediaPill type='image' />
      </Thumbnail>
      <Thumbnail>
        <MediaPill imageLabel='GIF' type='image' />
      </Thumbnail>
    </Group>
  ),
};
