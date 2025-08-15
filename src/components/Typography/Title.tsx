import React, { CSSProperties } from 'react';
import { Title as MantineTitle, TitleProps as MantineTitleProps } from '@mantine/core';
import { titleStyle, fontSize, fontWeight } from '../../constants/font';

// Map our custom variants to appropriate Title orders
const titleOrderMap = {
  header: 1,
  sectionHeader: 2,
  subheader: 3,
  sectionSubheader: 4,
  cardHeader: 5,
  cardSubheader: 6,
} as const;

interface TitleProps extends Omit<MantineTitleProps, 'order'> {
  children: React.ReactNode;
  variant?: keyof typeof titleOrderMap;
  size?: keyof typeof fontSize;
  weight?: keyof typeof fontWeight;
  color?: string;
  styles?: CSSProperties;
}

const Title = ({ variant = 'sectionHeader', size, children, weight, color, styles, ...props }: TitleProps) => {
  const selectedVariant = titleStyle[variant];
  const titleOrder = titleOrderMap[variant];
  const customSize = size ? fontSize[size] : {};
  const customWeight = weight ? { fontWeight: fontWeight[weight] } : {};
  const customColor = color ? { color } : {};

  const style = {
    margin: 0,
    padding: 0,
    ...selectedVariant,
    ...customSize,
    ...customWeight,
    ...customColor,
    ...styles,
  };

  return (
    <MantineTitle order={titleOrder} style={style} {...props}>
      {children}
    </MantineTitle>
  );
};

export { Title };
