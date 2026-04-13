import { Stepper as MantineStepper, type StepperProps as MantineStepperProps } from '@mantine/core';
import { Step, type StepProps } from './Step';
import { baseStyles, type StepperVariant, DEFAULT_ICON_SIZE_PX } from './variants';
export interface StepperProps extends Omit<MantineStepperProps, 'children' | 'active'> {
  activeStep: number;
  steps: StepProps[];
  variant?: StepperVariant;
};

export const Stepper = ({
  activeStep,
  steps,
  variant = 'primary',
  size = 'md',
  iconSize = DEFAULT_ICON_SIZE_PX[size],
  orientation = 'horizontal',
  allowNextStepsSelect = false,
  styles,
  ...props
}: StepperProps) => {
  const resolvedBaseStyles = baseStyles(variant, props.color);
  const stepItems = steps.filter((step) => !step.completed);
  const completedStep = steps.find((step) => step.completed);

  const style: MantineStepperProps['styles'] =
    orientation === 'horizontal'
      ? {
          ...resolvedBaseStyles,
          root: {
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%',
          },
          steps: {
            alignItems: 'flex-start',
            boxSizing: 'border-box',
            width: '100%',
            gap: '1.5rem',
          },
          step: {
            ...resolvedBaseStyles.step,
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            flex: '1 1 0',
            minWidth: 0,
            width: 'auto',
            maxWidth: 'none',
          },
          stepBody: {
            ...resolvedBaseStyles.stepBody,
            marginLeft: 0,
            marginRight: 0,
            marginTop: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            boxSizing: 'border-box',
          },
          stepLabel: {
            ...resolvedBaseStyles.stepLabel,
            textAlign: 'center' as const,
            whiteSpace: 'nowrap',
            alignSelf: 'stretch',
          },
          stepDescription: {
            ...resolvedBaseStyles.stepDescription,
            textAlign: 'center' as const,
            boxSizing: 'border-box',
            overflowWrap: 'break-word',
            minWidth: '8rem',
          },
          separator: {
            flex: '1 1 0',
            height: '2px',
            marginTop: `calc(${(iconSize) / 32}rem - 0.0625rem)`,
            marginLeft: '-2rem',
            marginRight: '-2rem',
          },
          content: {
            ...resolvedBaseStyles.content,
            marginTop: '1rem',
          },
          ...styles
        }
      : {...resolvedBaseStyles, ...styles};

  return (
    <MantineStepper
      {...props}
      active={activeStep}
      iconSize={iconSize}
      size={size}
      orientation={orientation}
      allowNextStepsSelect={allowNextStepsSelect}
      style={{ zoom: 1.5 }}
      styles={style}
    >
      {stepItems.map((step, index) => (
        <Step key={index} {...step}>{step.header}</Step>
      ))}
      {completedStep ? <MantineStepper.Completed>{completedStep.header}</MantineStepper.Completed> : null}
    </MantineStepper>
  );
};