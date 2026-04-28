import React, { ComponentPropsWithoutRef, createContext, forwardRef, useContext } from 'react';
import { Tabs as MantineTabs, TabsProps as MantineTabsProps, TabProps as MantineTabProps } from '@mantine/core';
import { fontBase } from '../../../constants/font';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';
import { Badge } from '../../Info/Badge/Badge';
import { OverflowFade } from '../../Misc/OverflowFade/OverflowFade';

export interface TabsProps extends Omit<MantineTabsProps, 'children' | 'onChange'> {
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

const TabsComponent = ({ background = 'white', children, defaultValue, value, onChange, variant = 'default', styles, ...props }: TabsProps) => {
  const style = {
    root: {
      width: '100%',
    },
    tabsList: {
      borderBottom: variant === 'default' ? `1px solid ${colors.neutral[100]}` : 'none',
      flexWrap: 'nowrap' as const,
      gap: '0',
    },
    tab: {
      backgroundColor: 'transparent',
      color: colors.neutral[300],
      flexShrink: 0,
      padding: `${spacing.sm} 28px`,
      '&:hover': {
        backgroundColor: variant === 'pills' ? colors.neutral[25] : 'transparent',
        color: colors.primary[300],
      },
      '&[data-active]': {
        backgroundColor: variant === 'pills' ? colors.primary[200] : 'transparent',
        borderBottom: variant === 'default' ? `2px solid ${colors.primary[200]}` : 'none',
        color: variant === 'pills' ? 'white' : colors.primary[300],
      },
      '&[data-active]:hover': {
        backgroundColor: variant === 'pills' ? colors.primary[200] : 'transparent',
        color: variant === 'pills' ? 'white' : colors.primary[300],
      },
    },
    tabLabel: {
      ...fontBase,
      fontSize: '16px',
      lineHeight: '24px',
    },
    panel: {
      padding: `${spacing.lg} ${spacing.sm}`,
    },
    ...styles,
  };

  return (
    <TabsBackgroundContext.Provider value={background}>
      <MantineTabs styles={style} radius="lg" defaultValue={defaultValue} value={value} onTabChange={onChange} variant={variant} {...props}>
        {children}
      </MantineTabs>
    </TabsBackgroundContext.Provider>
  );
};

export interface TabProps extends Omit<MantineTabProps, 'rightSection' | 'icon'> {
  count?: number;
  rightSection?: React.ReactNode;
  icon?: React.ReactNode;
}

const Tab = ({ count, rightSection, icon, children, ...props }: TabProps) => {
  const resolvedRightSection =
    count !== undefined ? (
      <Badge size='sm' color='neutral' variant='filled'>
        {count}
      </Badge>
    ) : (
      rightSection
    );
  return (
    <MantineTabs.Tab rightSection={resolvedRightSection} icon={icon} {...props}>
      {children}
    </MantineTabs.Tab>
  );
};

// Tabs.List wrapper: injects the OverflowFade so any horizontally-overflowing
// tab strip (long labels, many tabs, narrow viewport) gets a bidirectional
// gradient cue automatically — no consumer changes required.
const TabsList = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof MantineTabs.List>>(
  ({ children, ...props }, ref) => {
    const background = useContext(TabsBackgroundContext);
    return (
      <OverflowFade background={background}>
        <MantineTabs.List ref={ref} {...props}>
          {children}
        </MantineTabs.List>
      </OverflowFade>
    );
  },
);
TabsList.displayName = 'Tabs.List';

export const Tabs = Object.assign(TabsComponent, {
  List: TabsList,
  Tab,
  Panel: MantineTabs.Panel,
});
