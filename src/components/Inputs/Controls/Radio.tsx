import React from 'react';
import { Radio as MantineRadio, RadioProps as MantineRadioProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { primary, neutral } from '../../../constants/colors';
import { fontBase, inputFontSize } from '../../../constants/font';

interface RadioProps extends MantineRadioProps {
  styles?: Record<string, CSSObject>;
}

const Radio = ({ styles, ...props }: RadioProps) => {
  const style = {
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    radio: {
      cursor: props.disabled || props.checked ? 'default' : 'pointer',
      margin: 0,
      marginTop: 0,
      lineHeight: 'normal',
      '&[type="radio"]': {
        margin: 0,
        marginTop: 0,
        lineHeight: 'normal',
      },
      '&:checked': {
        backgroundColor: primary[200],
        borderColor: primary[200],
      },
      '&:hover': {
        backgroundColor: props.checked ? primary[200] : neutral[50],
      },
    },
    icon: {
      color: 'white',
    },
    label: {
      cursor: props.disabled ? 'default' : 'pointer',
      ...fontBase,
      fontSize: inputFontSize['md'].fontSize,
      lineHeight: '2.25rem',
      color: neutral[200],
    },
    ...styles,
  };

  return <MantineRadio size="lg" styles={style} {...props} />;
};

export { Radio };
