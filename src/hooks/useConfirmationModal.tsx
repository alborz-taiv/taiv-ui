import React, { useEffect } from 'react';
import { modals } from '@mantine/modals';
import { neutral } from '../constants/colors';
import { spacing } from '../constants/spacing';
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
    icon?: React.ReactElement;
    onConfirm?: () => void;
    onCancel?: () => void;
    size?: string | number;
  }) => {
    const { variant = 'confirm', title, message, confirmLabel, cancelLabel, icon, onConfirm, onCancel, size = '400px' } = options;

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
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      backgroundColor: selectedVariant.iconBackgroundColor,
      border: `2px solid ${selectedVariant.iconColor}`,
    };

    const coloredIcon = icon && React.cloneElement(icon, { color: icon.props.color || selectedVariant.iconColor });

    const modalIcon = coloredIcon || <i className={selectedVariant.icon} style={{ color: selectedVariant.iconColor, fontSize: '20px' }} />;

    const ConfirmModalContent = () => {
      // Enter confirms, Escape cancels. We own Escape (closeOnEscape is
      // disabled at the modal level below) so the user's onCancel fires
      // on Escape instead of the modal silently closing.
      useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleConfirm();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            handleCancel();
          }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
      }, []);

      return (
        <Center h="100%" w="100%">
          <Stack gap="20px" h="100%" w="100%" align="center">
            <Stack gap={spacing.lg} align="center">
              <Center style={iconContainer}>{modalIcon}</Center>
              <Stack gap={spacing.xxs} align="center">
                <Title variant="cardHeader" align="center">
                  {title || selectedVariant.title}
                </Title>
                <Title variant="cardSubheader" align="center">
                  {message || selectedVariant.message}
                </Title>
              </Stack>
            </Stack>
            <Center h="100%" w="100%">
              <Group gap="10px" align="center">
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
      // Escape is handled inside ConfirmModalContent so it can fire onCancel.
      closeOnEscape: false,
      styles: {
        content: {
          borderRadius: '8px',
          border: `1px solid ${neutral[50]}`,
          boxShadow: '0px 0px 19px 0px #00000040',
        },
        header: {
          padding: spacing.sm,
        },
        close: {
          borderRadius: '16px',
          backgroundColor: neutral[50],
          width: '18px',
          height: '18px',
          '&:hover': {
            backgroundColor: neutral[50],
          },
          '&:active': {
            transform: 'none',
          },
        },
        body: {
          padding: `0 ${spacing.xxl} ${spacing.lg} ${spacing.xxl}`,
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
