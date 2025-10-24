import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Inputs/Controls/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Controls the checkbox size and label font size',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
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
      description: 'Checkbox label',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    description: {
      control: { type: 'text' },
      description: 'Description, displayed after the label',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    error: {
      control: { type: 'text' },
      description: 'Error message displayed after the input',
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
      description: 'Position of the label',
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"right"' },
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
    label: 'I agree to the terms and conditions',
    checked: false,
    size: 'md',
    disabled: false,
    labelPosition: 'right',
  },
  parameters: {
    docs: {
      source: {
        code: `<Checkbox
  label="I agree to the terms and conditions"
  checked={isChecked}
  onChange={(event) => setIsChecked(event.currentTarget.checked)}
/>`,
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Group gap="2rem">
      <Checkbox size="sm" label="Small Checkbox" checked={false} />
      <Checkbox size="md" label="Medium Checkbox (Default)" checked={true} />
      <Checkbox size="lg" label="Large Checkbox" checked={false} />
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
      <Checkbox label="Normal Checkbox" checked={true} />
      <Checkbox label="Disabled Checkbox" checked={false} disabled />
      <Checkbox label="Checkbox with Description" description="This is a description that provides additional context" checked={false} />
      <Checkbox label="Checkbox with Error" error="This field is required" checked={false} />
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
      <Checkbox
        label="Custom Styled Checkbox"
        checked={true}
        styles={{
          input: {
            '&:checked': {
              backgroundColor: '#ff6b6b',
              borderColor: '#ff6b6b',
            },
          },
          label: {
            fontWeight: 600,
            color: '#333',
          },
        }}
      />
      <Checkbox
        label="Another Custom Style"
        checked={false}
        styles={{
          input: {
            borderRadius: '50%',
            '&:checked': {
              backgroundColor: '#4CAF50',
              borderColor: '#4CAF50',
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
