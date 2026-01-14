import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import { Box } from '../Box/Box';

const meta: Meta<typeof Stack> = {
  title: 'Layouts/Stack',
  component: Stack,
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
      description: 'align-items CSS property',
      table: {
        type: { summary: 'AlignItems' },
      },
    },
    justify: {
      control: { type: 'select' },
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'justify-content CSS property',
      table: {
        type: { summary: 'JustifyContent' },
      },
    },
    spacing: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Gap between items',
      table: {
        type: { summary: 'number | "xs" | "sm" | "md" | "lg" | "xl"' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
    gap: {
      control: { type: 'text' },
      description: 'Custom gap value',
      table: {
        type: { summary: 'string' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleBox = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
  <Box
    sx={(theme) => ({
      backgroundColor: theme.colors[color][0],
      color: theme.colors[color][9],
      padding: theme.spacing.md,
      borderRadius: theme.radius.md,
      border: `1px solid ${theme.colors[color][3]}`,
      textAlign: 'center',
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    })}
  >
    {children}
  </Box>
);

export const Default: Story = {
  args: {
    align: 'stretch',
    justify: 'flex-start',
    spacing: 'md',
  },
  render: (args) => (
    <Stack {...args}>
      <SampleBox color="blue">Item 1</SampleBox>
      <SampleBox color="green">Item 2</SampleBox>
      <SampleBox color="orange">Item 3</SampleBox>
    </Stack>
  ),
};

export const JustifyAlignContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div>
        <h4>Justify Content</h4>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div>
            <strong>flex-start</strong>
            <Stack justify="flex-start" spacing="sm" style={{ height: '200px', border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>center</strong>
            <Stack justify="center" spacing="sm" style={{ height: '200px', border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>space-between</strong>
            <Stack justify="space-between" spacing="sm" style={{ height: '200px', border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
            </Stack>
          </div>
        </div>
      </div>
      <div>
        <h4>Align Items</h4>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          <div>
            <strong>stretch</strong>
            <Stack align="stretch" spacing="sm" style={{ height: '200px', border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>center</strong>
            <Stack align="center" spacing="sm" style={{ height: '200px', border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>flex-end</strong>
            <Stack align="flex-end" spacing="sm" style={{ height: '200px', border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack justify="center" align="center" spacing="md">
  <Box>Centered Item 1</Box>
  <Box>Centered Item 2</Box>
</Stack>`,
      },
    },
  },
};

export const SpacingGap: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
      <div>
        <h4>Theme Spacing</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <strong>xs</strong>
            <Stack spacing="xs" style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
              <SampleBox color="orange">Item 3</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>sm</strong>
            <Stack spacing="sm" style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
              <SampleBox color="orange">Item 3</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>md</strong>
            <Stack spacing="md" style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
              <SampleBox color="orange">Item 3</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>lg</strong>
            <Stack spacing="lg" style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
              <SampleBox color="orange">Item 3</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>xl</strong>
            <Stack spacing="xl" style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
              <SampleBox color="orange">Item 3</SampleBox>
            </Stack>
          </div>
        </div>
      </div>
      <div>
        <h4>Custom Gap</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <strong>2rem</strong>
            <Stack gap="2rem" style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
              <SampleBox color="orange">Item 3</SampleBox>
            </Stack>
          </div>
          <div>
            <strong>20px</strong>
            <Stack gap="20px" style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <SampleBox color="blue">Item 1</SampleBox>
              <SampleBox color="green">Item 2</SampleBox>
              <SampleBox color="orange">Item 3</SampleBox>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Stack spacing="lg">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>

<Stack gap="2rem">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>`,
      },
    },
  },
};
