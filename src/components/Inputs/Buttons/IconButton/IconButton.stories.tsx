import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { Icon12Hours, Icon24Hours, Icon360View, IconAdjustments, IconAlertCircle, IconArrowLeft, IconArrowRight, IconArrowsMaximize, IconCaretDown, IconCheck, IconClock, IconClock2, IconHistory, IconLoader2 } from '@tabler/icons-react';
import { Group } from '../../../Layout/Group/Group';

const meta: Meta<typeof IconButton> = {
  title: 'Components/Inputs/Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/button/)\n\nThe IconButton component is a customizable wrapper around Mantine's Button component that provides consistent styling and behavior across your application. It extends Mantine v6's ButtonProps while adding custom variants and sizing options.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: "Controls the button's height and padding. These values are square sizes.",
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
      control: { type: 'object' },
      description: 'Icon to be displayed in the button',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '<IconHistory />' },
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
    shadow: {
      control: { type: 'boolean' },
      description: 'Adds shadow to the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    subtle: {
      control: { type: 'boolean' },
      description: 'Colors the icon instead of the background and reverses the color based on the variant',
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
    children: <IconHistory />,
    size: 'md',
    variant: 'primary',
    disabled: false,
    loading: false,
    shadow: false,
    subtle: false,
    styles: {},
    onClick: () => {},
  },
};

export const NormalVariants: Story = {
  render: () => (
    <Group gap="1.6rem">
      <IconButton variant="primary"><Icon12Hours /></IconButton>
      <IconButton variant="secondary"><Icon24Hours /></IconButton>
      <IconButton variant="cancel"><IconClock /></IconButton>
      <IconButton variant="success"><IconCheck /></IconButton>
      <IconButton variant="warning"><IconAlertCircle /></IconButton>
      <IconButton variant="text"><IconClock2 /></IconButton>
    </Group>
  ),
};

export const SubtleVariants: Story = {
  render: () => (
    <Group gap="1.6rem">
      <IconButton variant="primary" subtle><Icon12Hours /></IconButton>
      <IconButton variant="secondary" subtle><Icon24Hours /></IconButton>
      <IconButton variant="cancel" subtle><IconClock /></IconButton>
      <IconButton variant="success" subtle><IconCheck /></IconButton>
      <IconButton variant="warning" subtle><IconAlertCircle /></IconButton>
      <IconButton variant="text" subtle><IconClock2 /></IconButton>
    </Group>
  ),
};

export const Tooltip: Story = {
  render: () => (
    <Group gap="1.6rem">
      <IconButton tooltip="Tooltip"><Icon12Hours /></IconButton>
    </Group>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap="1.6rem">
      <IconButton size="sm"><Icon360View /></IconButton>
      <IconButton size="md"><IconAdjustments /></IconButton>
      <IconButton size="lg"><IconArrowsMaximize /></IconButton>
    </Group>
  ),
};

export const States: Story = {
  render: () => (
    <Group gap="1.6rem">
      <IconButton><IconArrowLeft /></IconButton>
      <IconButton disabled><IconCaretDown /></IconButton>
      <IconButton loading><IconLoader2 /></IconButton>
      <IconButton shadow><IconArrowLeft /></IconButton>
    </Group>
  ),
};

export const SubtleStates: Story = {
  render: () => (
    <Group gap="1.6rem">
      <IconButton subtle><IconArrowLeft /></IconButton>
      <IconButton subtle disabled><IconCaretDown /></IconButton>
      <IconButton subtle loading><IconLoader2 /></IconButton>
      <IconButton subtle shadow><IconArrowLeft /></IconButton>
    </Group>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <Group gap="1.6rem">
      <IconButton
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
        <IconArrowLeft />
      </IconButton>
      <IconButton
        styles={{
          root: {
            borderRadius: '0px',
            background: 'black',
            color: 'white',
            border: '2px solid white',
            '&:hover': {
              background: 'white',
              color: 'black',
            },
          },
        }}
      >
        <IconArrowRight />
      </IconButton>
    </Group>
  ),
  parameters: {
    docs: {
      source: {
        code: `<IconButton
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
  <IconArrowLeft />
</IconButton>

<IconButton
  styles={{
    root: {
      borderRadius: '0px',
      background: 'black',
      color: 'white',
      border: '2px solid white',
      '&:hover': {
        background: 'white',
        color: 'black',
      },
    },
  }}
>
  <IconArrowRight />
</IconButton>`,
      },
    },
  },
};
