import React from 'react';
import {
  Navbar as MantineNavbar,
  NavbarProps as MantineNavbarProps,
  CSSObject,
} from '@mantine/core';
import { colors } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export interface NavbarProps extends Omit<MantineNavbarProps, 'styles'> {
  styles?: Record<string, CSSObject>;
}

const NavbarComponent = ({ styles, children, ...props }: NavbarProps) => {
  const style: Record<string, CSSObject> = {
    root: {
      ...fontBase,
      backgroundColor: 'white',
      borderRight: `1px solid ${colors.neutral[100]}`,
      padding: spacing.lg,
    },
    ...styles,
  };

  return (
    <MantineNavbar styles={style} {...props}>
      {children}
    </MantineNavbar>
  );
};

export const Navbar = Object.assign(NavbarComponent, {
  Section: MantineNavbar.Section,
});
