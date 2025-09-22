import React, { CSSProperties } from 'react';
import { Text as MantineText, TextProps as MantineTextProps } from '@mantine/core';
import { textStyle, fontSize, fontWeight, fontBase } from '../../constants/font';

interface TextProps extends MantineTextProps {
  children: React.ReactNode;
  variant?: keyof typeof textStyle;
  size?: keyof typeof fontSize;
  weight?: keyof typeof fontWeight;
  color?: string;
  styles?: CSSProperties;
}

const Text = ({ variant = 'body', size, children, weight, color, styles, ...props }: TextProps) => {
  const selectedVariant = textStyle[variant];
  const customSize = size ? fontSize[size] : {};
  const customWeight = weight ? { fontWeight: fontWeight[weight] } : {};
  const customColor = color ? { color } : {};

  const style = {
    margin: 0,
    padding: 0,
    ...styles,
    ...selectedVariant,
    ...customSize,
    ...customWeight,
    ...customColor,
  };

  return (
    <MantineText
      style={style}
      sx={{
        '& b': {
          ...selectedVariant,
          ...customSize,
          ...customWeight,
          ...customColor,
          fontWeight: fontWeight.bold,
        },
      }}
      {...props}
    >
      {children}
    </MantineText>
  );
};

export { Text };
