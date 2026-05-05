import { Modal as MantineModal } from '@mantine/core';
import type React from 'react';
import { useEffect, useState } from 'react';
import { neutral } from '../../../../constants/colors';
import { spacing } from '../../../../constants/spacing';
import { Button } from '../../../Inputs/Buttons/Button/Button';
import { Center } from '../../../Layout/Center/Center';
import { Group } from '../../../Layout/Group/Group';
import { Stack } from '../../../Layout/Stack/Stack';
import { Text } from '../../../Typography/Text/Text';
import { Title } from '../../../Typography/Title/Title';
import { Badge } from '../../Badge/Badge';

interface StepperModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  width?: string | number;
  stepLabels?: string[];
  children: React.ReactNode[];
  onConfirm: () => void;
  cancelLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  confirmLabel?: string;
  confirmButtonDisabled?: boolean;
  confirmButtonLoading?: boolean;
  nextButtonDisabled?: boolean;
}

export const StepperModal = ({
  opened,
  onClose,
  title,
  subtitle,
  width = '500px',
  stepLabels,
  children,
  onConfirm,
  cancelLabel = 'Cancel',
  backLabel = 'Back',
  nextLabel = 'Next',
  confirmLabel = 'Confirm',
  confirmButtonDisabled = false,
  confirmButtonLoading = false,
  nextButtonDisabled = false,
}: StepperModalProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const stepCount = children.length;

  useEffect(() => {
    if (!opened) setActiveStep(0);
  }, [opened]);

  return (
    <MantineModal
      centered
      closeButtonProps={{
        style: {
          backgroundColor: neutral[50],
          borderRadius: '16px',
          height: '18px',
          width: '18px',
        },
      }}
      onClose={onClose}
      opened={opened}
      overlayProps={{
        blur: 4,
        opacity: 0,
      }}
      radius={'16px'}
      size={width}
      styles={{
        body: {
          padding: `0 ${spacing.xxl} ${spacing.lg} ${spacing.xxl}`,
        },
        close: {
          '&:active': { transform: 'none' },
          '&:hover': { backgroundColor: neutral[50] },
        },
        content: {
          border: `1px solid ${neutral[50]}`,
          borderRadius: '8px',
          boxShadow: '0px 0px 19px 0px #00000040',
        },
        header: {
          padding: spacing.sm,
        },
      }}
      transitionProps={{
        duration: 200,
        transition: 'pop',
      }}
    >
      <Center h='100%' w='100%'>
        <Stack gap='20px' h='100%' w='100%'>
          <Group align='center' gap='8px'>
            <Badge variant='outline'>
              Step {activeStep + 1} of {stepCount}
            </Badge>
            {stepLabels?.[activeStep] && (
              <Text size='sm'>— {stepLabels[activeStep]}</Text>
            )}
          </Group>

          <Stack align='center'>
            <Stack align='center'>
              <Title align='center' variant='cardHeader'>
                {title}
              </Title>
              {subtitle && (
                <Title align='center' variant='cardSubheader'>
                  {subtitle}
                </Title>
              )}
            </Stack>
          </Stack>

          <Center h='100%' w='100%'>
            {children[activeStep]}
          </Center>
          <Center>
            <Group align='center' gap='10px'>
              {activeStep === 0 ? (
                <Button onClick={onClose} variant='secondary'>
                  {cancelLabel}
                </Button>
              ) : (
                <Button
                  onClick={() => setActiveStep((step) => step - 1)}
                  variant='secondary'
                >
                  {backLabel}
                </Button>
              )}
              {activeStep === stepCount - 1 ? (
                <Button
                  disabled={confirmButtonDisabled}
                  loading={confirmButtonLoading}
                  onClick={onConfirm}
                  variant='primary'
                >
                  {confirmLabel}
                </Button>
              ) : (
                <Button
                  disabled={nextButtonDisabled}
                  onClick={() => setActiveStep((step) => step + 1)}
                  variant='primary'
                >
                  {nextLabel}
                </Button>
              )}
            </Group>
          </Center>
        </Stack>
      </Center>
    </MantineModal>
  );
};
