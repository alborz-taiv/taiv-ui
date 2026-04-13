import React from 'react';
import { modals } from '@mantine/modals';
import { neutral } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { Title } from '../components/Typography/Title/Title';
import { Stack } from '../components/Layout/Stack/Stack';
import { Center } from '../components/Layout/Center/Center';
import { modalVariants } from '../components/Info/Modals/variants';
import { Button } from '../components/Inputs/Buttons/Button/Button';

export const useInfoModal = () => {
  const show = (options: { variant?: keyof typeof modalVariants; title?: string; message?: string; icon?: React.ReactElement; onConfirm?: () => void; size?: string | number }) => {
    const { variant = 'info', title, message, icon, onConfirm, size = '350px' } = options;

    const handleConfirm = () => {
      if (onConfirm) onConfirm();
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

    const InfoModalContent = () => {
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
              <Button onClick={handleConfirm} variant={selectedVariant.buttonVariant}>
                OK
              </Button>
            </Center>
          </Stack>
        </Center>
      );
    };

    modals.open({
      children: <InfoModalContent />,
      size,
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
