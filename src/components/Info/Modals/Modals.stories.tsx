import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Button } from '../../Inputs/Buttons/Button/Button';
import { useInfoModal } from '../../../hooks/useInfoModal';
import { useConfirmationModal } from '../../../hooks/useConfirmationModal';
import { FormModal } from './FormModal/FormModal';
import { TextInput } from '../../Inputs/TextInputs/TextInput/TextInput';
import { Title } from '../../Typography/Title/Title';
import { modalVariants } from './variants';
import { spacing } from '../../../constants/spacing';

interface ModalHookArgs {
  variant: keyof typeof modalVariants;
  title: string;
  message: string;
}

const meta: Meta<ModalHookArgs> = {
  title: 'Hooks/Modals',
  tags: ['!dev'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(modalVariants),
      description: 'Preset modal style',
      table: {
        type: { summary: "'confirm' | 'info' | 'success' | 'error' | 'warning' | 'cancel'" },
        defaultValue: { summary: "'info'" },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title override',
      table: {
        type: { summary: 'string' },
      },
    },
    message: {
      control: { type: 'text' },
      description: 'Optional message override',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ModalHookArgs>;

const DefaultDemo = (args: any) => {
  const { show } = useInfoModal();

  return (
    <Button
      onClick={() =>
        show({
          variant: args.variant,
          title: args.title || undefined,
          message: args.message || undefined,
        })
      }
    >
      Show Info Modal
    </Button>
  );
};

export const Default: Story = {
  args: {
    variant: 'info',
    message: undefined,
    title: undefined,
  },
  render: (args) => <DefaultDemo {...args} />,
};

const InfoVariantsDemo = () => {
  const { show } = useInfoModal();

  return (
    <Group gap={spacing.xs}>
      <Button variant="primary" onClick={() => show({ variant: 'info' })}>Info</Button>
      <Button variant="success" onClick={() => show({ variant: 'success' })}>Success</Button>
      <Button variant="cancel" onClick={() => show({ variant: 'error' })}>Error</Button>
      <Button variant="warning" onClick={() => show({ variant: 'warning' })}>Warning</Button>
    </Group>
  );
};

export const InfoVariants: Story = {
  render: () => <InfoVariantsDemo />,
};

const ConfirmationDefaultDemo = (args: any) => {
  const { show } = useConfirmationModal();

  return (
    <Button
      onClick={() =>
        show({
          variant: args.variant,
          title: args.title || undefined,
          message: args.message || undefined,
          onConfirm: () => console.log('Confirmed'),
          onCancel: () => console.log('Cancelled'),
        })
      }
    >
      Show Confirmation Modal
    </Button>
  );
};

export const ConfirmationDefault: Story = {
  args: {
    variant: 'confirm',
    title: undefined,
    message: undefined,
  },
  render: (args) => <ConfirmationDefaultDemo {...args} />,
};

const ConfirmationVariantsDemo = () => {
  const { show } = useConfirmationModal();

  return (
    <Group gap={spacing.xs}>
      <Button variant="primary" onClick={() => show({ variant: 'confirm', onConfirm: () => console.log('confirmed') })}>Confirm</Button>
      <Button variant="cancel" onClick={() => show({ variant: 'cancel', onConfirm: () => console.log('confirmed') })}>Cancel</Button>
      <Button variant="warning" onClick={() => show({ variant: 'warning', onConfirm: () => console.log('confirmed') })}>Warning</Button>
      <Button variant="success" onClick={() => show({ variant: 'success', onConfirm: () => console.log('confirmed') })}>Success</Button>
    </Group>
  );
};

export const ConfirmationVariants: Story = {
  render: () => <ConfirmationVariantsDemo />,
};

const FormModalExample = () => {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <>
      <Button onClick={() => setOpened(true)}>Add User</Button>
      <FormModal
        opened={opened}
        onClose={() => setOpened(false)}
        onCancel={() => setOpened(false)}
        onConfirm={() => setOpened(false)}
        modalVariant="info"
        confirmLabel="Submit"
        confirmButtonDisabled={name.trim().length === 0}
      >
        <Stack gap="10px" align="center">
          <Title variant="cardSubheader" align="center">
            Fill out the user information below.
          </Title>
          <TextInput label="Name" placeholder="Enter a name" value={name} onChange={(e) => setName(e.target.value)} />
          <TextInput label="Email" placeholder="Enter an email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Stack>
      </FormModal>
    </>
  );
};

export const FormModalDemo: Story = {
  render: () => <FormModalExample />,
};
