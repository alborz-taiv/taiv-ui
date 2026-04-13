import React from 'react';
import { Stepper as MantineStepper } from '@mantine/core';

export interface StepProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  completedIcon?: React.ReactNode;
  header?: React.ReactNode;
  loading?: boolean;
  allowStepSelect?: boolean;
  completed?: boolean;
};

type MantineStepProps = React.ComponentProps<typeof MantineStepper.Step>;

export const Step = ({
  label,
  description,
  icon,
  completedIcon,
  header,
  loading,
  allowStepSelect,
  ...props
}: StepProps & Omit<MantineStepProps, keyof StepProps>) => {
  const resolvedStepIndex = typeof props.step === 'number' ? props.step + 1 : null;

  return (
  <MantineStepper.Step
    {...props}
    label={label}
    description={description}
    icon={icon ?? resolvedStepIndex}
    completedIcon={completedIcon ?? resolvedStepIndex}
    loading={loading ?? false}
    allowStepSelect={allowStepSelect ?? false}
  />
  );
};
