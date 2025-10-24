import React from 'react';
import { Modal as MantineModal } from '@mantine/core';
import { neutral } from '../../../constants/colors';
import { Title } from '../../Typography/Title';
import { Stack } from '../../Layout/Stack/Stack';
import { Center } from '../../Layout/Center/Center';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string | number;
}

// Base modal is intended to be extended and customized - use InfoModal or ConfirmationModal for common use cases
export const Modal = ({ opened, onClose, icon, title, subtitle, children, width = '40rem' }: ModalProps) => {
  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      centered
      radius={'16px'}
      overlayProps={{
        opacity: 0,
        blur: 4,
      }}
      size={width}
      transitionProps={{
        transition: 'pop',
        duration: 200,
      }}
      closeButtonProps={{
        style: {
          borderRadius: '16px',
          backgroundColor: neutral[50],
          width: '1.8rem',
          height: '1.8rem',
        },
      }}
      styles={{
        content: {
          borderRadius: '8px',
          border: `1px solid ${neutral[50]}`,
          boxShadow: '0px 0px 19px 0px #00000040',
        },
        header: {
          padding: '0.8rem',
        },
        close: {
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
      }}
    >
      <Center h="100%" w="100%">
        <Stack gap="2rem" h="100%" w="100%" align="center">
          <Stack gap="1.5rem" align="center">
            {icon}
            <Stack gap="0.25rem" align="center">
              <Title variant="cardHeader" align="center">
                {title}
              </Title>
              {subtitle && (
                <Title variant="cardSubheader" align="center">
                  {subtitle}
                </Title>
              )}
            </Stack>
          </Stack>
          <Center h="100%" w="100%">
            {children}
          </Center>
        </Stack>
      </Center>
    </MantineModal>
  );
};
