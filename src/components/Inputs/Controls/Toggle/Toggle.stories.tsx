import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from '../../../Layout/Group/Group';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Controlled checked state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    variant: {
      control: { type: 'select' },
      description:
        'Visual variant. "error" swaps the active track to red and renders an X icon inside the thumb — use for destructive semantics (e.g. "on = blocked").',
      options: ['primary', 'error'],
      table: {
        defaultValue: { summary: "'primary'" },
        type: { summary: "'primary' | 'error'" },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description, displayed after label',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    error: {
      control: { type: 'text' },
      description: 'Displays error message after input',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Toggle label displayed next to the switch',
      table: {
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      control: { type: 'select' },
      description: 'Position of label',
      options: ['left', 'right'],
      table: {
        defaultValue: { summary: '"left"' },
        type: { summary: '"left" | "right"' },
      },
    },
    offLabel: {
      control: { type: 'text' },
      description: 'Inner label when Switch is in unchecked state',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Change handler function',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onLabel: {
      control: { type: 'text' },
      description: 'Inner label when Switch is in checked state',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    size: {
      control: { type: 'select' },
      description: 'Controls the toggle size and label font size',
      options: ['sm', 'md'],
      table: {
        defaultValue: { summary: "'md'" },
        type: { summary: "'sm' | 'md'" },
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
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Inputs/Controls/Toggle',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Enable notifications',
    labelPosition: 'left',
    onChange: () => {},
    size: 'md',
    styles: undefined,
    variant: 'primary',
  },
  render: function Render(args) {
    return <Toggle {...args} />;
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <Toggle checked={true} label='Small Toggle' size='sm' />
      <Toggle checked={false} label='Medium Toggle (Default)' size='md' />
    </Group>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <Toggle checked={true} label='Normal Toggle' />
      <Toggle checked={false} disabled label='Disabled Toggle' />
      <Toggle
        checked={true}
        description='This is a description that provides additional context'
        label='Toggle with Description'
      />
      <Toggle
        checked={false}
        error='This field is required'
        label='Toggle with Error'
      />
    </Group>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `variant="error"` when the toggled-on state has destructive semantics (e.g. a category is blocked). The active track turns red and a tabler X icon renders inside the thumb while checked.',
      },
      source: {
        code: `<Toggle label="Block this category" checked={isBlocked} variant="error" onChange={...} />`,
      },
    },
  },
  render: () => (
    <Group gap='32px'>
      <Toggle checked={true} label='Primary (default)' variant='primary' />
      <Toggle checked={true} label='Error — on means blocked' variant='error' />
      <Toggle checked={false} label='Error — off state' variant='error' />
    </Group>
  ),
};

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <Toggle checked={true} />
      <Toggle checked={false} />
    </Group>
  ),
};

export const CustomStyles: Story = {
  parameters: {
    docs: {
      source: {
        code: false,
      },
    },
  },
  render: () => (
    <Group gap='20px'>
      <Toggle
        checked={true}
        label='Custom Styled Toggle'
        styles={{
          label: {
            color: '#495057',
            fontWeight: 600,
          },
          thumb: {
            backgroundColor: '#ffffff',
            border: '2px solid #dee2e6',
          },
          track: {
            backgroundColor: '#ff6b6b',
          },
        }}
      />
      <Toggle
        checked={false}
        label='Another Custom Style'
        styles={{
          label: {
            color: '#4CAF50',
            fontSize: '16px',
          },
          thumb: {
            backgroundColor: '#ffffff',
            border: '2px solid #2E7D32',
          },
          track: {
            backgroundColor: '#4CAF50',
          },
        }}
      />
    </Group>
  ),
};
