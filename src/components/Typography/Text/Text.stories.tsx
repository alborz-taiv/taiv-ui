import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';
import { Stack } from '../../Layout/Stack/Stack';
import { primary } from '../../../constants/colors';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/text/)\n\nThe Text component is a customizable wrapper around Mantine's Text component that provides consistent typography styling across your application. It extends Mantine v6's TextProps while adding custom variants, sizes, and weights.",
      },
    },
  },
  argTypes: {
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
    children: {
      control: { type: 'text' },
      description: 'The text content to render',
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
    children: 'This is a sample text',
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
      <Text variant="body">This is body text</Text>
      <Text variant="subtle">This is subtle text</Text>
      <Text variant="label">This is label text</Text>
      <Text variant="caption">This is caption text</Text>
    </Stack>
  ),
};

export const CustomOverrides: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Text size="xl" weight="semibold" color={primary[200]}>
  Custom size, weight, and color
</Text>`,
      },
    },
  },
  args: {
    size: 'xl',
    weight: 'semibold',
    color: primary[200],
  },
  render: (args) => (
    <Text {...args}>
      Custom size, weight, and color
    </Text>
  ),  
};

export const WithFormatting: Story = {
  render: () => (
    <Text>
      This sentence has <b>bold text</b>, <i>italic text</i>, <code>inline code</code>, and text with a subscript like <sub>this</sub>.
    </Text>
  ),
};

