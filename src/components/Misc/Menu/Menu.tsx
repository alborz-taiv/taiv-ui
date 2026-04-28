import { Menu as MantineMenu, MenuProps as MantineMenuProps } from '@mantine/core';
import { neutral } from '../../../constants/colors';
import { fontBase, fontSize, fontWeight } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export interface MenuProps extends MantineMenuProps {}

const MenuRoot = ({ styles, children, ...props }: MenuProps) => {
  const baseStyles = {
    dropdown: {
      borderRadius: '8px',
      border: `1px solid ${neutral[50]}`,
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
      padding: spacing.xs,
    },
    item: {
      ...fontBase,
      ...fontSize['sm'],
      fontWeight: fontWeight.medium,
      color: neutral[300],
      borderRadius: '6px',
      padding: `${spacing.sm} ${spacing.md}`,
      '&[data-hovered]': {
        backgroundColor: neutral[25],
      },
    },
    itemLabel: {
      ...fontBase,
      ...fontSize['sm'],
      fontWeight: fontWeight.medium,
    },
    label: {
      ...fontBase,
      ...fontSize['xs'],
      fontWeight: fontWeight.medium,
      color: neutral[200],
      padding: `${spacing.xs} ${spacing.md}`,
    },
    divider: {
      margin: `${spacing.xs} 0`,
    },
  };

  return (
    <MantineMenu
      radius={8}
      shadow="md"
      transitionProps={{ duration: 150 }}
      withinPortal
      {...props}
      styles={(theme) => {
        const userStyles =
          typeof styles === 'function' ? styles(theme) : styles ?? {};
        return { ...baseStyles, ...userStyles };
      }}
    >
      {children}
    </MantineMenu>
  );
};

export const Menu = Object.assign(MenuRoot, {
  Target: MantineMenu.Target,
  Dropdown: MantineMenu.Dropdown,
  Item: MantineMenu.Item,
  Label: MantineMenu.Label,
  Divider: MantineMenu.Divider,
});
