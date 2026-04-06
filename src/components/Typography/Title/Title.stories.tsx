import type { Meta, StoryObj } from '@storybook/react-vite';
import { Title } from './Title';
import { Stack } from '../../Layout/Stack/Stack';
import { primary } from '../../../constants/colors';

const meta: Meta<typeof Title> = {
  title: 'Components/Typography/Title',
  component: Title,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/title/)\n\nThe Title component utilizes our heading variants to render semantic HTML heading elements with consistent styling. For body text, see the Text component instead.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['header', 'sectionHeader', 'subheader', 'sectionSubheader', 'cardHeader', 'cardSubheader'],
      description: 'The preset variant to use for styling',
      table: {
        type: { summary: "'header' | 'sectionHeader' | 'subheader' | 'sectionSubheader' | 'cardHeader' | 'cardSubheader'" },
        defaultValue: { summary: "'sectionHeader'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Override for the font size',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'" },
        defaultValue: { summary: 'Set by variant' },
      },
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Override for the font weight',
      table: {
        type: { summary: "'light' | 'regular' | 'medium' | 'semibold' | 'bold'" },
        defaultValue: { summary: 'Set by variant' },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'Override for the text color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Set by variant' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'The title content to render',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Override for other styling - use this sparingly',
      table: {
        type: { summary: 'CSSProperties' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Sample Title',
    variant: undefined,
    size: undefined,
    weight: undefined,
    color: undefined,
    styles: undefined,
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="1rem">
      <Title variant="header">Header</Title>
      <Title variant="sectionHeader">Section Header</Title>
      <Title variant="subheader">Subheader</Title>
      <Title variant="sectionSubheader">Section Subheader</Title>
      <Title variant="cardHeader">Card Header</Title>
      <Title variant="cardSubheader">Card Subheader</Title>
    </Stack>
  ),
};

export const CustomOverrides: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Title size="xl" weight="semibold" color={primary[200]}>
  Custom size, weight, and color
</Title>`,
      },
    },
  },
  args: {
    size: 'xl',
    weight: 'semibold',
    color: primary[200],
  },
  render: (args) => (
    <Title {...args}>
      Custom size, weight, and color
    </Title>
  ),
};
