import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Inputs/TextInputs/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the textarea size',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Textarea label',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description text',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: { type: 'text' },
      description: 'Error message',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width of container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width',
      table: {
        type: { summary: 'string | number' },
      },
    },
    minRows: {
      control: { type: 'number' },
      description: 'Minimum number of rows',
      table: {
        type: { summary: 'number' },
      },
    },
    maxRows: {
      control: { type: 'number' },
      description: 'Maximum number of rows',
      table: {
        type: { summary: 'number' },
      },
    },
    autosize: {
      control: { type: 'boolean' },
      description: 'Auto-resize based on content',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object',
      table: {
        type: { summary: 'Record<string, CSSObject>' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
      table: {
        type: { summary: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message here...',
    size: 'md',
    disabled: false,
    required: false,
    fullWidth: false,
    autosize: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea
  label="Message"
  placeholder="Enter your message here..."
  value={message}
  onChange={(event) => setMessage(event.currentTarget.value)}
/>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="2rem">
      <TextArea label="Basic TextArea" />
      <TextArea label="With Placeholder" placeholder="Enter your text here..." />
      <TextArea label="With Description" description="This is a description" />
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

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <TextArea size="sm" label="Small TextArea" placeholder="Small textarea" />
      <TextArea size="md" label="Medium TextArea (Default)" placeholder="Medium textarea" />
      <TextArea size="lg" label="Large TextArea" placeholder="Large textarea" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TextArea size="sm" label="Small TextArea" placeholder="Small textarea" />
<TextArea size="lg" label="Large TextArea" placeholder="Large textarea" />`,
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <TextArea label="Normal TextArea" />
      <TextArea label="Disabled TextArea" disabled />
      <TextArea label="Required TextArea" required />
      <TextArea label="TextArea with Description" description="Please provide detailed information" />
      <TextArea label="TextArea with Error" error="This field is required" />
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

export const AdditionalFunctionality: Story = {
  render: () => (
    <Group gap="2rem">
      <TextArea label="Auto-resize TextArea" autosize placeholder="This will grow as you type..." />
      <TextArea label="Fixed Rows" minRows={3} maxRows={6} placeholder="Fixed height textarea" />
      <TextArea label="Custom Width TextArea" width="400px" placeholder="Custom width textarea" />
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TextArea
  label="Auto-resize TextArea"
  autosize
  placeholder="This will grow as you type..."
  value={content}
  onChange={(event) => setContent(event.currentTarget.value)}
/>

<TextArea
  label="Fixed Rows"
  minRows={3}
  maxRows={6}
  placeholder="Fixed height textarea"
  value={content}
  onChange={(event) => setContent(event.currentTarget.value)}
/>`,
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Group gap="2rem">
      <TextArea
        label="Custom Styled TextArea"
        styles={{
          input: {
            borderColor: '#ff6b6b',
            '&:focus': {
              borderColor: '#ff6b6b',
              boxShadow: '0 0 0 2px rgba(255, 107, 107, 0.2)',
            },
          },
          label: {
            color: '#ff6b6b',
            fontWeight: 600,
          },
        }}
      />
      <TextArea
        label="Another Custom Style"
        styles={{
          input: {
            backgroundColor: '#f8f9fa',
            borderColor: '#4CAF50',
            '&:focus': {
              borderColor: '#4CAF50',
              boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)',
            },
          },
          label: {
            color: '#4CAF50',
            fontSize: '16px',
          },
        }}
      />
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
