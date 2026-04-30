import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconDeviceFloppy,
  IconEdit,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { spacing } from '../../../../constants/spacing';
import { Group } from '../../../Layout/Group/Group';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Button label or content',
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
    fullWidth: {
      control: { type: 'boolean' },
      description:
        'Makes the button span the full width of its container. Useful for modals, forms, etc. with a proper Grid layout',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    leftIcon: {
      control: { type: 'select' },
      description: 'Adds icon before button label - you can import any icon',
      mapping: {
        Edit: <IconEdit size={16} />,
        Plus: <IconPlus size={16} />,
        Save: <IconDeviceFloppy size={16} />,
        Trash: <IconTrash size={16} />,
      },
      options: ['Plus', 'Edit', 'Trash', 'Save'],
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Indicate loading state',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
    rightIcon: {
      control: { type: 'select' },
      description: 'Adds icon after button label - you can import any icon',
      mapping: {
        Edit: <IconEdit size={16} />,
        Plus: <IconPlus size={16} />,
        Save: <IconDeviceFloppy size={16} />,
        Trash: <IconTrash size={16} />,
      },
      options: ['Plus', 'Edit', 'Trash', 'Save'],
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    shadow: {
      control: { type: 'boolean' },
      description: 'Adds shadow to the button',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: { type: 'select' },
      description: "Controls the button's height, padding, and font size",
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: "'md'" },
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    styles: {
      control: { type: 'object' },
      description: 'Custom styles object',
      table: {
        type: { summary: 'MantineStylesObject' },
      },
    },
    toggled: {
      control: { type: 'boolean' },
      description: 'Toggles the button state',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    variant: {
      control: { type: 'select' },
      description:
        "Defines the button's visual style and color scheme. `ghost` is the variant for buttons placed on a deliberately-dark surface (e.g. a `SelectionToolbar` pill) — see the *On Dark Surface* story.",
      options: [
        'primary',
        'secondary',
        'tertiary',
        'cancel',
        'success',
        'warning',
        'text',
        'nav',
        'ghost',
      ],
      table: {
        defaultValue: { summary: "'primary'" },
        type: {
          summary:
            "'primary' | 'secondary' | 'tertiary' | 'cancel' | 'success' | 'warning' | 'text' | 'nav' | 'ghost'",
        },
      },
    },
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/button/)\n\nThe Button component is a customizable wrapper around Mantine's Button component that provides consistent styling and behavior across your application. It extends Mantine v6's ButtonProps while adding custom variants and sizing options.",
      },
    },
    layout: 'centered',
  },
  title: 'Components/Inputs/Buttons/Button',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    disabled: false,
    fullWidth: false,
    leftIcon: undefined,
    loading: false,
    onClick: () => {},
    rightIcon: undefined,
    shadow: false,
    size: 'md',
    styles: undefined,
    toggled: false,
    variant: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='tertiary'>Tertiary</Button>
      <Button variant='cancel'>Cancel</Button>
      <Button variant='success'>Success</Button>
      <Button variant='warning'>Warning</Button>
      <Button variant='text'>Text</Button>
    </Group>
  ),
};

export const OnDarkSurface: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `variant="ghost"` for buttons on deliberately-dark surfaces (e.g. inside a dark `SelectionToolbar`). Brand-saturated variants (`success`, `cancel`, `primary`, `warning`) keep their usual styling — saturated colors read fine on either surface.',
      },
    },
  },
  render: () => (
    <div
      style={{
        backgroundColor: '#0F172A',
        borderRadius: '999px',
        padding: '12px 16px',
      }}
    >
      <Group gap={spacing.sm}>
        <Button variant='ghost'>Add to playlist</Button>
        <Button leftIcon={<IconPlus size={16} />} variant='ghost'>
          Create playlist
        </Button>
        <Button variant='success'>Add to Shuffle</Button>
        <Button leftIcon={<IconTrash size={16} />} variant='cancel'>
          Delete
        </Button>
      </Group>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <Button size='sm'>Small</Button>
      <Button size='md'>Medium</Button>
      <Button size='lg'>Large</Button>
    </Group>
  ),
};

export const States: Story = {
  render: () => (
    <Group gap={spacing.lg}>
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
      <Group gap={spacing.lg}>
        <Button onClick={() => setToggled(!toggled)} toggled={toggled}>
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
        '&:hover': {
          background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
        },
        background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
        borderRadius: '20px',
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
