import React from 'react';
import { Modal as MantineModal } from '@mantine/core';
import { neutral } from '../../../../constants/colors';
import { spacing } from '../../../../constants/spacing';
import { useMobile } from '../../../../hooks/useMediaQuery';
import { Title } from '../../../Typography/Title/Title';
import { Stack } from '../../../Layout/Stack/Stack';
import { Center } from '../../../Layout/Center/Center';

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
export const Modal = ({ opened, onClose, icon, title, subtitle, children, width = '400px' }: ModalProps) => {
  // On mobile the modal usually fills the viewport (consumers pass
  // `width='100%'`), so the desktop body's 32px side padding eats real
  // estate that grid pickers and 4-segment SegmentedControls need. Tighten
  // to `spacing.md` (12px) on mobile so children get an extra ~40px of
  // usable width without making desktop look cramped.
  const isMobile = useMobile();
  const bodyPaddingX = isMobile ? spacing.md : spacing.xxl;
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
          width: '18px',
          height: '18px',
        },
      }}
      styles={{
        content: {
          borderRadius: '8px',
          border: `1px solid ${neutral[50]}`,
          boxShadow: '0px 0px 19px 0px #00000040',
        },
        header: {
          padding: spacing.sm,
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
          padding: `0 ${bodyPaddingX} ${spacing.lg} ${bodyPaddingX}`,
        },
      }}
    >
      <Center h="100%" w="100%">
        <Stack gap="20px" h="100%" w="100%" align="center">
          <Stack gap={spacing.lg} align="center">
            {icon}
            <Stack gap={spacing.xxs} align="center">
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
