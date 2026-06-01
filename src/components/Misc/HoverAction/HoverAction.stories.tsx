import type { Meta, StoryObj } from '@storybook/react-vite';
import { HoverAction } from './HoverAction';
import { Card } from '../../Layout/Card/Card';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import { spacing } from '../../../constants/spacing';
import { neutral } from '../../../constants/colors';

const SlidePreview = ({ label = 'Calamari' }: { label?: string }) => (
  <Stack gap={spacing.xs}>
    <div
      style={{
        width: 160,
        height: 110,
        borderRadius: 8,
        background: `linear-gradient(135deg, ${neutral[50]}, ${neutral[100]})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text variant='label' style={{ color: neutral[300] }}>
        {label}
      </Text>
    </div>
    <Text variant='label'>{label}</Text>
  </Stack>
);

const meta: Meta<typeof HoverAction> = {
  title: 'Components/Misc/HoverAction',
  component: HoverAction,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Wraps any content with a floating icon button pinned to the top-right corner. The button fades in when the wrapped content is hovered. Variants: close, trash, edit. Click handler is called with propagation stopped, so wrapping interactive cards is safe.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['close', 'trash', 'edit'],
      table: { defaultValue: { summary: "'close'" } },
    },
    showBackground: {
      control: { type: 'boolean' },
      description: 'Always show white circle background (vs transparent until hover)',
      table: { defaultValue: { summary: 'false' } },
    },
    offset: {
      control: { type: 'number' },
      description: 'Pixels the button pokes out of the top-right corner',
      table: { defaultValue: { summary: '10' } },
    },
    visible: {
      control: { type: 'boolean' },
      description: 'Manual override for visibility. When unset, button shows on hover.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HoverAction>;

export const Default: Story = {
  args: {
    variant: 'close',
    showBackground: true,
    offset: 10,
  },
  render: (args) => (
    <HoverAction {...args} onClick={() => console.log('clicked')}>
      <SlidePreview />
    </HoverAction>
  ),
};

export const Variants: Story = {
  render: () => (
    <Group gap={spacing.xl}>
      <HoverAction variant='close' showBackground onClick={() => console.log('close')}>
        <SlidePreview label='Close' />
      </HoverAction>
      <HoverAction variant='trash' showBackground onClick={() => console.log('trash')}>
        <SlidePreview label='Trash' />
      </HoverAction>
      <HoverAction variant='edit' showBackground onClick={() => console.log('edit')}>
        <SlidePreview label='Edit' />
      </HoverAction>
    </Group>
  ),
};

export const HiddenUntilHover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'With `showBackground={false}` (default), the button is fully hidden until the wrapper is hovered. Matches the Taiv app slide-preview pattern.',
      },
    },
  },
  render: () => (
    <HoverAction variant='close' onClick={() => console.log('close')}>
      <SlidePreview label='Hover me' />
    </HoverAction>
  ),
};

export const AlwaysVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `visible` explicitly to bypass the internal hover state.',
      },
    },
  },
  render: () => (
    <HoverAction variant='trash' showBackground visible onClick={() => console.log('delete')}>
      <SlidePreview label='Always shown' />
    </HoverAction>
  ),
};

export const WrappingACard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Wrapping an interactive Card. Clicking the close button stops propagation — the card onClick does not fire.',
      },
    },
  },
  render: () => (
    <HoverAction variant='close' showBackground onClick={() => alert('Removed!')}>
      <div onClick={() => alert('Card clicked')} style={{ cursor: 'pointer', width: 240 }}>
        <Card>
          <Stack gap={spacing.xs}>
            <Title variant='cardHeader'>Calamari</Title>
            <Text variant='subtle'>Crispy. Hot. Delicious.</Text>
          </Stack>
        </Card>
      </div>
    </HoverAction>
  ),
};

export const CustomOffset: Story = {
  render: () => (
    <Group gap={spacing.xl}>
      <HoverAction variant='close' showBackground offset={0} onClick={() => {}}>
        <SlidePreview label='offset=0' />
      </HoverAction>
      <HoverAction variant='close' showBackground offset={10} onClick={() => {}}>
        <SlidePreview label='offset=10' />
      </HoverAction>
      <HoverAction variant='close' showBackground offset={20} onClick={() => {}}>
        <SlidePreview label='offset=20' />
      </HoverAction>
    </Group>
  ),
};
