import React from 'react';
import { Card as MantineCard, CardProps as MantineCardProps } from '@mantine/core';

// Mantine's `CardProps` omits the native `<div>` attributes (they normally
// arrive through its polymorphic wrapper). Since this is a plain wrapper that
// spreads `...props` onto the rendered div, re-add them so consumers can pass
// `onClick`, `onMouseEnter`, etc. without casting — the Card renders as a div
// and forwards these at runtime regardless.
export interface CardProps
  extends MantineCardProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof MantineCardProps> {
  children: React.ReactNode;
  animate?: boolean;
}

export const Card = ({ children, animate = false, p="24px", radius="20px", ...props }: CardProps) => {
  const hoverAnimation = {
    style: { transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out' },
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0px 2px 8px 0px rgba(0, 0, 0, 0.05)';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };
  return (
    <MantineCard p={p} radius={radius} withBorder {...(animate ? hoverAnimation : {})} {...props}>
      {children}
    </MantineCard>
  );
};
