import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCheck, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { neutral } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import { FAB } from './FAB';

const meta: Meta<typeof FAB> = {
  argTypes: {
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label — required since the FAB has no visible text',
    },
    hidden: {
      control: { type: 'boolean' },
      description: 'Force-hide the FAB regardless of viewport',
      table: { defaultValue: { summary: 'false' } },
    },
    mobileOnly: {
      control: { type: 'boolean' },
      description: 'Only render on tablet/mobile viewports (≤ 768px)',
      table: { defaultValue: { summary: 'true' } },
    },
    offset: {
      control: { type: 'text' },
      description: 'Distance from the anchored edges',
      table: { defaultValue: { summary: 'spacing.lg (16px)' } },
    },
    onClick: { action: 'clicked' },
    position: {
      control: { type: 'select' },
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      table: { defaultValue: { summary: "'bottom-right'" } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: "'lg'" } },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'cancel', 'success', 'warning'],
      table: { defaultValue: { summary: "'primary'" } },
    },
    zIndex: {
      control: { type: 'number' },
      table: { defaultValue: { summary: '10' } },
    },
  },
  component: FAB,
  parameters: {
    docs: {
      description: {
        component:
          "Floating Action Button. A `position: fixed` IconButton anchored to a viewport corner, used for the page's primary action when screen real estate is tight. Defaults to mobile-only (≤ 768px) — on desktop, prefer an inline `<Button>` for the same action.",
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Misc/FAB',
};

export default meta;
type Story = StoryObj<typeof FAB>;

const StageBackdrop = ({ children }: { children?: React.ReactNode }) => (
  <Stack
    gap={spacing.md}
    style={{
      background: neutral[25],
      height: '100vh',
      padding: spacing.xl,
      position: 'relative',
    }}
  >
    <Title variant='sectionHeader'>Page content</Title>
    <Text variant='subtle'>
      The FAB anchors to the viewport — scroll, resize, or move other content; it stays
      put. Defaults to mobile-only; toggle <code>mobileOnly</code> in controls to preview
      it on desktop.
    </Text>
    {children}
  </Stack>
);

export const Default: Story = {
  args: {
    ariaLabel: 'Add item',
    icon: <IconPlus />,
    mobileOnly: false,
    onClick: () => {},
  },
  render: (args) => (
    <StageBackdrop>
      <FAB {...args} />
    </StageBackdrop>
  ),
};

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Each of the four corner anchors. `mobileOnly` disabled for the demo.',
      },
    },
  },
  render: () => (
    <StageBackdrop>
      <FAB
        ariaLabel='Top-left'
        icon={<IconPencil />}
        mobileOnly={false}
        onClick={() => {}}
        position='top-left'
        variant='secondary'
      />
      <FAB
        ariaLabel='Top-right'
        icon={<IconCheck />}
        mobileOnly={false}
        onClick={() => {}}
        position='top-right'
        variant='success'
      />
      <FAB
        ariaLabel='Bottom-left'
        icon={<IconTrash />}
        mobileOnly={false}
        onClick={() => {}}
        position='bottom-left'
        variant='cancel'
      />
      <FAB
        ariaLabel='Bottom-right'
        icon={<IconPlus />}
        mobileOnly={false}
        onClick={() => {}}
        position='bottom-right'
      />
    </StageBackdrop>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All IconButton variants are supported. `tertiary` (white bg, primary outline) is the recommended FAB style — softer than `primary` while still reading as a brand-colored CTA.",
      },
    },
  },
  render: () => (
    <StageBackdrop>
      <FAB
        ariaLabel='Primary'
        icon={<IconPlus />}
        mobileOnly={false}
        onClick={() => {}}
        position='bottom-right'
      />
      <FAB
        ariaLabel='Tertiary'
        icon={<IconPlus />}
        mobileOnly={false}
        onClick={() => {}}
        position='bottom-left'
        variant='tertiary'
      />
    </StageBackdrop>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StageBackdrop>
      <FAB
        ariaLabel='XL (recommended for mobile FABs)'
        icon={<IconPlus />}
        mobileOnly={false}
        onClick={() => {}}
        position='bottom-right'
        size='xl'
      />
      <FAB
        ariaLabel='Large'
        icon={<IconPlus />}
        mobileOnly={false}
        onClick={() => {}}
        position='bottom-left'
      />
      <FAB
        ariaLabel='Medium'
        icon={<IconPlus />}
        mobileOnly={false}
        onClick={() => {}}
        position='top-left'
        size='md'
      />
      <FAB
        ariaLabel='Small'
        icon={<IconPlus />}
        mobileOnly={false}
        onClick={() => {}}
        position='top-right'
        size='sm'
      />
    </StageBackdrop>
  ),
};
