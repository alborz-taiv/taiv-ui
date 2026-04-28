import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from './Image';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { spacing } from '../../../constants/spacing';

const SAMPLE_SRC = 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?w=600';

const meta: Meta<typeof Image> = {
  title: 'Components/Misc/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Re-export of Mantine Image. Handles object-fit, placeholders, captions, and loading/error states. Use this instead of raw <img> so placeholder and caption behavior stays consistent.',
      },
    },
  },
  argTypes: {
    fit: {
      control: { type: 'select' },
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      table: { defaultValue: { summary: "'cover'" } },
    },
    radius: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    withPlaceholder: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: SAMPLE_SRC,
    alt: 'Sample',
    width: 320,
    height: 200,
    fit: 'cover',
    radius: 'md',
  },
};

export const Fits: Story = {
  render: () => (
    <Group gap={spacing.lg} align='flex-start'>
      {(['cover', 'contain', 'fill'] as const).map((fit) => (
        <Stack key={fit} gap={spacing.xs} align='center'>
          <Image src={SAMPLE_SRC} alt={fit} width={180} height={120} fit={fit} radius='md' />
          <Text variant='label'>{fit}</Text>
        </Stack>
      ))}
    </Group>
  ),
};

export const Radii: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      {(['xs', 'md', 'xl'] as const).map((radius) => (
        <Stack key={radius} gap={spacing.xs} align='center'>
          <Image src={SAMPLE_SRC} alt={radius} width={140} height={140} fit='cover' radius={radius} />
          <Text variant='label'>radius={radius}</Text>
        </Stack>
      ))}
    </Group>
  ),
};

export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the src fails or is missing, `withPlaceholder` renders a fallback.',
      },
    },
  },
  render: () => (
    <Group gap={spacing.lg}>
      <Image
        src='https://invalid.example.com/does-not-exist.jpg'
        alt='broken'
        width={200}
        height={140}
        radius='md'
        withPlaceholder
      />
      <Image
        src={null}
        alt='none'
        width={200}
        height={140}
        radius='md'
        withPlaceholder
        placeholder={<Text variant='label'>No image</Text>}
      />
    </Group>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Image
      src={SAMPLE_SRC}
      alt='Ocean sunset'
      width={320}
      height={200}
      fit='cover'
      radius='md'
      caption='Pacific ocean, golden hour'
    />
  ),
};
