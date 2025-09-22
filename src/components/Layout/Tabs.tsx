import React from 'react';
import { Tabs as MantineTabs, TabsProps as MantineTabsProps } from '@mantine/core';
import { fontBase } from '../../constants/font';
import { colors } from '../../constants/colors';

export interface TabsProps extends Omit<MantineTabsProps, 'children' | 'onChange' | 'placement'> {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string | null) => void;
  orientation?: 'horizontal' | 'vertical';
  placement?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'default' | 'outline' | 'pills';
}

const TabsComponent = ({
  children,
  defaultValue,
  value,
  onChange,
  orientation = 'horizontal',
  placement = 'top',
  variant = 'default',
  styles,
  ...props
}: TabsProps) => {
  const style = {
    root: {
      width: '100%',
    },
    list: {
      borderBottom: variant === 'default' ? `1px solid ${colors.neutral[100]}` : 'none',
      gap: '0',
    },
    tab: {
      padding: '0.8rem 2.8rem',
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
      fontSize: '1.6rem',
      lineHeight: '2.4rem',
    },
    panel: {
      padding: '1.6rem 0.8rem',
    },
    ...styles,
  };

  return (
    <MantineTabs
      styles={style}
      radius="lg"
      defaultValue={defaultValue}
      value={value}
      orientation={orientation}
      variant={variant}
      {...props}
    >
      {children}
    </MantineTabs>
  );
};

export const Tabs = Object.assign(TabsComponent, {
  List: MantineTabs.List,
  Tab: MantineTabs.Tab,
  Panel: MantineTabs.Panel,
}); 