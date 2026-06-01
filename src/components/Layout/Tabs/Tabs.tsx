import {
  type TabProps as MantineTabProps,
  Tabs as MantineTabs,
  type TabsProps as MantineTabsProps,
} from '@mantine/core';
import type React from 'react';
import {
  type ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  useContext,
} from 'react';
import { colors } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';
import { Badge } from '../../Info/Badge/Badge';
import { OverflowFade } from '../../Misc/OverflowFade/OverflowFade';

export interface TabsProps
  extends Omit<MantineTabsProps, 'children' | 'onChange'> {
  /**
   * Color the edge-fade indicators on `Tabs.List` fade into. Match the
   * surrounding surface so the strip dissolves cleanly into the page.
   * Default: 'white'.
   */
  background?: string;
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | null) => void;
  variant?: 'default' | 'outline' | 'pills';
}

// Internal context so `Tabs.List` can pull the parent `<Tabs background>`
// without consumers having to thread the prop through manually.
const TabsBackgroundContext = createContext<string>('white');

const TabsComponent = ({
  background = 'white',
  children,
  defaultValue,
  value,
  onChange,
  variant = 'default',
  styles,
  ...props
}: TabsProps) => {
  const style = {
    panel: {
      padding: `${spacing.lg} ${spacing.sm}`,
    },
    root: {
      width: '100%',
    },
    tab: {
      '&:hover': {
        backgroundColor:
          variant === 'pills' ? colors.neutral[25] : 'transparent',
        color: colors.primary[200],
      },
      '&[data-active]': {
        backgroundColor:
          variant === 'pills' ? colors.primary[200] : 'transparent',
        borderBottom:
          variant === 'default' ? `2px solid ${colors.primary[200]}` : 'none',
        color: variant === 'pills' ? 'white' : colors.primary[200],
      },
      '&[data-active]:hover': {
        backgroundColor:
          variant === 'pills' ? colors.primary[200] : 'transparent',
        color: variant === 'pills' ? 'white' : colors.primary[200],
      },
      backgroundColor: 'transparent',
      color: colors.neutral[300],
      flexShrink: 0,
      padding: `${spacing.sm} 28px`,
    },
    tabLabel: {
      ...fontBase,
      fontSize: '16px',
      lineHeight: '24px',
    },
    tabsList: {
      borderBottom:
        variant === 'default' ? `1px solid ${colors.neutral[100]}` : 'none',
      flexWrap: 'nowrap' as const,
      gap: '0',
    },
    ...styles,
  };

  return (
    <TabsBackgroundContext.Provider value={background}>
      <MantineTabs
        defaultValue={defaultValue}
        onTabChange={onChange}
        radius='lg'
        styles={style}
        value={value}
        variant={variant}
        {...props}
      >
        {children}
      </MantineTabs>
    </TabsBackgroundContext.Provider>
  );
};

export interface TabProps
  extends Omit<MantineTabProps, 'rightSection' | 'icon'> {
  count?: number;
  rightSection?: React.ReactNode;
  icon?: React.ReactNode;
}

// `forwardRef` so consumers (and Mantine internals) can attach a ref to the
// underlying `<button role="tab">` — focus management, scroll-into-view, and
// intersection observers all expect this. Mirrors `TabsList` below; without
// it, `<Tabs.Tab ref={...}>` would silently no-op.
const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ count, rightSection, icon, children, ...props }, ref) => {
    const resolvedRightSection =
      count !== undefined ? (
        <Badge color='neutral' size='sm' variant='filled'>
          {count}
        </Badge>
      ) : (
        rightSection
      );
    return (
      <MantineTabs.Tab
        ref={ref}
        icon={icon}
        rightSection={resolvedRightSection}
        {...props}
      >
        {children}
      </MantineTabs.Tab>
    );
  },
);
Tab.displayName = 'Tabs.Tab';

// Tabs.List wrapper: injects the OverflowFade so any horizontally-overflowing
// tab strip (long labels, many tabs, narrow viewport) gets a bidirectional
// gradient cue automatically — no consumer changes required.
//
// DOM contract: there is now an extra wrapper element above `.mantine-Tabs-tabsList`
// (the OverflowFade div). Implications:
//   • CSS `>` direct-child selectors against the list will skip a level.
//   • `position: sticky` applied to `Tabs.List` resolves against the OverflowFade
//     ancestor, not the page — sticky should be applied to the parent `<Tabs>`
//     root instead.
//   • The OverflowFade clips horizontal overflow; positioned descendants of
//     `Tabs.List` (popovers/dropdowns escaping the strip) will be clipped.
//     Anchor those off the parent `<Tabs>` root or use `Portal`.
const TabsList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof MantineTabs.List>
>(({ children, ...props }, ref) => {
  const background = useContext(TabsBackgroundContext);
  return (
    <OverflowFade background={background}>
      <MantineTabs.List ref={ref} {...props}>
        {children}
      </MantineTabs.List>
    </OverflowFade>
  );
});
TabsList.displayName = 'Tabs.List';

export const Tabs = Object.assign(TabsComponent, {
  List: TabsList,
  Panel: MantineTabs.Panel,
  Tab,
});
