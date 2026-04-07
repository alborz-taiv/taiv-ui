import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  IconCheck,
  IconCreditCard,
  IconFileText,
  IconPackage,
  IconSettings,
} from '@tabler/icons-react';
import { Stepper } from './Stepper';
import type { StepperStepProps } from './Stepper';

const checkoutSteps: StepperStepProps[] = [
  { label: 'Choose Plan', description: 'Select your base package' },
  { label: 'Add-Ons', description: 'Customize your setup' },
  { label: 'Payment', description: 'Enter billing details' },
  { label: 'Confirm', description: 'Review and submit' },
];

const iconSteps: StepperStepProps[] = [
  { label: 'Plan', description: 'Choose plan', icon: <IconPackage size={16} />, completedIcon: <IconCheck size={16} /> },
  { label: 'Config', description: 'Configure', icon: <IconSettings size={16} />, completedIcon: <IconCheck size={16} /> },
  { label: 'Payment', description: 'Pay', icon: <IconCreditCard size={16} />, completedIcon: <IconCheck size={16} /> },
  { label: 'Review', description: 'Review', icon: <IconFileText size={16} />, completedIcon: <IconCheck size={16} /> },
];

const completedSteps: StepperStepProps[] = [
  { label: 'Choose Plan', description: 'Select your base package', header: 'Step 1 header' },
  { label: 'Add-Ons', description: 'Customize your setup', header: 'Step 2 header' },
  { label: 'Payment', description: 'Enter billing details', header: 'Step 3 header' },
  { label: 'Confirm', description: 'Review and submit', header: 'Step 4 header' },
  { label: 'Done', completed: true, header: 'All steps are completed.' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Components/Misc/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Stepper component is a reusable wrapper around Mantine Stepper for building linear, multi-step flows like onboarding, checkout, and setup forms.',
      },
    },
  },
  args: {
    activeStep: 1,
    steps: checkoutSteps,
  },
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0, max: checkoutSteps.length },
      description: 'Index of the active step',
      table: { type: { summary: 'number' } },
    },
    steps: {
      control: false,
      description: 'Array of step definitions (label, description, icon, etc.)',
      table: { type: { summary: 'StepperStep[]' } },
    },
    color: {
      control: { type: 'text' },
      description: 'Color of the active components',
      table: { type: { summary: 'string' }, defaultValue: { summary: "primary[200]" } },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Stepper control size',
      table: { type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" }, defaultValue: { summary: "'md'" } },
    },
    iconSize: {
      control: { type: 'number', min: 12, max: 64, step: 2 },
      description: 'Size of the step circles in pixels',
      table: { type: { summary: 'number' } },
    },
    orientation: {
      control: { type: 'inline-radio' },
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the stepper',
      table: { type: { summary: "'horizontal' | 'vertical'" }, defaultValue: { summary: "'horizontal'" } },
    },
    allowNextStepsSelect: {
      control: { type: 'boolean' },
      description: 'Allow clicking steps to set active step',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    onStepClick: { 
      control: false,
      description: 'Event handler for step click',
      table: { category: 'Events', type: { summary: '(stepIndex: number) => void' }, } }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const interactiveRender: Story['render'] = (args) => {
  const [activeStep, setActiveStep] = useState(args.activeStep);

  return (
    <Stepper
      {...args}
      activeStep={activeStep}
      onStepClick={(stepIndex) => setActiveStep(stepIndex)}
    />
  );
};

export const Default: Story = {
  render: interactiveRender,
};

export const Color: Story = {
  render: interactiveRender,
  args: { color: 'red' },
};

export const Size: Story = {
  render: interactiveRender,
  args: { size: 'xl' },
};

export const Orientation: Story = {
  render: interactiveRender,
  args: { orientation: 'vertical' },
};

export const Icons: Story = {
  render: interactiveRender,
  args: { steps: iconSteps },
};

export const Header: Story = {
  render: interactiveRender,
  args: {
    steps: completedSteps,
    activeStep: 4,
    allowNextStepsSelect: true
  },
};

export const AllowNextStepSelect: Story = {
  render: interactiveRender,
  args: { allowNextStepsSelect: true },
};