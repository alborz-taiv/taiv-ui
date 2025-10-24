import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Inputs/Controls/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Controls the toggle size and label font size',
      table: {
        type: { summary: "'sm' | 'md'" },
        defaultValue: { summary: "'md'" },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Controlled checked state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Toggle label displayed next to the switch',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description, displayed after label',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    error: {
      control: { type: 'text' },
      description: 'Displays error message after input',
      table: {
        type: { summary: 'ReactNode' },
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
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of label',
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"left"' },
      },
    },
    onLabel: {
      control: { type: 'text' },
      description: 'Inner label when Switch is in checked state',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    offLabel: {
      control: { type: 'text' },
      description: 'Inner label when Switch is in unchecked state',
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
    onChange: {
      action: 'changed',
      description: 'Change handler function',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
    size: 'md',
    disabled: false,
    labelPosition: 'left',
  },
  parameters: {
    docs: {
      source: {
        code: `<Toggle
  label="Enable notifications"
  checked={isEnabled}
  onChange={(event) => setIsEnabled(event.currentTarget.checked)}
/>`,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <Toggle size="sm" label="Small Toggle" checked={true} />
      <Toggle size="md" label="Medium Toggle (Default)" checked={false} />
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

export const States: Story = {
  render: () => (
    <Group gap="2rem">
      <Toggle label="Normal Toggle" checked={true} />
      <Toggle label="Disabled Toggle" checked={false} disabled />
      <Toggle label="Toggle with Description" description="This is a description that provides additional context" checked={true} />
      <Toggle label="Toggle with Error" error="This field is required" checked={false} />
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

export const WithoutLabel: Story = {
  render: () => (
    <Group gap="2rem">
      <Toggle checked={true} />
      <Toggle checked={false} />
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

export const CustomStyles: Story = {
  render: () => (
    <Group gap="2rem">
      <Toggle
        label="Custom Styled Toggle"
        checked={true}
        styles={{
          track: {
            backgroundColor: '#ff6b6b',
          },
          thumb: {
            backgroundColor: '#ffffff',
            border: '2px solid #dee2e6',
          },
          label: {
            fontWeight: 600,
            color: '#495057',
          },
        }}
      />
      <Toggle
        label="Another Custom Style"
        checked={false}
        styles={{
          track: {
            backgroundColor: '#4CAF50',
          },
          thumb: {
            backgroundColor: '#ffffff',
            border: '2px solid #2E7D32',
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
