import type { Meta, StoryObj } from '@storybook/react-vite';
import { UnstyledButton } from './UnstyledButton';

const meta: Meta<typeof UnstyledButton> = {
  title: 'Components/Inputs/Buttons/UnstyledButton',
  component: UnstyledButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/unstyled-button/)\n\nThe UnstyledButton component is a minimal wrapper around Mantine's UnstyledButton component that provides a clean slate for custom button implementations.",
      },
    },
  },
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Button content',
      table: {
        type: { summary: 'ReactNode' },
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
        type: { summary: '(event: React.MouseEvent<HTMLButtonElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Unstyled Button',
  },
  parameters: {
    docs: {
      source: {
        code: `<UnstyledButton>Unstyled Button</UnstyledButton>`,
      },
    },
  },
};

export const CustomStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <UnstyledButton
        styles={{
          root: {
            padding: '12px 24px',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
        }}
      >
        Gradient Button
      </UnstyledButton>
      <UnstyledButton
        styles={{
          root: {
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'transparent',
            color: '#667eea',
            border: '2px solid #667eea',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: '#667eea',
              color: 'white',
            },
            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed',
            },
          },
        }}
      >
        Outlined Button
      </UnstyledButton>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
};
