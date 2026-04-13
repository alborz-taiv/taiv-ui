import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { AutoGrid } from '../AutoGrid/AutoGrid';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import { primary } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
      description: 'The content to display inside the card',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    radius: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Border radius of the card',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number" },
        defaultValue: { summary: "'20px'" },
      },
    },
    withBorder: {
      control: { type: 'boolean' },
      description: 'Show/hide card border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
    sx: {
      control: { type: 'object' },
      description: 'Custom styles to override with if necessary. Targets the root card element.',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: undefined,
    animate: false,
    radius: '20px',
    withBorder: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Card {...args}>
      <Title variant="cardHeader">Card Title</Title>
      <Title variant="cardSubheader">This is a basic card component that provides a clean container for grouping related content.</Title>
    </Card>
  ),
};

export const Animation: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card animate>
        <Title variant="cardHeader">Hover over me</Title>
        <Title variant="cardSubheader">This card lifts and enhances on hover.</Title>
      </Card>
    </div>
  ),
};

export const WithAutoGrid: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <AutoGrid cols={3} spacing={spacing.md}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} animate>
            <Title variant="cardHeader">Card {item}</Title>
            <Title variant="cardSubheader">Card content</Title>
          </Card>
        ))}
      </AutoGrid>
    </div>
  ),
};

export const CustomStyling: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <Card withBorder={false} sx={{ background: primary[25], border: `1px solid ${primary[50]}` }}>
      <Title variant="cardHeader">Custom Card</Title>
      <Title variant="cardSubheader">Styled with a custom background color and border.</Title>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card
  withBorder={false}
  sx={{ background: primary[25], border: '1px solid ${primary[50]}' }}
>
  <Title variant="cardHeader">Custom Card</Title>
  <Text>Styled with a custom background color and border.</Text>
</Card>`,
      },
    },
  },
};