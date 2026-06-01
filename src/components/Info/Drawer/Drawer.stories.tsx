import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useDisclosure } from '../../../hooks/useDisclosure';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { TextInput } from '../../Inputs/TextInputs/TextInput/TextInput';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          'Side drawer built on Mantine v6, with pinned header + footer slots and an independently-scrolling body. Use for progressive-disclosure forms, detail panels, and selection-based action surfaces.',
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/Info/Drawer',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open drawer</Button>
        <Drawer onClose={close} opened={opened} title='Slide details'>
          <Stack>
            <Text>Drawer body. Scrolls independently of header + footer.</Text>
            <Text variant='subtle'>
              Fill with any content — forms, lists, nested cards.
            </Text>
          </Stack>
        </Drawer>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open drawer with footer</Button>
        <Drawer
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
          subtitle='Ad · 30 seconds'
          title='Edit slide'
        >
          <Stack>
            {Array.from({ length: 20 }, (_, i) => `field-${i + 1}`).map(
              (key, i) => (
                <TextInput
                  key={key}
                  label={`Field ${i + 1}`}
                  placeholder='Long body content...'
                />
              ),
            )}
          </Stack>
        </Drawer>
      </>
    );
  },
};

export const SelectionFooter: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [count, setCount] = useState(2);
    return (
      <>
        <Button onClick={open}>Open drawer with selection footer</Button>
        <Drawer
          footer={
            <Group position='apart'>
              <Text variant='label'>{count} selected</Text>
              <Button onClick={() => setCount(0)}>Append to playlist</Button>
            </Group>
          }
          onClose={close}
          opened={opened}
          title='Library'
        >
          <Stack>
            <Text>Pinned footer mirrors the selection-toolbar pattern.</Text>
          </Stack>
        </Drawer>
      </>
    );
  },
};

export const CustomHeader: Story = {
  render: () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Button onClick={open}>Open with custom header</Button>
        <Drawer
          header={
            <div style={{ background: '#0081CE', color: 'white', padding: 12 }}>
              Custom header slot — you own all the chrome.
            </div>
          }
          onClose={close}
          opened={opened}
        >
          <Text>Consumer-driven header composition.</Text>
        </Drawer>
      </>
    );
  },
};
