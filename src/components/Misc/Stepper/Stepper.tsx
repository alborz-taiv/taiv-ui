import { Stepper as MantineStepper, type StepperProps as MantineStepperProps } from '@mantine/core';
import { primary, neutral, white } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { StepperStep, type StepperStepProps } from './StepperStep';

export type { StepperStepProps } from './StepperStep';
export { StepperStep } from './StepperStep';

const DEFAULT_ICON_SIZE_PX: Record<string, number> = {
  xs: 34,
  sm: 36,
  md: 42,
  lg: 48,
  xl: 52,
};

export interface StepperProps extends Omit<MantineStepperProps, 'children' | 'active'> {
  activeStep: number;
  steps: StepperStepProps[];
  color?: string;
  iconSize?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  orientation?: 'horizontal' | 'vertical';
  allowNextStepsSelect?: boolean;
}

export const Stepper = ({
  activeStep,
  steps,
  color = primary[200],
  size = 'md',
  iconSize = DEFAULT_ICON_SIZE_PX[size],
  orientation = 'horizontal',
  allowNextStepsSelect = false,
  styles,
  ...props
}: StepperProps) => {
  const stepItems = steps.filter((step) => !step.completed);
  const completedStep = steps.find((step) => step.completed);

  const baseStepStyles = {
    step: {
      ...fontBase,
    },
    stepBody: {
      ...fontBase,
      color: color
    },
    stepIcon: {
      '&:not([data-progress]):not([data-completed])': {
        backgroundColor: white,
        color: neutral[100],
        borderColor: neutral[100],
      },
      '&[data-progress]': {
        backgroundColor: white,
        color: color,
      }
    },
    stepLabel: {
      ...fontBase,
    },
    stepDescription: {
      ...fontBase,
    },
    content: {
      ...fontBase,
      textAlign: 'center' as const,
    },
  };

  const style: MantineStepperProps['styles'] =
    orientation === 'horizontal'
      ? {
          ...baseStepStyles,
          root: {
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: '100%',
          },
          steps: {
            alignItems: 'flex-start',
            boxSizing: 'border-box',
            width: '100%',
            gap: 15,
          },
          step: {
            ...baseStepStyles.step,
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            flex: '1 1 0',
            minWidth: 0,
            width: 'auto',
            maxWidth: 'none',
          },
          stepBody: {
            ...baseStepStyles.stepBody,
            marginLeft: 0,
            marginRight: 0,
            marginTop: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            boxSizing: 'border-box',
          },
          stepLabel: {
            ...baseStepStyles.stepLabel,
            textAlign: 'center' as const,
            whiteSpace: 'nowrap',
            alignSelf: 'stretch',
          },
          stepDescription: {
            ...baseStepStyles.stepDescription,
            textAlign: 'center' as const,
            boxSizing: 'border-box',
            overflowWrap: 'break-word',
            minWidth: '8rem',
          },
          separator: {
            flex: '1 1 0',
            height: 2,
            marginTop: `calc(${(iconSize) / 32}rem - 0.0625rem)`,
            marginLeft: -20,
            marginRight: -20,
          },
          content: {
            ...baseStepStyles.content,
            marginTop: '1rem',
          },
          ...styles
        }
      : {...baseStepStyles, ...styles};

  return (
    <MantineStepper
      {...props}
      active={activeStep}
      color={color}
      iconSize={iconSize}
      size={size}
      orientation={orientation}
      allowNextStepsSelect={allowNextStepsSelect}
      style={{ zoom: 1.5 }}
      styles={style}
    >
      {stepItems.map((step, index) => (
        <StepperStep key={index} {...step}>{step.header}</StepperStep>
      ))}
      {completedStep ? <MantineStepper.Completed>{completedStep.header}</MantineStepper.Completed> : null}
    </MantineStepper>
  );
};