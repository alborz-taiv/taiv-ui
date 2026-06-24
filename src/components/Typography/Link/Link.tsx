import React from 'react';
import { Anchor, AnchorProps } from '@mantine/core';
import { primary } from '../../../constants/colors';
import { fontSize, fontWeight, textStyle } from '../../../constants/font';

export interface LinkProps extends AnchorProps {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof textStyle;
  size?: keyof typeof fontSize;
  weight?: keyof typeof fontWeight;
  color?: string;
  external?: boolean;
}

const Link = ({
  href,
  children,
  variant = 'body',
  size,
  weight,
  color = primary[200],
  external = false,
  ...props
}: LinkProps) => {
  const style = {
    ...textStyle[variant],
    ...(size ? fontSize[size] : {}),
    ...(weight ? { fontWeight: fontWeight[weight] } : {}),
    color,
  };

  const externalProps = external ? { target: '_blank', rel: 'noreferrer' } : {};

  return (
    <Anchor
      href={href}
      style={style}
      sx={{
        textDecoration: 'none',
        '&:hover, &:focus': { color, textDecoration: 'underline' },
      }}
      {...externalProps}
      {...props}
    >
      {children}
    </Anchor>
  );
};

export { Link };
