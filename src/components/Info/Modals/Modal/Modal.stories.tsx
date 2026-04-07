import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Text } from '../../../Typography/Text/Text';
import { Button } from '../../../Inputs/Buttons/Button/Button';
import { IconDeviceFloppy, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import taivLogo from '../../../../assets/brand/taiv-logo-dark.svg';

const meta: Meta<typeof Modal> = {
  title: 'Components/Info/Modals/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Modal title',
      table: { type: { summary: 'string' } },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Optional subtitle below the title',
      table: { type: { summary: 'string' } },
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width override',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'40rem'" },
      },
    },
    children: { control: false, description: 'Modal content', table: { type: { summary: 'ReactNode' } } },
    opened: { control: false, description: 'Controls the state of the modal', table: { type: { summary: 'boolean' } } },
    onClose: { control: false, description: 'Callback function when the modal is closed', table: { type: { summary: '() => void' } } },
    icon: {       control: { type: 'select' },
    options: ['Edit', 'Trash', 'TaivLogo'],
    mapping: {
      Edit: <IconEdit/>,
      Trash: <IconTrash/>,
      TaivLogo: <img src={taivLogo} width={64} height={64} alt="Taiv Logo" />,
    }, description: 'Custom icon or image to display at the top of the modal', table: { type: { summary: 'ReactNode' } } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithState = ({ title, subtitle, children, width, icon }: Omit<React.ComponentProps<typeof Modal>, 'opened' | 'onClose'>) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
      <Modal opened={opened} onClose={() => setOpened(false)} title={title} subtitle={subtitle} width={width} icon={icon}>
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWithState {...args}>
      <Text>This is the modal content area where you can place any React components.</Text>
    </ModalWithState>
  ),
  args: {
    title: 'Modal Title',
    subtitle: 'Optional subtitle text',
    children: undefined,
    opened: undefined,
    onClose: undefined,
    icon: undefined,
    width: undefined,
  },
};
