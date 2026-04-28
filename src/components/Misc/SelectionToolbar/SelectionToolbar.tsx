import { IconX } from '@tabler/icons-react';
import type React from 'react';
import { neutral, white } from '../../../constants/colors';
import { fontBase, fontSize } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';
import { IconButton } from '../../Inputs/Buttons/IconButton/IconButton';
import { Group } from '../../Layout/Group/Group';
import { Transition } from '../Transition/Transition';

export interface SelectionToolbarProps {
  /** Whether the toolbar is visible. Drives the transition. */
  opened: boolean;
  /** Number of currently-selected items. Rendered as `{count} selected`. */
  count: number;
  /** Right-aligned action buttons — typically `<Button />`s. */
  actions: React.ReactNode;
  /** Optional slot between count and actions (e.g. a `<Select />`). */
  dropdownSlot?: React.ReactNode;
  /** Fired when the dismiss (×) button is clicked. */
  onDismiss: () => void;
  /** Override the default `{count} selected` label. */
  label?: (count: number) => React.ReactNode;
  /** Fine-tune the bottom offset. Default `16px`. */
  bottomOffset?: number;
  /** Max-width cap on large viewports. Default `768px`. */
  maxWidth?: number;
}

/**
 * Floating bottom action bar shown while items are selected across Library /
 * Playlists / Slides. Pinned above content, below modals. Single row that
 * never wraps.
 */
export const SelectionToolbar = ({
  opened,
  count,
  actions,
  dropdownSlot,
  onDismiss,
  label = (n) => `${n} selected`,
  bottomOffset = 16,
  maxWidth = 768,
}: SelectionToolbarProps) => {
  return (
    <Transition
      duration={200}
      mounted={opened}
      timingFunction='ease-out'
      transition='slide-up'
    >
      {(transitionStyles) => (
        <div
          style={{
            bottom: bottomOffset,
            left: '50%',
            maxWidth: `min(${maxWidth}px, calc(100% - 2rem))`,
            position: 'fixed',
            transform: 'translateX(-50%)',
            width: 'max-content',
            zIndex: 30,
            ...transitionStyles,
          }}
        >
          <Group
            noWrap
            position='apart'
            spacing={spacing.md}
            style={{
              backgroundColor: white,
              border: `1px solid ${neutral[50]}`,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              flexWrap: 'nowrap',
              maxWidth: '100%',
              padding: `${spacing.xs} ${spacing.sm}`,
              whiteSpace: 'nowrap',
              width: '100%',
            }}
          >
            <Group noWrap spacing={spacing.sm} style={{ flexShrink: 0 }}>
              <IconButton
                onClick={onDismiss}
                size='sm'
                styles={{ root: { height: 28, width: 28 } }}
                variant='secondary'
              >
                <IconX />
              </IconButton>
              <span
                style={{
                  ...fontBase,
                  ...fontSize.sm,
                  color: neutral[300],
                  flexShrink: 0,
                  fontWeight: 600,
                }}
              >
                {label(count)}
              </span>
            </Group>
            <Group noWrap spacing={spacing.xs} style={{ flexShrink: 0 }}>
              {dropdownSlot}
              {actions}
            </Group>
          </Group>
        </div>
      )}
    </Transition>
  );
};
