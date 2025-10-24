import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './Box';
import { Group } from '../Group/Group';

const meta: Meta<typeof Box> = {
  title: 'Components/Layout/Box',
  component: Box,
  argTypes: {
    width: {
      control: { type: 'text' },
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Box lets you add inline styles with sx prop',
  },
  parameters: {
    docs: {
      source: {
        code: `<Box
  sx={(theme) => ({
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    textAlign: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  })}
>
  Box lets you add inline styles with sx prop
</Box>`,
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <Group gap="2rem">
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.blue[0],
          padding: theme.spacing.md,
          borderRadius: theme.radius.md,
          textAlign: 'left',
          border: `1px solid ${theme.colors.blue[3]}`,
        })}
      >
        Left Aligned
      </Box>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.green[0],
          padding: theme.spacing.md,
          borderRadius: theme.radius.md,
          textAlign: 'center',
          border: `1px solid ${theme.colors.green[3]}`,
        })}
      >
        Center Aligned
      </Box>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.orange[0],
          padding: theme.spacing.md,
          borderRadius: theme.radius.md,
          textAlign: 'right',
          border: `1px solid ${theme.colors.orange[3]}`,
        })}
      >
        Right Aligned
      </Box>
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box
  sx={(theme) => ({
    textAlign: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.blue[0],
  })}
>
  Center Aligned Content
</Box>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.red[0],
          color: theme.colors.red[9],
          padding: theme.spacing.lg,
          borderRadius: theme.radius.lg,
          border: `2px solid ${theme.colors.red[3]}`,
          boxShadow: theme.shadows.md,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows.lg,
          },
        })}
      >
        Custom Styled Box
      </Box>
      <Box
        sx={(theme) => ({
          background: `linear-gradient(45deg, ${theme.colors.violet[3]}, ${theme.colors.pink[3]})`,
          color: 'white',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.xl,
          textAlign: 'center',
          fontWeight: 600,
          boxShadow: theme.shadows.xl,
        })}
      >
        Gradient Box
      </Box>
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};
