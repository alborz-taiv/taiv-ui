import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './Button';
import { Group } from '../../../Layout/Group/Group';
import { IconPlus, IconEdit, IconTrash, IconDeviceFloppy } from '@tabler/icons-react';


const meta: Meta<typeof Button> = {
  title: 'Components/Inputs/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/button/)\n\nThe Button component is a customizable wrapper around Mantine's Button component that provides consistent styling and behavior across your application. It extends Mantine v6's ButtonProps while adding custom variants and sizing options.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: "Controls the button's height, padding, and font size",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'cancel', 'success', 'warning', 'text', 'nav'],
      description: "Defines the button's visual style and color scheme",
      table: {
        type: { summary: "'primary' | 'secondary' | 'cancel' | 'success' | 'warning' | 'text' | 'nav'" },
        defaultValue: { summary: "'primary'" },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Button label or content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the button span the full width of its container. Useful for modals, forms, etc. with a proper Grid layout',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    leftIcon: {
      control: { type: 'select' },
      options: ['Plus', 'Edit', 'Trash', 'Save'],
      mapping: {
        Plus: <IconPlus size={16} />,
        Edit: <IconEdit size={16}/>,
        Trash: <IconTrash size={16}/>,
        Save: <IconDeviceFloppy size={16}/>,
      },
      description: 'Adds icon before button label - you can import any icon',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    rightIcon: {
      control: { type: 'select' },
      options: ['Plus', 'Edit', 'Trash', 'Save'],
      mapping: {
        Plus: <IconPlus size={16} />,
        Edit: <IconEdit size={16}/>,
        Trash: <IconTrash size={16}/>,
        Save: <IconDeviceFloppy size={16}/>,
      },
      description: 'Adds icon after button label - you can import any icon',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object',
      table: {
        type: { summary: 'MantineStylesObject' },
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
    loading: {
      control: { type: 'boolean' },
      description: 'Indicate loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
    toggled: {
      control: { type: 'boolean' },
      description: 'Toggles the button state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    shadow: {
      control: { type: 'boolean' },
      description: 'Adds shadow to the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    size: 'md',
    variant: 'primary',
    disabled: false,
    loading: false,
    fullWidth: false,
    shadow: false,
    toggled: false,
    leftIcon: undefined,
    rightIcon: undefined,
    styles: undefined,
    onClick: () => {},
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap="16px">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="cancel">Cancel</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="text">Text</Button>
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap="16px">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Group>
  ),
};

export const States: Story = {
  render: () => (
    <Group gap="16px">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </Group>
  ),
};

export const TogglingButtons: Story = {
  render: () => {
    const [toggled, setToggled] = useState(false);

    return (
      <Group gap="16px">
        <Button toggled={toggled} onClick={() => setToggled(!toggled)}>
          {toggled ? 'On' : 'Off'}
        </Button>
      </Group>
    );
  },
};

export const CustomStyles: Story = {
  args: {
    children: 'Custom Button',
    styles: {
      root: {
        borderRadius: '20px',
        background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        '&:hover': {
          background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
        },
      },
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Button
  styles={{
    root: {
      borderRadius: '20px',
      background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
      '&:hover': {
        background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
      },
    },
  }}
>
  Custom Button
</Button>`,
      },
    },
  },
};
