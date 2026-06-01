import type { Meta, StoryObj } from '@storybook/react-vite';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { ResponsiveDrawer } from './ResponsiveDrawer';

const meta: Meta<typeof ResponsiveDrawer> = {
  component: ResponsiveDrawer,
  parameters: {
    docs: {
      description: {
        component:
          'Branches between `Drawer` (right-anchored) and `MobileDrawer` (bottom-anchored) at a breakpoint. Author one markup tree — it renders correctly on both touch and pointer viewports. Resize the viewport to see the switch.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Info/ResponsiveDrawer',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open responsive drawer</Button>
        <ResponsiveDrawer
          footer={
            <Group position='right'>
              <Button onClick={close} variant='cancel'>
                Cancel
              </Button>
              <Button onClick={close}>Save</Button>
            </Group>
          }
          onClose={close}
          opened={opened}
          title='Slide details'
        >
          <Stack>
            <Text>
              Renders as a bottom sheet under 768px and as a right-side drawer
              above it.
            </Text>
            <Text variant='subtle'>Resize the viewport to observe.</Text>
          </Stack>
        </ResponsiveDrawer>
      </>
    );
  },
};
