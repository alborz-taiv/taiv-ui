import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionCard } from './SectionCard';
import { AutoGrid } from '../AutoGrid/AutoGrid';
import { Text } from '../../Typography/Text/Text';
import { IconBadge } from '../../Misc/IconBadge/IconBadge';
import { IconChartArrowsVertical, IconEye } from '@tabler/icons-react';
import { Group } from '../Group/Group';
import { Title } from '../../Typography/Title/Title';
import { neutral } from '../../../constants/colors';

const meta: Meta<typeof SectionCard> = {
  title: 'Components/Layout/SectionCard',
  component: SectionCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Main title displayed in the card header',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Optional subtitle displayed below the main title',
      table: {
        type: { summary: 'string' },
      },
    },
    animate: {
      control: { type: 'boolean' },
      description: 'Enable a lifting hover animation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: false,
      description: 'Content displayed in the card body',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    radius: {
      control: { type: 'text' },
      description: 'Border radius of the card',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'20px'" },
      },
    },
    shadow: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow depth of the card',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'lg'" },
      },
    },
    p: {
      control: { type: 'text' },
      description: 'Padding of the card',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'8px'" },
      },
    },
    withBorder: {
      control: { type: 'boolean' },
      description: 'Whether to show card border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: undefined,
    title: 'Impressions This Week',
    subtitle: 'Total impressions at all locations',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <SectionCard {...args}>
      <Group gap="10px">
        <IconBadge icon={<IconEye size={30} />} color="salmon" />
        <Title weight="semibold" size="2xl" color={neutral[200]}>55,000</Title>
      </Group>
    </SectionCard>
  ),
};

export const Animation: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SectionCard title="Example Card" subtitle="With an example subtitle" animate>
        <Text variant="subtle">This card lifts on hover</Text>
      </SectionCard>
    </div>
  ),
};

export const WithAutoGrid: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <AutoGrid cols={2}>
        {['Example Card 1', 'Example Card 2', 'Example Card 3', 'Example Card 4'].map((label, i) => (
          <SectionCard key={label} title={label} subtitle="With an example subtitle" animate>
            <div/>
          </SectionCard>
        ))}
      </AutoGrid>
    </div>
  ),
};