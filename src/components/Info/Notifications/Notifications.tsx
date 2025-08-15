import React from 'react';
import { notifications as mantineNotifications } from '@mantine/notifications';
import { componentVariants } from './variants';

export const useNotifications = () => {
  const hide = async (id: string) => {
    mantineNotifications.hide(id);
    await new Promise((resolve) => setTimeout(resolve, 200));
  };

  const show = (options: {
    variant?: keyof typeof componentVariants;
    message: string;
    title?: string;
    id?: string;
  }) => {
    const { variant = 'info', message, title, id } = options;

    const selectedVariant = componentVariants[variant];

    mantineNotifications.show({
      title: title || selectedVariant.defaultTitle,
      message,
      icon: selectedVariant.icon,
      autoClose: selectedVariant.autoClose,
      id,
      styles: {
        root: {
          borderLeft: `4px solid ${selectedVariant.color}`,
        },
      },
    });
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

  return { show, showError, showLoading, hide };
};
