import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fraction } from './Fraction';
import { Stack } from '../../Layout/Stack/Stack';
import { primary } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Fraction> = {
  title: 'Components/Typography/Fraction',
  component: Fraction,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    numerator: {
      control: { type: 'text' },
      description: 'The content to display in the numerator',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    denominator: {
      control: { type: 'text' },
      description: 'The content to display in the denominator',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['body', 'subtle', 'label', 'caption'],
      description: 'The preset variant to use for styling',
      table: {
        type: { summary: "'body' | 'subtle' | 'label' | 'caption'" },
        defaultValue: { summary: "'body'" },
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    numerator: '1',
    denominator: '2',
    variant: undefined,
    size: undefined,
    weight: undefined,
    color: undefined,
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap={spacing.lg}>
      <Fraction numerator="1" denominator="2" variant="body" />
      <Fraction numerator="1" denominator="2" variant="subtle" />
      <Fraction numerator="1" denominator="2" variant="label" />
      <Fraction numerator="1" denominator="2" variant="caption" />
    </Stack>
  ),
};

export const CustomOverrides: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Fraction numerator="x + 1" denominator="y - 2" size="xl" weight="semibold" color={primary[200]} />`,
      },
    },
  },
  render: () => (
    <Fraction numerator="x + 1" denominator="y - 2" size="xl" weight="semibold" color={primary[200]} />
  ),
};
