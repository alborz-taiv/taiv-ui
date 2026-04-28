import { useDisclosure as useMantineDisclosure } from '@mantine/hooks';

/**
 * Re-export of Mantine v6's `useDisclosure` hook for managing boolean open/closed state.
 *
 * Returns a tuple: `[opened, { open, close, toggle }]`.
 *
 * @example
 * const [opened, { open, close, toggle }] = useDisclosure(false);
 */
export const useDisclosure = useMantineDisclosure;
