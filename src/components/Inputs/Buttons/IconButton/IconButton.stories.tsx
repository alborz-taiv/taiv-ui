import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Icon12Hours,
  Icon24Hours,
  Icon360View,
  IconAdjustments,
  IconAlertCircle,
  IconArrowLeft,
  IconArrowRight,
  IconArrowsMaximize,
  IconCaretDown,
  IconCheck,
  IconClock,
  IconClock2,
  IconDots,
  IconHistory,
  IconLoader2,
  IconPlayerPlay,
  IconTrash,
} from '@tabler/icons-react';
import { spacing } from '../../../../constants/spacing';
import { Group } from '../../../Layout/Group/Group';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  argTypes: {
    children: {
      control: { type: 'object' },
      description: 'Icon to be displayed in the button',
      table: {
        defaultValue: { summary: '<IconHistory />' },
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
      description:
        "Controls the button's height and padding. These values are square sizes.",
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
    subtle: {
      control: { type: 'boolean' },
      description:
        'Colors the icon instead of the background and reverses the color based on the variant',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    variant: {
      control: { type: 'select' },
      description:
        "Defines the button's visual style and color scheme. `ghost` is the variant for icon buttons placed on a deliberately-dark surface — see the *On Dark Surface* story.",
      options: [
        'primary',
        'secondary',
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
            "'primary' | 'secondary' | 'cancel' | 'success' | 'warning' | 'text' | 'nav' | 'ghost'",
        },
      },
    },
  },
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/button/)\n\nThe IconButton component is a customizable wrapper around Mantine's Button component that provides consistent styling and behavior across your application. It extends Mantine v6's ButtonProps while adding custom variants and sizing options.",
      },
    },
    layout: 'centered',
  },
  title: 'Components/Inputs/Buttons/IconButton',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <IconHistory />,
    disabled: false,
    loading: false,
    onClick: () => {},
    shadow: false,
    size: 'md',
    styles: {},
    subtle: false,
    variant: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <IconButton variant='primary'>
        <Icon12Hours />
      </IconButton>
      <IconButton variant='secondary'>
        <Icon24Hours />
      </IconButton>
      <IconButton variant='cancel'>
        <IconClock />
      </IconButton>
      <IconButton variant='success'>
        <IconCheck />
      </IconButton>
      <IconButton variant='warning'>
        <IconAlertCircle />
      </IconButton>
      <IconButton variant='text'>
        <IconClock2 />
      </IconButton>
    </Group>
  ),
};

export const Subtle: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <IconButton subtle variant='primary'>
        <Icon12Hours />
      </IconButton>
      <IconButton subtle variant='secondary'>
        <Icon24Hours />
      </IconButton>
      <IconButton subtle variant='cancel'>
        <IconClock />
      </IconButton>
      <IconButton subtle variant='success'>
        <IconCheck />
      </IconButton>
      <IconButton subtle variant='warning'>
        <IconAlertCircle />
      </IconButton>
      <IconButton subtle variant='text'>
        <IconClock2 />
      </IconButton>
    </Group>
  ),
};

export const OnDarkSurface: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `variant="ghost"` for icon buttons on deliberately-dark surfaces. Brand-saturated variants (`success`, `cancel`, `primary`, `warning`) keep their usual styling — saturated colors read fine on either surface.',
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
        <IconButton variant='ghost'>
          <IconPlayerPlay />
        </IconButton>
        <IconButton variant='ghost'>
          <IconDots />
        </IconButton>
        <IconButton variant='success'>
          <IconCheck />
        </IconButton>
        <IconButton variant='cancel'>
          <IconTrash />
        </IconButton>
      </Group>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <IconButton size='sm'>
        <Icon360View />
      </IconButton>
      <IconButton size='md'>
        <IconAdjustments />
      </IconButton>
      <IconButton size='lg'>
        <IconArrowsMaximize />
      </IconButton>
    </Group>
  ),
};

export const States: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <IconButton>
        <IconArrowLeft />
      </IconButton>
      <IconButton disabled>
        <IconCaretDown />
      </IconButton>
      <IconButton loading>
        <IconLoader2 />
      </IconButton>
      <IconButton shadow>
        <IconArrowLeft />
      </IconButton>
    </Group>
  ),
};

export const SubtleStates: Story = {
  render: () => (
    <Group gap={spacing.lg}>
      <IconButton subtle>
        <IconArrowLeft />
      </IconButton>
      <IconButton disabled subtle>
        <IconCaretDown />
      </IconButton>
      <IconButton loading subtle>
        <IconLoader2 />
      </IconButton>
      <IconButton shadow subtle>
        <IconArrowLeft />
      </IconButton>
    </Group>
  ),
};

export const CustomStyles: Story = {
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
  render: () => (
    <Group gap={spacing.lg}>
      <IconButton
        styles={{
          root: {
            '&:hover': {
              background: 'linear-gradient(45deg, #ee5a24, #ff6b6b)',
            },
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
            borderRadius: '20px',
          },
        }}
      >
        <IconArrowLeft />
      </IconButton>
      <IconButton
        styles={{
          root: {
            '&:hover': {
              background: 'white',
              color: 'black',
            },
            background: 'black',
            border: '2px solid white',
            borderRadius: '0px',
            color: 'white',
          },
        }}
      >
        <IconArrowRight />
      </IconButton>
    </Group>
  ),
};
