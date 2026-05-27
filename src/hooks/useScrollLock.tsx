import { useScrollLock as useMantineScrollLock } from '@mantine/hooks';

/**
 * Re-export of Mantine v6's `useScrollLock` hook for locking body scroll while
 * a custom overlay/modal is open. Prevents the page behind a `position: fixed`
 * overlay from scrolling ("scroll bleed") — the same mechanism the toolkit's
 * `Modal` / `Drawer` use internally. Reach for this when building a bespoke
 * overlay that isn't a Mantine `Modal`/`Drawer`.
 *
 * Pass `true` to lock and `false` to release. Compensates for scrollbar width
 * (no layout shift) and restores the scroll position when released.
 *
 * @example
 * // Mount-gated overlay (parent renders it only while open):
 * useScrollLock(true);
 *
 * @example
 * // Always-mounted overlay toggled by state:
 * useScrollLock(opened);
 */
export const useScrollLock = useMantineScrollLock;
