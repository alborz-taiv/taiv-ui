import React from "react";
import { Modal as MantineModal } from "@mantine/core";
import type { CSSObject } from "@mantine/core";
import { neutral } from "../../../../constants/colors";
import { spacing } from "../../../../constants/spacing";
import { Stack } from "../../../Layout/Stack/Stack";
import { Center } from "../../../Layout/Center/Center";
import { Title } from "../../../Typography/Title/Title";
import { modalVariants } from "../variants";
import { Group } from "../../../Layout/Group/Group";
import { Button, ButtonProps } from "../../../Inputs/Buttons/Button/Button";

/** Style overrides merged into Mantine `Modal` `styles` (object form only). */
export type FormModalV2StylesOverride = Partial<
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

export interface FormModalV2Props {
  opened: boolean;
  onClose: () => void;
  icon?: React.ReactElement;
  /** Pinned title rendered in the header zone — stays visible while body scrolls. */
  title?: string;
  /** Pinned subtitle rendered below the title in the header zone. */
  subtitle?: string;
  /**
   * Form content. Rendered inside a scrollable body zone — the body grows
   * up to the available modal height, then scrolls. Consumers do NOT need to
   * wrap children in a ScrollArea; the body owns scroll behavior.
   */
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
  /** Merged into Mantine `Modal` `styles`. Consumer overrides win. */
  modalStyles?: FormModalV2StylesOverride;
  /**
   * Override for the pinned footer zone. When provided, replaces the
   * default Cancel/Delete/Confirm button cluster entirely — useful for
   * content pickers, multi-step wizards, or any flow whose footer doesn't
   * map cleanly onto the three-button preset. The override is rendered in
   * the same `flexShrink: 0` slot so layout invariants (scrollable body,
   * pinned footer) hold either way.
   */
  footer?: React.ReactNode;
}

/**
 * Three-zone modal: pinned header (icon + title + subtitle), scrollable body,
 * pinned footer (buttons). The body is the only scroll surface — consumers
 * pass form fields as children without any wrapper.
 *
 * Scroll height is enforced by flex layout, so content can never render behind
 * the footer regardless of viewport size.
 */
export const FormModalV2 = ({
  opened,
  onClose,
  icon,
  title,
  subtitle,
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
  footer,
}: FormModalV2Props) => {
  const selectedVariant = modalVariants[modalVariant];
  const iconContainer = {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: selectedVariant.iconBackgroundColor,
    border: `2px solid ${selectedVariant.iconColor}`,
  };

  const coloredIcon =
    icon &&
    React.cloneElement(icon, {
      color: icon.props.color || selectedVariant.iconColor,
    });

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
          // Tighter side padding on fullScreen (mobile) — `xxl` (32px)
          // eats ~17% of a 375px viewport and forces the form's 2-col
          // grids to overflow the right edge.
          padding: fullScreen
            ? `0 ${spacing.md} ${spacing.lg} ${spacing.md}`
            : `0 ${spacing.xxl} ${spacing.lg} ${spacing.xxl}`,
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
        {/* Pinned header zone: icon + optional title + optional subtitle. */}
        <Stack
          gap={spacing.sm}
          align="center"
          w="100%"
          style={{ minWidth: 0, flexShrink: 0 }}
        >
          <Center mx="auto" style={iconContainer}>
            {modalIcon}
          </Center>
          {title && (
            <Title variant="cardHeader" align="center">
              {title}
            </Title>
          )}
          {subtitle && (
            <Title variant="cardSubheader" align="center">
              {subtitle}
            </Title>
          )}
        </Stack>

        {/* Scrollable body zone: flex:1 + min-height:0 makes this exactly fill
            the space between header and footer. overflow-y:auto handles scroll
            natively. Consumers don't need to wrap children. */}
        {children && (
          <Stack
            gap={spacing.lg}
            align="stretch"
            w="100%"
            style={{
              minWidth: 0,
              maxWidth: "100%",
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {children}
          </Stack>
        )}

        {/* Pinned footer zone. When `footer` is provided, render it
            verbatim in the flex-shrink-0 slot — replaces the default
            Cancel/Delete/Confirm cluster. Lets consumers like the
            content picker drop in custom action rows (selection count,
            Preview button, wizard navigation) without losing the
            scrollable-body + pinned-footer layout. */}
        {footer !== undefined ? (
          <div style={{ flexShrink: 0, width: '100%' }}>{footer}</div>
        ) : (
          <Center w="100%" style={{ flexShrink: 0 }}>
            <Group gap="10px" align="center">
              <Button
                onClick={onCancel}
                variant="secondary"
                leftIcon={cancelLeftIcon}
              >
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
        )}
      </Stack>
    </MantineModal>
  );
};
