import type React from 'react';
import { spacing } from '../../../constants/spacing';
import { Text } from '../../Typography/Text/Text';
import { Center } from '../Center/Center';
import { Loader } from '../Loader/Loader';
import { Stack } from '../Stack/Stack';

export type DataStateVariant = 'loading' | 'empty';

export interface DataStateProps {
  variant: DataStateVariant;
  /** Primary message. Defaults to `'Loading...'` / `'No results'`. */
  message?: React.ReactNode;
  /**
   * Optional action (e.g. a "Add item" button) rendered below the message
   * for the `empty` variant. Ignored for `loading`.
   */
  action?: React.ReactNode;
  /** Loader size when `variant='loading'`. Default `'xl'`. */
  loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Vertical padding applied to the outer `Center`. Default `spacing.xxl`. */
  py?: string | number;
  /** Horizontal padding applied to the outer `Center`. */
  px?: string | number;
  /** Minimum height of the outer `Center`. Useful inside table placeholders. */
  minHeight?: string | number;
}

/**
 * Canonical placeholder used in the slot where data *would* render. Pattern:
 *
 * ```tsx
 * if (isLoading) return <DataState variant='loading' />;
 * if (items.length === 0) return <DataState variant='empty' />;
 * return <ActualContent />;
 * ```
 *
 * Wraps the existing `Center` + `Stack` + `Loader` + `Text` composition used
 * across Taiv screens so feature code doesn't have to re-assemble it.
 */
export const DataState = ({
  variant,
  message,
  action,
  loaderSize = 'xl',
  py = spacing.xxl,
  px,
  minHeight,
}: DataStateProps) => {
  const resolvedMessage =
    message ?? (variant === 'loading' ? 'Loading...' : 'No results');

  return (
    <Center mih={minHeight} px={px} py={py}>
      <Stack align='center' gap={spacing.sm}>
        {variant === 'loading' ? <Loader size={loaderSize} /> : null}
        <Text variant='subtle'>{resolvedMessage}</Text>
        {variant === 'empty' && action ? <Center>{action}</Center> : null}
      </Stack>
    </Center>
  );
};
