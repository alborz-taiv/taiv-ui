import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../../Inputs/Buttons/Button/Button';
import { NumberInput } from '../../../Inputs/TextInputs/NumberInput/NumberInput';
import { TextInput } from '../../../Inputs/TextInputs/TextInput/TextInput';
import { Center } from '../../../Layout/Center/Center';
import { Stack } from '../../../Layout/Stack/Stack';
import { Title } from '../../../Typography/Title/Title';
import { StepperModal } from './StepperModal';

const meta: Meta<typeof StepperModal> = {
  argTypes: {
    backLabel: {
      control: { type: 'text' },
      description: 'Label for the back button on middle and final steps.',
      table: {
        defaultValue: { summary: "'Back'" },
        type: { summary: 'string' },
      },
    },
    cancelLabel: {
      control: { type: 'text' },
      description: 'Label for the cancel button on the first step.',
      table: {
        defaultValue: { summary: "'Cancel'" },
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description:
        'Array of ReactNode, one per step. Only the active step is mounted — lift form state to the parent to preserve values across navigation.',
      table: { type: { summary: 'ReactNode[]' } },
    },
    confirmButtonDisabled: {
      control: false,
      description: 'Whether the confirm button is disabled.',
      table: { type: { summary: 'boolean' } },
    },
    confirmButtonLoading: {
      control: false,
      description: 'Whether the confirm button shows a loading state.',
      table: { type: { summary: 'boolean' } },
    },
    confirmLabel: {
      control: { type: 'text' },
      description: 'Label for the confirm button on the final step.',
      table: {
        defaultValue: { summary: "'Confirm'" },
        type: { summary: 'string' },
      },
    },
    nextButtonDisabled: {
      control: false,
      description: 'Whether the next button is disabled.',
      table: { type: { summary: 'boolean' } },
    },
    nextLabel: {
      control: { type: 'text' },
      description: 'Label for the next button on non-final steps.',
      table: {
        defaultValue: { summary: "'Next'" },
        type: { summary: 'string' },
      },
    },
    onClose: {
      control: false,
      description: 'Called when the modal is dismissed (X button or Cancel).',
      table: { type: { summary: '() => void' } },
    },
    onConfirm: {
      control: false,
      description:
        'Called when the Confirm button is clicked on the final step.',
      table: { type: { summary: '() => void' } },
    },
    opened: {
      control: false,
      description: 'Controls whether the modal is open.',
      table: { type: { summary: 'boolean' } },
    },
    stepLabels: {
      control: { type: 'object' },
      description: 'Labels shown next to the step badge. One string per step.',
      table: { type: { summary: 'string[]' } },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Optional subtitle below the title.',
      table: { type: { summary: 'string' } },
    },
    title: {
      control: { type: 'text' },
      description: 'Modal title.',
      table: { type: { summary: 'string' } },
    },
    width: {
      control: { type: 'text' },
      description: 'Modal width override.',
      table: {
        defaultValue: { summary: "'500px'" },
        type: { summary: 'string | number' },
      },
    },
  },
  component: StepperModal,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Info/Modals/StepperModal',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    backLabel: 'Back',
    cancelLabel: 'Cancel',
    confirmLabel: 'Create Account',
    nextLabel: 'Continue',
    stepLabels: ['Your Info', 'Contact', 'Additional Info'],
    subtitle: 'Complete all steps to get started',
    title: 'Create Account',
    width: '500px',
  },
  render: (args) => {
    const [opened, setOpened] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState<number | ''>(18);

    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open StepperModal</Button>
        </Center>
        <StepperModal
          {...args}
          onClose={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          opened={opened}
        >
          {[
            <Stack align='center' gap='12px' key='step-0' w='100%'>
              <TextInput
                label='Full Name'
                onChange={(e) => setName(e.target.value)}
                placeholder='Jane Smith'
                value={name}
              />
            </Stack>,
            <Stack align='center' gap='12px' key='step-1' w='100%'>
              <Title align='center' variant='cardSubheader'>
                How can we reach you?
              </Title>
              <TextInput
                label='Email Address'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='jane@example.com'
                value={email}
              />
            </Stack>,
            <Stack align='center' gap='12px' key='step-2' w='100%'>
              <Title align='center' variant='cardSubheader'>
                A few more details.
              </Title>
              <NumberInput
                label='Age'
                max={120}
                min={1}
                onChange={(val) => setAge(val ?? 18)}
                value={age}
              />
            </Stack>,
          ]}
        </StepperModal>
      </>
    );
  },
};

export const TwoSteps: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState('');

    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open 2-Step Modal</Button>
        </Center>
        <StepperModal
          onClose={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          opened={opened}
          stepLabels={['Configure', 'Confirm']}
          title='Quick Setup'
        >
          {[
            <Stack align='center' gap='12px' key='step-0' w='100%'>
              <TextInput
                label='Configuration Value'
                onChange={(e) => setValue(e.target.value)}
                placeholder='Enter value...'
                value={value}
              />
            </Stack>,
            <Stack align='center' gap='8px' key='step-1' w='100%'>
              <Title align='center' variant='cardSubheader'>
                You entered:
              </Title>
              <Title align='center' variant='cardHeader'>
                {value || '(empty)'}
              </Title>
            </Stack>,
          ]}
        </StepperModal>
      </>
    );
  },
};

export const ConfirmButtonLoading: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpened(false);
      }, 2000);
    };

    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open StepperModal</Button>
        </Center>
        <StepperModal
          confirmButtonLoading={loading}
          onClose={() => setOpened(false)}
          onConfirm={handleConfirm}
          opened={opened}
          stepLabels={['Prepare', 'Submit']}
          title='Submit Data'
        >
          {[
            <Title align='center' key='step-0' variant='cardSubheader'>
              Click Next to proceed.
            </Title>,
            <Title align='center' key='step-1' variant='cardSubheader'>
              Click Confirm to submit and see the loading state.
            </Title>,
          ]}
        </StepperModal>
      </>
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open StepperModal</Button>
        </Center>
        <StepperModal
          backLabel='Previous'
          cancelLabel='Dismiss'
          confirmLabel='Submit'
          nextLabel='Continue'
          onClose={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          opened={opened}
          stepLabels={['Step 1', 'Step 2', 'Step 3']}
          title='Custom Button Labels'
        >
          {[
            <Title align='center' key='step-0' variant='cardSubheader'>
              First step — notice the Dismiss button.
            </Title>,
            <Title align='center' key='step-1' variant='cardSubheader'>
              Middle step — Previous and Continue.
            </Title>,
            <Title align='center' key='step-2' variant='cardSubheader'>
              Final step — Previous and Submit.
            </Title>,
          ]}
        </StepperModal>
      </>
    );
  },
};
