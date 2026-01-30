import React from "react";
import { Modal as MantineModal } from "@mantine/core";
import { neutral } from "../../../../constants/colors";
import { Stack } from "../../../Layout/Stack/Stack";
import { Center } from "../../../Layout/Center/Center";
import { modalVariants } from "../variants";
import { Group } from "../../../Layout/Group/Group";
import { Button } from "../../../Inputs/Buttons/Button/Button";

export interface FormModalProps {
  opened: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  width?: string | number;
  modalVariant?: keyof typeof modalVariants;
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
  width = "40rem",
  modalVariant = "info",
  onCancel,
  onConfirm,
  cancelLabel,
  confirmLabel,
}: FormModalProps) => {
  const selectedVariant = modalVariants[modalVariant];
  const iconContainer = {
    width: "4.2rem",
    height: "4.2rem",
    borderRadius: "50%",
    backgroundColor: selectedVariant.iconBackgroundColor,
    border: `2px solid ${selectedVariant.iconColor}`,
  };

  const modalIcon = icon || (
    <i
      className={selectedVariant.icon}
      style={{ color: selectedVariant.iconColor, fontSize: "2rem" }}
    />
  );

  return (
    <MantineModal
      opened={opened}
      onClose={onClose}
      centered
      radius={"16px"}
      overlayProps={{
        opacity: 0,
        blur: 4,
      }}
      size={width}
      transitionProps={{
        transition: "pop",
        duration: 200,
      }}
      closeButtonProps={{
        style: {
          borderRadius: "16px",
          backgroundColor: neutral[50],
          width: "1.8rem",
          height: "1.8rem",
        },
      }}
      styles={{
        content: {
          borderRadius: "8px",
          border: `1px solid ${neutral[50]}`,
          boxShadow: "0px 0px 19px 0px #00000040",
        },
        header: {
          padding: "0.8rem",
        },
        close: {
          borderRadius: "16px",
          backgroundColor: neutral[50],
          width: "1.8rem",
          height: "1.8rem",
          "&:hover": {
            backgroundColor: neutral[50],
          },
          "&:active": {
            transform: "none",
          },
        },
        body: {
          padding: "0 3.2rem 1.6rem 3.2rem",
        },
      }}
    >
      <Center h="100%" w="100%">
        <Stack gap="2rem" h="100%" w="100%" align="center">
          <Stack gap="1.5rem" align="center">
            <Center style={iconContainer}>{modalIcon}</Center>
            {children && (
              <Stack gap="0.25rem" align="center">
                {children}
              </Stack>
            )}
          </Stack>
          <Center h="100%" w="100%">
            <Group gap="1rem" align="center">
              <Button onClick={onCancel} variant="secondary">
                {cancelLabel || selectedVariant.cancelLabel}
              </Button>
              <Button
                onClick={onConfirm}
                variant={selectedVariant.buttonVariant}
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
