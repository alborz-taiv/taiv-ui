import type { Meta, StoryObj } from '@storybook/react-vite';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { MobileDrawer } from './MobileDrawer';

const meta: Meta<typeof MobileDrawer> = {
  component: MobileDrawer,
  parameters: {
    docs: {
      description: {
        component:
          'Bottom-anchored mobile sheet with a grab-handle, rounded top corners, and pinned header/footer. Use on touch viewports; pair with the right-anchored `Drawer` on desktop or use `ResponsiveDrawer` to branch automatically.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Info/MobileDrawer',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open mobile drawer</Button>
        <MobileDrawer onClose={close} opened={opened} title='Slide details'>
          <Stack>
            <Text>Grab handle at the top. Body scrolls when needed.</Text>
            <Text variant='subtle'>
              Anchored to the bottom at up to 75% viewport height.
            </Text>
          </Stack>
        </MobileDrawer>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open with pinned footer</Button>
        <MobileDrawer
          footer={
            <Group grow>
              <Button onClick={close} variant='cancel'>
                Cancel
              </Button>
              <Button onClick={close}>Confirm</Button>
            </Group>
          }
          onClose={close}
          opened={opened}
          title='Discard changes?'
        >
          <Text>
            Pinned footer keeps primary actions visible while body scrolls.
          </Text>
        </MobileDrawer>
      </>
    );
  },
};

export const ShorterSheet: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open 60% sheet</Button>
        <MobileDrawer
          maxHeightVh={60}
          onClose={close}
          opened={opened}
          title='Filter'
        >
          <Text>Custom viewport cap via `maxHeightVh`.</Text>
        </MobileDrawer>
      </>
    );
  },
};
