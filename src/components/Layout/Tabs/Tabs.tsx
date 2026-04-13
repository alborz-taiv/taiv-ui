import React from 'react';
import { Tabs as MantineTabs, TabsProps as MantineTabsProps } from '@mantine/core';
import { fontBase } from '../../../constants/font';
import { colors } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

export interface TabsProps extends Omit<MantineTabsProps, 'children' | 'onChange'> {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | null) => void;
  variant?: 'default' | 'outline' | 'pills';
}

const TabsComponent = ({ children, defaultValue, value, onChange, variant = 'default', styles, ...props }: TabsProps) => {
  const style = {
    root: {
      width: '100%',
    },
    list: {
      borderBottom: variant === 'default' ? `1px solid ${colors.neutral[100]}` : 'none',
      gap: '0',
    },
    tab: {
      padding: `${spacing.sm} 28px`,
      backgroundColor: 'transparent',
      color: colors.neutral[300],
      '&:hover': {
        backgroundColor: variant === 'pills' ? colors.neutral[25] : 'transparent',
        color: colors.primary[300],
      },
      '&[data-active]': {
        backgroundColor: variant === 'pills' ? colors.primary[200] : 'transparent',
        color: variant === 'pills' ? 'white' : colors.primary[300],
        borderBottom: variant === 'default' ? `2px solid ${colors.primary[200]}` : 'none',
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
    <MantineTabs styles={style} radius="lg" defaultValue={defaultValue} value={value} variant={variant} {...props}>
      {children}
    </MantineTabs>
  );
};

export const Tabs = Object.assign(TabsComponent, {
  List: MantineTabs.List,
  Tab: MantineTabs.Tab,
  Panel: MantineTabs.Panel,
});
