import React from 'react';
import { Checkbox as MantineCheckbox, CheckboxProps as MantineCheckboxProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { primary, neutral } from '../../../constants/colors';
import { fontBase, fontSize } from '../../../constants/font';

// Size Presets - Maps to next larger Mantine size, workaround since we dont have a Provider setup
const componentSizes = {
  sm: { mantineSize: 'md', ...fontSize['xs'] },
  md: { mantineSize: 'lg', ...fontSize['sm'] },
  lg: { mantineSize: 'xl', ...fontSize['md'] },
} as const;

interface CheckboxProps extends MantineCheckboxProps {
  checked: boolean;
  styles?: Record<string, CSSObject>;
  size?: keyof typeof componentSizes;
}

const Checkbox = ({ checked, styles, size = 'md', ...props }: CheckboxProps) => {
  const selectedSize = componentSizes[size];
  const style = {
    root: {
      display: 'flex',
      alignItems: 'center',
      '& input[type="checkbox"]': {
        margin: 0,
        marginTop: 0,
        lineHeight: 'normal',
      },
    },
    input: {
      cursor: props.disabled ? 'default' : 'pointer',
      margin: 0,
      marginTop: 0,
      lineHeight: 'normal',
      '&[type="checkbox"]': {
        margin: 0,
        marginTop: 0,
        lineHeight: 'normal',
      },
      '&:checked': {
        backgroundColor: primary[200],
        borderColor: primary[200],
      },
      '&:hover': {
        backgroundColor: checked ? primary[200] : neutral[50],
      },
    },
    icon: {
      color: 'white',
      transform: 'translateY(0)',
    },
    label: {
      cursor: props.disabled ? 'default' : 'pointer',
      ...fontBase,
      fontSize: selectedSize.fontSize,
      color: neutral[200],
    },
    ...styles,
  };

  return <MantineCheckbox checked={checked} size={selectedSize.mantineSize} styles={style} {...props} />;
};

export { Checkbox };
