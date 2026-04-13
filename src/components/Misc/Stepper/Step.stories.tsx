import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper as MantineStepper } from '@mantine/core';
import { IconCheck, IconPackage } from '@tabler/icons-react';
import { Step } from './Step';
import type { StepProps } from './Step';

const definition: StepProps = {
  label: 'Choose Plan',
  description: 'Select your base package',
  icon: <IconPackage size={16} />,
  completedIcon: <IconCheck size={16} />,
};

const meta = {
  title: 'Components/Misc/Stepper/Step',
  component: Step,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Step renders one step item (label, description, icon states, and optional content) and is intended to be used as a direct child of Stepper.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineStepper active={0} onStepClick={() => {}}>
        <Story />
      </MantineStepper>
    ),
  ],
  args: {
    label: definition.label,
    description: definition.description,
    icon: definition.icon,
    completedIcon: definition.completedIcon,
    header: definition.header,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label of the step',
      table: { type: { summary: 'ReactNode' } },
    },
    description: {
      control: { type: 'text' },
      description: 'Description of the step',
      table: { type: { summary: 'ReactNode' } },
    },
    icon: {
      control: false,
      description: 'Icon when the step is active or not completed',
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'index + 1' } },
    },
    completedIcon: {
      control: false,
      description: 'Icon when the step is completed',
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'index + 1' } },
    },
    header: {
      control: { type: 'object' },
      description: 'Header displayed under the Stepper',
      table: { type: { summary: 'ReactNode' } },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading indicator instead of icon',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    allowStepSelect: {
      control: { type: 'boolean' },
      description: 'Toggle allowing step to be clicked',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    completed: {
      control: { type: 'boolean' },
      description: 'Final step to be used as header only',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

const interactiveRender: Story['render'] = (args) => {
  return (
    <Step
      {...args}
    />
  );
};

export const Default: Story = {};

export const Loading: Story = {
  render: interactiveRender,
  args: { loading: true },
};