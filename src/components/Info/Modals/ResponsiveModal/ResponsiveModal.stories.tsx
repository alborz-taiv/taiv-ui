import type { Meta, StoryObj } from '@storybook/react-vite';
import { useDisclosure } from '../../../../hooks/useDisclosure';
import { Button } from '../../../Inputs/Buttons/Button/Button';
import { Stack } from '../../../Layout/Stack/Stack';
import { Text } from '../../../Typography/Text/Text';
import { ResponsiveModal } from './ResponsiveModal';

const meta: Meta<typeof ResponsiveModal> = {
  component: ResponsiveModal,
  parameters: {
    docs: {
      description: {
        component:
          'Branches between `Modal` (centered) and `MobileDrawer` (bottom-anchored) at a breakpoint. Author one markup tree — it renders as a bottom sheet on touch viewports and a modal on pointer viewports. Resize the viewport to see the switch.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Info/Modals/ResponsiveModal',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open responsive modal</Button>
        <ResponsiveModal
          onClose={close}
          opened={opened}
          subtitle='Modal above 768px, bottom sheet below it'
          title='Service Map'
          width={560}
        >
          <Stack>
            <Text>
              Renders as a bottom sheet under 768px and as a centered modal
              above it.
            </Text>
            <Text variant='subtle'>Resize the viewport to observe.</Text>
          </Stack>
        </ResponsiveModal>
      </>
    );
  },
};
