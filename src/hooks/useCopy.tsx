import { useClipboard } from '@mantine/hooks';
import { useNotifications } from './useNotifications';

export const useCopy = () => {
  const clipboard = useClipboard();
  const notifications = useNotifications();

  const copy = (options: {
    value: string;
    label?: string;
    onCopy?: (value: string) => void;
    showNotification?: boolean;
    notificationMessage?: string;
  }) => {
    const {
      onCopy,
      showNotification = true,
      notificationMessage = `${options.label ? `${options.label}: ` : ''}${options.value}`,
    } = options || {};

    clipboard.copy(options.value);
    onCopy?.(options.value);

    if (showNotification) {
      notifications.show({
        message: notificationMessage,
        variant: 'copy',
      });
    }
  };

  return { copy };
};
