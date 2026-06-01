import {
  SegmentedControl as MantineSegmentedControl,
  type SegmentedControlProps as MantineSegmentedControlProps,
} from '@mantine/core';
import type { CSSObject } from '@mantine/styles';
import React from 'react';
import { neutral, primary, white } from '../../../../constants/colors';
import { fontBase, fontWeight } from '../../../../constants/font';

const componentSizes = {
  sm: { mantineSize: 'md' as const, height: 28, paddingX: 12, fontSize: 12 },
  md: { mantineSize: 'lg' as const, height: 36, paddingX: 16, fontSize: 14 },
  lg: { mantineSize: 'xl' as const, height: 44, paddingX: 20, fontSize: 16 },
} as const;

interface SegmentedControlProps
  extends Omit<MantineSegmentedControlProps, 'size'> {
  size?: keyof typeof componentSizes;
  styles?: Record<string, CSSObject>;
}

const SegmentedControl = ({
  styles,
  size = 'md',
  color,
  ...props
}: SegmentedControlProps) => {
  const selectedSize = componentSizes[size];
  const style = {
    root: {
      backgroundColor: neutral[50],
      minHeight: `${selectedSize.height}px`,
    },
    control: {
      height: `${selectedSize.height}px`,
      '&:not(:first-of-type)': {
        borderColor: neutral[100],
      },
    },
    controlActive: {
      backgroundColor: white,
    },
    label: {
      ...fontBase,
      height: `${selectedSize.height}px`,
      padding: `0 ${selectedSize.paddingX}px`,
      fontSize: `${selectedSize.fontSize}px`,
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:not([data-active])': {
        color: neutral[200],
      },
      '&[data-active]': {
        '&, &:hover': {
          color: primary[200],
          fontWeight: fontWeight.semibold,
        },
      },
    },
    ...styles,
  };

  return (
    <MantineSegmentedControl
      color={color}
      radius='md'
      size={selectedSize.mantineSize}
      styles={style}
      transitionDuration={300}
      transitionTimingFunction='linear'
      {...props}
    />
  );
};

export { SegmentedControl };
