import { Box, Popover, UnstyledButton } from '@mantine/core';
import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { neutral, primary, white } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';
import { SearchBar } from '../../Inputs/TextInputs/SearchBar/SearchBar';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Tooltip } from '../../Info/Tooltips/Tooltip/Tooltip';

// A generic searchable-list popover for picking a single item from a set.
//
// Designed for "add to playlist" / "move to folder" / "assign to user" style
// flows where:
//   - The list can be short or long (5 → hundreds of items)
//   - Idle state should stay compact (top N most-recent visible by default)
//   - Search should reach across the full list when the user types
//   - A footer slot ("+ Create new …") is common
//
// Pattern: anchored Mantine Popover. Compose via `Picker.Target` for the
// trigger; the dropdown is owned by the component. Supports controlled
// `opened` for cases where the trigger is a Menu.Item nested in another
// dropdown.

export interface PickerItem {
  id: string;
  label: string;
  /** Right-aligned secondary info (e.g. "5 slides"). */
  meta?: ReactNode;
  /**
   * Optional sortable timestamp for automatic recency. Larger = more recent.
   * Items without `recencyKey` sort to the end of the recent view.
   */
  recencyKey?: number;
  /** When true, item renders disabled (greyed-out) and is not clickable. */
  disabled?: boolean;
  /** Tooltip text shown on hover when disabled. */
  disabledReason?: string;
}

export type PickerPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface PickerProps {
  items: PickerItem[];
  /**
   * How many recent items to show in the compact (idle) view. If `items`
   * has ≤ this many entries, all are shown and the "Show all" toggle is
   * hidden. Default: 3.
   */
  recentCount?: number;
  onSelect: (item: PickerItem) => void;
  searchPlaceholder?: string;
  /** Shown when items is empty or search has no matches. */
  emptyMessage?: string;
  /** Slot rendered below the list — typically a "+ Create new" button. */
  footer?: ReactNode;
  /**
   * Controlled-open mode. When provided, parent owns open state — useful for
   * triggering programmatically from outside the Target (e.g. from a kebab
   * Menu.Item that closes its own Menu before opening the Picker).
   */
  opened?: boolean;
  onOpenChange?: (opened: boolean) => void;
  position?: PickerPosition;
  width?: number;
  /** Wrap dropdown in a portal to escape stacking contexts. Default true. */
  withinPortal?: boolean;
  children: ReactNode;
}

interface PickerItemRowProps {
  item: PickerItem;
  onSelect: () => void;
}

const PickerItemRow = ({ item, onSelect }: PickerItemRowProps) => {
  const button = (
    <UnstyledButton
      onClick={item.disabled ? undefined : onSelect}
      disabled={item.disabled}
      sx={{
        ...fontBase,
        alignItems: 'center',
        color: item.disabled ? neutral[100] : neutral[300],
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        fontSize: '14px',
        fontWeight: 500,
        gap: spacing.sm,
        justifyContent: 'space-between',
        lineHeight: '22px',
        padding: `${spacing.sm} ${spacing.md}`,
        transition: 'background-color 120ms ease',
        width: '100%',
        '&:hover': item.disabled ? {} : { backgroundColor: neutral[25] },
      }}
    >
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {item.label}
      </span>
      {item.meta && (
        <span style={{ flexShrink: 0, color: neutral[200] }}>{item.meta}</span>
      )}
    </UnstyledButton>
  );

  if (item.disabled && item.disabledReason) {
    return <Tooltip text={item.disabledReason}>{button}</Tooltip>;
  }
  return button;
};

const PickerTarget = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => (
    <Popover.Target ref={ref}>{children as React.ReactElement}</Popover.Target>
  ),
);
PickerTarget.displayName = 'Picker.Target';

const PickerComponent = ({
  items,
  recentCount = 3,
  onSelect,
  searchPlaceholder = 'Search…',
  emptyMessage = 'No items',
  footer,
  opened,
  onOpenChange,
  position = 'bottom-end',
  width = 280,
  withinPortal = true,
  children,
}: PickerProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = opened !== undefined;
  const isOpen = isControlled ? opened : internalOpen;
  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  // Reset transient view state every time the popover closes so it opens
  // fresh next time (no stale search query / "show all" stuck on).
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setShowAll(false);
    }
  }, [isOpen]);

  const sortedByRecency = useMemo(
    () =>
      [...items].sort((a, b) => (b.recencyKey ?? 0) - (a.recencyKey ?? 0)),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedByRecency;
    return sortedByRecency.filter((i) => i.label.toLowerCase().includes(q));
  }, [sortedByRecency, query]);

  const isSearching = query.trim().length > 0;
  const showShowAllToggle =
    !isSearching && !showAll && items.length > recentCount;
  const showRecentHeader = showShowAllToggle;

  const visibleItems = useMemo(() => {
    if (isSearching) return filtered;
    if (showAll || items.length <= recentCount) return sortedByRecency;
    return sortedByRecency.slice(0, recentCount);
  }, [isSearching, filtered, showAll, items.length, recentCount, sortedByRecency]);

  return (
    <Popover
      opened={isOpen}
      onChange={setOpen}
      position={position}
      withinPortal={withinPortal}
      shadow='md'
      radius={8}
      width={width}
      offset={8}
      styles={{
        dropdown: {
          padding: 0,
          backgroundColor: white,
          border: `1px solid ${neutral[50]}`,
        },
      }}
    >
      {children}
      <Popover.Dropdown>
        <Stack spacing={0}>
          <Box p={spacing.xs} style={{ borderBottom: `1px solid ${neutral[50]}` }}>
            <SearchBar
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              fullWidth
              size='sm'
            />
          </Box>
          {showRecentHeader && (
            <Box
              px={spacing.md}
              pt={spacing.sm}
              pb={spacing.xs}
              style={{ ...fontBase }}
            >
              <Text variant='label' style={{ color: neutral[200] }}>
                Recent
              </Text>
            </Box>
          )}
          <Box style={{ maxHeight: 280, overflowY: 'auto' }}>
            {visibleItems.length === 0 ? (
              <Box p={spacing.md} style={{ textAlign: 'center' }}>
                <Text variant='subtle'>{emptyMessage}</Text>
              </Box>
            ) : (
              visibleItems.map((item) => (
                <PickerItemRow
                  key={item.id}
                  item={item}
                  onSelect={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                />
              ))
            )}
          </Box>
          {showShowAllToggle && (
            <Box
              p={spacing.xs}
              style={{ borderTop: `1px solid ${neutral[50]}` }}
            >
              <UnstyledButton
                onClick={() => setShowAll(true)}
                sx={{
                  ...fontBase,
                  color: primary[200],
                  cursor: 'pointer',
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: `${spacing.xs} ${spacing.sm}`,
                  textAlign: 'center',
                  width: '100%',
                  '&:hover': { color: primary[300] },
                }}
              >
                Show all {items.length}
              </UnstyledButton>
            </Box>
          )}
          {footer && (
            <Box
              p={spacing.xs}
              style={{ borderTop: `1px solid ${neutral[50]}` }}
            >
              {footer}
            </Box>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export const Picker = Object.assign(PickerComponent, { Target: PickerTarget });
