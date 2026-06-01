import type { Meta, StoryObj } from '@storybook/react-vite';
import { Title } from '../../Typography/Title/Title';
import { Card } from '../Card/Card';
import { AutoGrid } from './AutoGrid';

const meta: Meta<typeof AutoGrid> = {
  argTypes: {
    children: {
      control: false,
      description: 'Content for the AutoGrid - each child node is a grid item',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    cols: {
      control: { type: 'number' },
      description: 'Number of columns in each row',
      table: {
        defaultValue: { summary: '1' },
        type: { summary: 'number | ResponsiveObject' },
      },
    },
    spacing: {
      control: { type: 'select' },
      description: 'Horizontal spacing between items',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        defaultValue: { summary: "'md'" },
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number" },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles to override with if necessary',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
    verticalSpacing: {
      control: { type: 'select' },
      description: 'Vertical spacing between items',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number" },
      },
    },
  },
  component: AutoGrid,
  parameters: {
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/simple-grid/)\n\nThe AutoGrid component is a responsive grid where each item takes an equal amount of space. It extends Mantine v6's SimpleGrid component and provides automatic column distribution with customizable spacing.",
      },
    },
    layout: 'centered',
  },
  title: 'Components/Layout/AutoGrid',
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Card animate padding='lg'>
    <Title variant='cardHeader'>{title}</Title>
    <Title variant='cardSubheader'>{description}</Title>
  </Card>
);

const items = [
  { description: 'Grid item content', id: 1, title: 'Item 1' },
  { description: 'Grid item content', id: 2, title: 'Item 2' },
  { description: 'Grid item content', id: 3, title: 'Item 3' },
  { description: 'Grid item content', id: 4, title: 'Item 4' },
  { description: 'Grid item content', id: 5, title: 'Item 5' },
  { description: 'Grid item content', id: 6, title: 'Item 6' },
];

export const Default: Story = {
  args: {
    children: undefined,
    cols: 3,
    spacing: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <AutoGrid {...args}>
      {items.map((item) => (
        <SampleCard
          description={item.description}
          key={item.id}
          title={item.title}
        />
      ))}
    </AutoGrid>
  ),
};

export const ResponsiveCols: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass a responsive map to `cols` — Tailwind-style `base`/`sm`/`md`/`lg`/`xl`. Missing stops inherit from the next-smaller entry. Resize the viewport to see the grid reflow.',
      },
    },
  },
  render: () => (
    <AutoGrid cols={{ base: 1, lg: 3, sm: 2 }} spacing='md'>
      {items.map((item) => (
        <SampleCard
          description={item.description}
          key={item.id}
          title={item.title}
        />
      ))}
    </AutoGrid>
  ),
};
