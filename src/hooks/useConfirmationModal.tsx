import React from 'react';
import { modals } from '@mantine/modals';
import { neutral } from '../constants/colors';
import { Title } from '../components/Typography/Title/Title';
import { Stack } from '../components/Layout/Stack/Stack';
import { Center } from '../components/Layout/Center/Center';
import { modalVariants } from '../components/Info/Modals/variants';
import { Button } from '../components/Inputs/Buttons/Button/Button';
import { Group } from '../components/Layout/Group/Group';

export const useConfirmationModal = () => {
  const show = (options: {
    variant?: Exclude<keyof typeof modalVariants, 'error'>;
    title?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    icon?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    size?: string | number;
  }) => {
    const { variant = 'confirm', title, message, confirmLabel, cancelLabel, icon, onConfirm, onCancel, size = '40rem' } = options;

    const handleConfirm = () => {
      if (onConfirm) onConfirm();
      modals.closeAll();
    };

    const handleCancel = () => {
      if (onCancel) onCancel();
      modals.closeAll();
    };

    const selectedVariant = modalVariants[variant];

    const iconContainer = {
      width: '4.2rem',
      height: '4.2rem',
      borderRadius: '50%',
      backgroundColor: selectedVariant.iconBackgroundColor,
      border: `2px solid ${selectedVariant.iconColor}`,
    };

    const modalIcon = icon || <i className={selectedVariant.icon} style={{ color: selectedVariant.iconColor, fontSize: '2rem' }} />;

    const ConfirmModalContent = () => {
      return (
        <Center h="100%" w="100%">
          <Stack gap="2rem" h="100%" w="100%" align="center">
            <Stack gap="1.5rem" align="center">
              <Center style={iconContainer}>{modalIcon}</Center>
              <Stack gap="0.25rem" align="center">
                <Title variant="cardHeader" align="center">
                  {title || selectedVariant.title}
                </Title>
                <Title variant="cardSubheader" align="center">
                  {message || selectedVariant.message}
                </Title>
              </Stack>
            </Stack>
            <Center h="100%" w="100%">
              <Group gap="1rem" align="center">
                <Button onClick={handleCancel} variant="secondary">
                  {cancelLabel || selectedVariant.cancelLabel}
                </Button>
                <Button onClick={handleConfirm} variant={selectedVariant.buttonVariant}>
                  {confirmLabel || selectedVariant.confirmLabel}
                </Button>
              </Group>
            </Center>
          </Stack>
        </Center>
      );
    };

    modals.open({
      children: <ConfirmModalContent />,
      size,
      styles: {
        content: {
          borderRadius: '8px',
          border: `1px solid ${neutral[50]}`,
          boxShadow: '0px 0px 19px 0px #00000040',
        },
        header: {
          padding: '0.8rem',
        },
        close: {
          borderRadius: '16px',
          backgroundColor: neutral[50],
          width: '1.8rem',
          height: '1.8rem',
          '&:hover': {
            backgroundColor: neutral[50],
          },
          '&:active': {
            transform: 'none',
          },
        },
        body: {
          padding: '0 3.2rem 1.6rem 3.2rem',
        },
      },
    });
  };

  const close = (modalId: string) => {
    modals.close(modalId);
  };

  const closeAll = () => {
    modals.closeAll();
  };

  return {
    show,
    close,
    closeAll,
  };
};
