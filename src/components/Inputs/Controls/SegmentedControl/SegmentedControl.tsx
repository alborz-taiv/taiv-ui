import React from 'react';
import {
  SegmentedControl as MantineSegmentedControl,
  SegmentedControlProps as MantineSegmentedControlProps,
} from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { primary, neutral, white } from '../../../../constants/colors';
import { fontBase, fontSize, fontWeight } from '../../../../constants/font';

const componentSizes = {
  sm: { mantineSize: 'md' as const, ...fontSize['xs'] },
  md: { mantineSize: 'lg' as const, ...fontSize['sm'] },
  lg: { mantineSize: 'xl' as const, ...fontSize['md'] },
} as const;

interface SegmentedControlProps extends Omit<MantineSegmentedControlProps, 'size'> {
  size?: keyof typeof componentSizes;
  styles?: Record<string, CSSObject>;
}

const SegmentedControl = ({ styles, size = 'md', color, ...props }: SegmentedControlProps) => {
  const selectedSize = componentSizes[size];
  const style = {
    root: {
      backgroundColor: neutral[50],
    },
    controlActive: {
        backgroundColor: white,
    },
    label: {
      ...fontBase,
      fontSize: selectedSize.fontSize,
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
    control: {
      '&:not(:first-of-type)': {
        borderColor: neutral[100],
      },
    },
    ...styles,
  };

  return <MantineSegmentedControl radius='md' color={color} size={selectedSize.mantineSize} styles={style} transitionTimingFunction='linear' transitionDuration={300} {...props} />;
};

export { SegmentedControl };
