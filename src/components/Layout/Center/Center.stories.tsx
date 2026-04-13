import type { Meta, StoryObj } from '@storybook/react-vite';
import { Center } from './Center';
import { Text } from '../../Typography/Text/Text';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Title } from '../../Typography/Title/Title';
import { Card, Stack } from '../../..';

const meta: Meta<typeof Center> = {
  title: 'Components/Layout/Center',
  component: Center,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Content within the container to center',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the center container',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'auto' },
      },
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the center container',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'auto' },
      },
    },
    sx: {
      control: { type: 'object' },
      description: 'Custom styles applied to the root element',
      table: {
        type: { summary: 'CSSObject' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: undefined,
    width: '400px',
    height: '400px',
    sx: {
      backgroundColor: neutral[25],
    },
  },
  render: (args) => (
    <Center {...args}>
      <Text>Centered Content</Text>
    </Center>
  ),
};

const SampleCard = ({ title, description }: { title: string; description: string }) => (
  <Card animate>
    <Title variant="cardHeader">{title}</Title>
    <Title variant="cardSubheader">{description}</Title>
  </Card>
);

export const CenteringLayouts: Story = {
  args: {
    height: '500px',
    width: '700px',
    sx: {
      backgroundColor: neutral[25],
      border: `1px dashed ${neutral[50]}`,
    },
  },
  render: (args) => (
    <Center {...args}>
      <Stack spacing={spacing.md} sx={{ width: '300px'}}>
        <SampleCard title="Card 1" description="Centered layout" />
        <SampleCard title="Card 2" description="Centered layout" />
        <SampleCard title="Card 3" description="Centered layout" />
      </Stack>
    </Center>
  ),
};