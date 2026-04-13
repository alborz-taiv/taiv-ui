import React from "react";
import { Modal as MantineModal } from "@mantine/core";
import { neutral } from "../../../../constants/colors";
import { spacing } from '../../../../constants/spacing';
import { Stack } from "../../../Layout/Stack/Stack";
import { Center } from "../../../Layout/Center/Center";
import { modalVariants } from "../variants";
import { Group } from "../../../Layout/Group/Group";
import { Button } from "../../../Inputs/Buttons/Button/Button";

export interface FormModalProps {
  opened: boolean;
  onClose: () => void;
  icon?: React.ReactElement;
  children?: React.ReactNode;
  size?: string | number;
  modalVariant?: keyof typeof modalVariants;
  confirmButtonDisabled?: boolean;
  confirmButtonLoading?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}

export const FormModal = ({
  opened,
  onClose,
  icon,
  children,
  size = "400px",
  modalVariant = "info",
  confirmButtonDisabled = false,
  confirmButtonLoading = false,
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel,
}: FormModalProps) => {
  const selectedVariant = modalVariants[modalVariant];
  const iconContainer = {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: selectedVariant.iconBackgroundColor,
    border: `2px solid ${selectedVariant.iconColor}`,
  };

  const coloredIcon = icon && React.cloneElement(icon, { color: icon.props.color || selectedVariant.iconColor });

  const modalIcon = coloredIcon || (
    <i
      className={selectedVariant.icon}
      style={{ color: selectedVariant.iconColor, fontSize: "20px" }}
    />
  );

  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      centered
      radius="16px"
      overlayProps={{
        opacity: 0,
        blur: 4,
      }}
      size={size}
      transitionProps={{
        transition: "pop",
        duration: 200,
      }}
      closeButtonProps={{
        style: {
          borderRadius: "16px",
          backgroundColor: neutral[50],
          width: "18px",
          height: "18px",
        },
      }}
      styles={{
        content: {
          borderRadius: "8px",
          border: `1px solid ${neutral[50]}`,
          boxShadow: "0px 0px 19px 0px #00000040",
        },
        header: {
          padding: spacing.sm,
        },
        close: {
          borderRadius: "16px",
          backgroundColor: neutral[50],
          width: "18px",
          height: "18px",
          "&:hover": {
            backgroundColor: neutral[50],
          },
          "&:active": {
            transform: "none",
          },
        },
        body: {
          padding: `0 ${spacing.xxl} ${spacing.lg} ${spacing.xxl}`,
        },
      }}
    >
      <Center h="100%" w="100%">
        <Stack gap="20px" h="100%" w="100%" align="center">
          <Stack gap={spacing.lg} align="center">
            <Center style={iconContainer}>{modalIcon}</Center>
            {children && (
              <Stack gap={spacing.xxs} align="center">
                {children}
              </Stack>
            )}
          </Stack>
          <Center h="100%" w="100%">
            <Group gap="10px" align="center">
              <Button onClick={onCancel} variant="secondary">
                {cancelLabel || selectedVariant.cancelLabel}
              </Button>
              <Button
                onClick={onConfirm}
                variant={selectedVariant.buttonVariant}
                disabled={confirmButtonDisabled}
                loading={confirmButtonLoading}
              >
                {confirmLabel || selectedVariant.confirmLabel}
              </Button>
            </Group>
          </Center>
        </Stack>
      </Center>
    </MantineModal>
  );
};
