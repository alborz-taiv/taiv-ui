import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { Card } from '../Card/Card';
import { Title } from '../../Typography/Title/Title';
import { Stack } from '../Stack/Stack';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Text } from '../../Typography/Text/Text';

const meta: Meta<typeof Grid> = {
  title: 'Components/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content for the Grid - each child node should also be within a <Grid.Col> element',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    gutter: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing between columns',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number" },
        defaultValue: { summary: "'md'" },
      },
    },
    align: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'Vertical alignment of grid items',
      table: {
        type: { summary: "'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'" },
      },
    },
    justify: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Horizontal alignment of grid items',
      table: {
        type: { summary: "'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'" },
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
  <Card animate>
    <Title variant="cardHeader">{title}</Title>
    <Title variant="cardSubheader">{description}</Title>
  </Card>
);

export const Default: Story = {
  args: {
    children: undefined,
    gutter: undefined,
    align: undefined,
    justify: undefined,
    styles: undefined,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '700px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Grid {...args}>
      <Grid.Col span={4}>
        <SampleCard title="Column 1" description="span={4}" />
      </Grid.Col>
      <Grid.Col span={4}>
        <SampleCard title="Column 2" description="span={4}" />
      </Grid.Col>
      <Grid.Col span={4}>
        <SampleCard title="Column 3" description="span={4}" />
      </Grid.Col>
    </Grid>
  ),
};

export const ColumnSpans: Story = {
  render: () => (
    <Stack spacing={spacing.md} sx={{ width: '700px' }}>
      <Grid gutter="md">
        <Grid.Col span={6}><SampleCard title="Column 1" description="span={6}" /></Grid.Col>
        <Grid.Col span={6}><SampleCard title="Column 2" description="span={6}" /></Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={8}><SampleCard title="Main Content" description="span={8}" /></Grid.Col>
        <Grid.Col span={4}><SampleCard title="Sidebar" description="span={4}" /></Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={4}><SampleCard title="Column 1" description="span={4}" /></Grid.Col>
        <Grid.Col span={4}><SampleCard title="Column 2" description="span={4}" /></Grid.Col>
        <Grid.Col span={4}><SampleCard title="Column 3" description="span={4}" /></Grid.Col>
      </Grid>
      <Grid gutter="md">
        <Grid.Col span={3}><SampleCard title="Left" description="span={3}" /></Grid.Col>
        <Grid.Col span={6}><SampleCard title="Center" description="span={6}" /></Grid.Col>
        <Grid.Col span={3}><SampleCard title="Right" description="span={3}" /></Grid.Col>
      </Grid>
    </Stack>
  ),
};
