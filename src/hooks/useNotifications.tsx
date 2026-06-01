import React from 'react';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { Button } from '../components/Inputs/Buttons/Button/Button';
import { Progress } from '../components/Data/Progress/Progress';
import { Group } from '../components/Layout/Group/Group';
import { Stack } from '../components/Layout/Stack/Stack';
import { Text } from '../components/Typography/Text/Text';
import { componentVariants } from '../components/Info/Notifications/variants';

const ACTIONABLE_AUTO_CLOSE = 8000;

type Variant = keyof typeof componentVariants;

type BaseOptions = {
  variant?: Variant;
  message: string;
  title?: string;
  id?: string;
  autoClose?: number | false;
};

type ActionOptions = BaseOptions & {
  label: string;
  onClick: () => void;
  /** Dismiss the notification when the action is clicked. Defaults to `true`. */
  dismissOnClick?: boolean;
};

type ConfirmationOptions = BaseOptions & {
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  /** Optional — defaults to no-op (the notification still dismisses). */
  onCancel?: () => void;
  /** Dismiss the notification when either button is clicked. Defaults to `true`. */
  dismissOnClick?: boolean;
};

export const useNotifications = () => {
  const hide = async (id: string) => {
    mantineNotifications.hide(id);
    await new Promise((resolve) => setTimeout(resolve, 200));
  };

  const _show = (base: BaseOptions, footer?: React.ReactNode) => {
    const { variant = 'info', message, title, id, autoClose } = base;
    const selectedVariant = componentVariants[variant];

    const resolvedAutoClose =
      autoClose !== undefined
        ? autoClose
        : footer
          ? ACTIONABLE_AUTO_CLOSE
          : selectedVariant.autoClose;

    const renderedMessage: React.ReactNode = footer ? (
      <Stack spacing='sm'>
        <Text>{message}</Text>
        <Group position='right' spacing='xs' mr='lg'>
          {footer}
        </Group>
      </Stack>
    ) : (
      message
    );

    mantineNotifications.show({
      title: title || selectedVariant.defaultTitle,
      message: renderedMessage,
      icon: selectedVariant.icon,
      autoClose: resolvedAutoClose,
      id,
      styles: {
        root: {
          borderLeft: `4px solid ${selectedVariant.color}`,
        },
      },
    });
  };

  const show = (options: BaseOptions) => {
    _show(options);
  };

  /** Notification with a single offered next-step button. Use for follow-ups
   *  where dismissing is fine ("Removed. [Undo]", "5 uploaded. [View]"). For
   *  yes/no questions use `showWithConfirmation` instead. */
  const showWithAction = (options: ActionOptions) => {
    const {
      label,
      onClick,
      dismissOnClick = true,
      id: providedId,
      ...rest
    } = options;
    const id = providedId ?? `actionable-${Math.random()}-${Math.random()}`;

    _show(
      { ...rest, id },
      <Button
        size='sm'
        variant='tertiary'
        onClick={() => {
          if (dismissOnClick) mantineNotifications.hide(id);
          onClick();
        }}
      >
        {label}
      </Button>,
    );
  };

  /** Non-blocking yes/no question. Both buttons are real answers. For
   *  high-stakes / destructive prompts that must block the user use
   *  `useConfirmationModal` instead. Inherits the actionable-toast
   *  auto-close (8s) by default — pass `autoClose: false` to pin the
   *  question until the user answers. */
  const showWithConfirmation = (options: ConfirmationOptions) => {
    const {
      confirmLabel,
      cancelLabel,
      onConfirm,
      onCancel,
      dismissOnClick = true,
      id: providedId,
      autoClose,
      ...rest
    } = options;
    const id = providedId ?? `confirmation-${Math.random()}-${Math.random()}`;

    const handleConfirm = () => {
      if (dismissOnClick) mantineNotifications.hide(id);
      onConfirm();
    };
    const handleCancel = () => {
      if (dismissOnClick) mantineNotifications.hide(id);
      onCancel?.();
    };

    _show(
      { ...rest, id, autoClose },
      <>
        <Button size='sm' variant='cancel' onClick={handleCancel}>
          {cancelLabel}
        </Button>
        <Button size='sm' variant='primary' onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </>,
    );
  };

  /** Long-running task notification with a live progress bar. Pin until
   *  caller signals completion via `done` / `fail`. Use for uploads,
   *  exports, bulk operations — anything where the user benefits from
   *  seeing percentage advance in place. */
  const showWithProgress = (options: {
    message: string;
    title?: string;
    id?: string;
    initialValue?: number;
  }) => {
    const {
      message: initialMessage,
      title,
      id: providedId,
      initialValue = 0,
    } = options;
    const id = providedId ?? `progress-${Math.random()}-${Math.random()}`;
    const loadingVariant = componentVariants.loading;

    const renderLoading = (value: number, message: string) => ({
      id,
      title: title ?? loadingVariant.defaultTitle,
      message: (
        <Stack spacing='xs'>
          <Text>{message}</Text>
          <Progress value={value} scale='sm' />
        </Stack>
      ),
      icon: loadingVariant.icon,
      autoClose: false as const,
      withCloseButton: false,
      styles: {
        root: { borderLeft: `4px solid ${loadingVariant.color}` },
      },
    });

    const renderTerminal = (variant: 'success' | 'error', message: string, terminalTitle?: string) => {
      const v = componentVariants[variant];
      return {
        id,
        title: terminalTitle ?? v.defaultTitle,
        message,
        icon: v.icon,
        autoClose: v.autoClose,
        withCloseButton: true,
        styles: {
          root: { borderLeft: `4px solid ${v.color}` },
        },
      };
    };

    mantineNotifications.show(renderLoading(initialValue, initialMessage));

    return {
      id,
      update: (value: number, message?: string) => {
        mantineNotifications.update(
          renderLoading(value, message ?? initialMessage),
        );
      },
      done: (message?: string, terminalTitle?: string) => {
        mantineNotifications.update(
          renderTerminal('success', message ?? initialMessage, terminalTitle),
        );
      },
      fail: (message?: string, terminalTitle?: string) => {
        mantineNotifications.update(
          renderTerminal(
            'error',
            message ??
              'An error has occurred. Please try again. If the issue persists, please contact us at support@taiv.tv',
            terminalTitle,
          ),
        );
      },
    };
  };

  const showLoading = (options: { message: string; title?: string }) => {
    const notificationId = `${Math.random()}-${Math.random()}`;
    show({
      id: notificationId,
      message: options.message,
      title: options.title,
      variant: 'loading',
    });

    return notificationId;
  };

  const showError = () => {
    show({
      variant: 'error',
      message: 'An error has occurred. Please try again. If the issue persists, please contact us at support@taiv.tv',
    });
  };

  return {
    hide,
    show,
    showError,
    showLoading,
    showWithAction,
    showWithConfirmation,
    showWithProgress,
  };
};
