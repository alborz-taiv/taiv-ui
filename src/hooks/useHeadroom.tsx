import { useHeadroom as useMantineHeadroom } from '@mantine/hooks';

/**
 * Re-export of Mantine v6's `useHeadroom` hook for show-on-scroll-up / hide-on-scroll-down
 * headers.
 *
 * Returns a boolean — `true` when the element should be pinned (visible), `false` when it
 * should be released (hidden). Use it to conditionally translate a fixed header offscreen.
 *
 * @example
 * const pinned = useHeadroom({ fixedAt: 120 });
 * return (
 *   <header style={{ transform: pinned ? 'translateY(0)' : 'translateY(-100%)' }}>
 *     ...
 *   </header>
 * );
 */
export const useHeadroom = useMantineHeadroom;
