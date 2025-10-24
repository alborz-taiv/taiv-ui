import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof Radio> = {
  title: 'Components/Inputs/Controls/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Radio label',
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
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Radio value',
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
    label: 'Option 1',
    value: 'option1',
    checked: false,
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<Radio
  label="Option 1"
  value="option1"
  checked={selectedValue === 'option1'}
  onChange={(event) => setSelectedValue(event.currentTarget.value)}
/>`,
      },
    },
  },
};

export const RadioGroup: Story = {
  render: () => (
    <Group gap="2rem">
      <Radio label="Option 1" value="option1" checked={true} />
      <Radio label="Option 2" value="option2" checked={false} />
      <Radio label="Option 3" value="option3" checked={false} />
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
      <Radio label="Normal Radio" value="normal" checked={true} />
      <Radio label="Disabled Radio" value="disabled" checked={false} disabled />
      <Radio label="Radio with Description" description="This is a description that provides additional context" value="description" checked={false} />
      <Radio label="Radio with Error" error="This field is required" value="error" checked={false} />
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
      <Radio
        label="Custom Styled Radio"
        value="custom1"
        checked={true}
        styles={{
          radio: {
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
      <Radio
        label="Another Custom Style"
        value="custom2"
        checked={false}
        styles={{
          radio: {
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
