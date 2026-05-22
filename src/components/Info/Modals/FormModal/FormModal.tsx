import React from "react";
import { Modal as MantineModal } from "@mantine/core";
import type { CSSObject } from "@mantine/core";
import { neutral } from "../../../../constants/colors";
import { spacing } from '../../../../constants/spacing';
import { Stack } from "../../../Layout/Stack/Stack";
import { Center } from "../../../Layout/Center/Center";
import { modalVariants } from "../variants";
import { Group } from "../../../Layout/Group/Group";
import { Button, ButtonProps } from "../../../Inputs/Buttons/Button/Button";

/** Style overrides merged into Mantine `Modal` `styles` (object form only). */
export type FormModalStylesOverride = Partial<
  Record<
    | "body"
    | "close"
    | "content"
    | "header"
    | "inner"
    | "overlay"
    | "root"
    | "title",
    CSSObject
  >
>;

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
  confirmRightIcon?: React.ReactNode;
  cancelLeftIcon?: React.ReactNode;
  confirmVariant?: ButtonProps['variant'];
  /** Optional destructive footer action (e.g. Delete on edit modals). Rendered before Cancel. */
  onDelete?: () => void;
  deleteLabel?: string;
  deleteButtonDisabled?: boolean;
  deleteButtonLoading?: boolean;
  deleteLeftIcon?: React.ReactNode;
  fullScreen?: boolean;
  /** Merged into Mantine `Modal` `styles` (e.g. lock body scroll when children use an inner `ScrollArea`). */
  modalStyles?: FormModalStylesOverride;
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
  confirmRightIcon,
  cancelLeftIcon,
  confirmVariant,
  onDelete,
  deleteLabel = "Delete",
  deleteButtonDisabled = false,
  deleteButtonLoading = false,
  deleteLeftIcon,
  modalStyles,
  fullScreen = false,
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
      fullScreen={fullScreen}
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
        ...modalStyles,
        body: {
          padding: `0 ${spacing.xxl} ${spacing.lg} ${spacing.xxl}`,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          ...modalStyles?.body,
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
          ...modalStyles?.close,
        },
        content: {
          borderRadius: "8px",
          border: `1px solid ${neutral[50]}`,
          boxShadow: "0px 0px 19px 0px #00000040",
          display: "flex",
          flexDirection: "column",
          ...modalStyles?.content,
        },
        header: {
          padding: spacing.sm,
          ...modalStyles?.header,
        },
      }}
    >
      <Stack
        gap="20px"
        w="100%"
        align="stretch"
        style={{ minWidth: 0, flex: 1, minHeight: 0 }}
      >
        <Center mx="auto" style={{ ...iconContainer, flexShrink: 0 }}>
          {modalIcon}
        </Center>
        {children && (
          <Stack
            gap={spacing.xxs}
            align="stretch"
            w="100%"
            style={{
              minWidth: 0,
              maxWidth: "100%",
              flex: 1,
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {children}
          </Stack>
        )}
        <Center w="100%" style={{ flexShrink: 0 }}>
          <Group gap="10px" align="center">
            <Button onClick={onCancel} variant="secondary" leftIcon={cancelLeftIcon}>
              {cancelLabel || selectedVariant.cancelLabel}
            </Button>
            {onDelete && (
              <Button
                onClick={onDelete}
                variant="cancel"
                disabled={deleteButtonDisabled}
                loading={deleteButtonLoading}
                leftIcon={deleteLeftIcon}
              >
                {deleteLabel}
              </Button>
            )}
            <Button
              onClick={onConfirm}
              variant={confirmVariant || selectedVariant.buttonVariant}
              disabled={confirmButtonDisabled}
              loading={confirmButtonLoading}
              rightIcon={confirmRightIcon}
            >
              {confirmLabel || selectedVariant.confirmLabel}
            </Button>
          </Group>
        </Center>
      </Stack>
    </MantineModal>
  );
};
