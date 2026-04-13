import type { Meta, StoryObj } from '@storybook/react-vite';
import { AutoGrid } from './AutoGrid';
import { Card } from '../Card/Card';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';

const meta: Meta<typeof AutoGrid> = {
  title: 'Components/Layout/AutoGrid',
  component: AutoGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/simple-grid/)\n\nThe AutoGrid component is a responsive grid where each item takes an equal amount of space. It extends Mantine v6's SimpleGrid component and provides automatic column distribution with customizable spacing.",
      },
    },
  },
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
        type: { summary: 'number | ResponsiveObject' },
        defaultValue: { summary: '1' },
      },
    },
    spacing: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Horizontal spacing between items',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number" },
        defaultValue: { summary: "'md'" },
      },
    },
    verticalSpacing: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Vertical spacing between items',
      table: {
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleCard = ({ title, description }: { title: string; description: string }) => (
  <Card animate padding="lg">
    <Title variant="cardHeader">{title}</Title>
    <Title variant="cardSubheader">{description}</Title>
  </Card>
);

const items = [
  { id: 1, title: 'Item 1', description: 'Grid item content' },
  { id: 2, title: 'Item 2', description: 'Grid item content' },
  { id: 3, title: 'Item 3', description: 'Grid item content' },
  { id: 4, title: 'Item 4', description: 'Grid item content' },
  { id: 5, title: 'Item 5', description: 'Grid item content' },
  { id: 6, title: 'Item 6', description: 'Grid item content' },
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
        <SampleCard key={item.id} title={item.title} description={item.description} />
      ))}
    </AutoGrid>
  ),
};