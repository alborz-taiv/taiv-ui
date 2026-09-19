import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingOverlay } from './LoadingOverlay';
import { Box } from '../../Layout/Box/Box';
import { Card } from '../../Layout/Card/Card';
import { Title } from '../../Typography/Title/Title';
import { Text } from '../../Typography/Text/Text';
import { Stack } from '../../Layout/Stack/Stack';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'Components/Misc/LoadingOverlay',
  component: LoadingOverlay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "[View Mantine Docs](https://v6.mantine.dev/core/loading-overlay/)\n\nDims an already-rendered container while it refetches, without unmounting its content. Wraps Mantine v6's LoadingOverlay; the Taiv wrapper fixes the blur, opacity, and loader styling so every overlay in the app looks the same without each call site configuring it.",
      },
    },
  },
  argTypes: {
    visible: {
      control: { type: 'boolean' },
      description: 'Whether the overlay (and its loader) is shown.',
    },
    overlayColor: {
      control: { type: 'color' },
      description: 'Color of the dimming overlay behind the loader.',
    },
    radius: {
      control: { type: 'text' },
      description: "Border radius of the overlay, matching the parent container's.",
    },
    zIndex: {
      control: { type: 'number' },
      description: 'Stacking order of the overlay.',
    },
    overlayBlur: {
      control: false,
      description:
        'Fixed at 3 by this wrapper (spread after {...props} in the implementation). Passing this prop has no effect.',
    },
    overlayOpacity: {
      control: false,
      description:
        'Fixed at 0.5 by this wrapper (spread after {...props} in the implementation). Passing this prop has no effect.',
    },
    loaderProps: {
      control: false,
      description:
        "Fixed by this wrapper to size 'xl' and Taiv's primary[200] blue. Passing this prop is fully overwritten, not merged, since it's a plain object literal in the implementation, not a deep merge.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
  },
  render: (args) => (
    // position: relative is required — LoadingOverlay is absolutely positioned and
    // will otherwise anchor to the nearest positioned ancestor instead of this card.
    <Box pos="relative" w={360}>
      <Card p="lg">
        <Stack spacing="xs">
          <Title variant="cardHeader">Account summary</Title>
          <Text variant="subtle">Last synced 4 minutes ago</Text>
          <Text>Balance: $12,480.00</Text>
        </Stack>
      </Card>
      <LoadingOverlay {...args} />
    </Box>
  ),
};
