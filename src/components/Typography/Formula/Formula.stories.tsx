import type { Meta, StoryObj } from '@storybook/react-vite';
import { Formula } from './Formula';
import { Stack } from '../../Layout/Stack/Stack';
import { primary } from '../../../constants/colors';

const meta: Meta<typeof Formula> = {
  title: 'Components/Typography/Formula',
  component: Formula,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    expression: {
      control: { type: 'text' },
      description: 'The mathematical expression string to parse and render',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Override for the font size',
      table: {
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'" },
        defaultValue: { summary: 'From "body" text variant' },
      },
    },
    weight: {
      control: { type: 'select' },
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Override for the font weight',
      table: {
        type: { summary: "'light' | 'regular' | 'medium' | 'semibold' | 'bold'" },
        defaultValue: { summary: 'From "body" text variant' },
      },
    },
    color: {
      control: { type: 'color' },
      description: 'Override for the text color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'From "body" text variant' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    expression: 'x + y = z',
    size: undefined,
    weight: undefined,
    color: undefined,
  },
};

export const Operations: Story = {
  render: () => (
    <Stack gap="1rem">
      <Formula expression="a + b" />
      <Formula expression="a - b" />
      <Formula expression="a * b" />
      <Formula expression="a / b" />
      <Formula expression="Revenue_a * Revenue_b" />
    </Stack>
  ),
};

export const StructuringEquations: Story = {
  parameters: {
    docs: {
      source: {
        code: `{/* b/c as fraction, then add a */}
<Formula expression="a + b / c" />

{/* (a + b) as the numerator */}
<Formula expression="(a + b) / c" />

{/* complex numerator and denominator */}
<Formula expression="(a + b) / (c + d)" />`,
      },
    },
  },
  render: () => (
    <Stack gap="1rem">
      <Formula expression="a + b / c" />
      <Formula expression="(a + b) / c" />
      <Formula expression="(a + b) / (c + d)" />
    </Stack>
  ),
};

export const CustomOverrides: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Formula expression="(a + b) / c" size="xl" weight="semibold" color={primary[200]} />`,
      },
    },
  },
  render: () => (
    <Formula expression="(a + b) / c" size="xl" weight="semibold" color={primary[200]} />
  ),
};
