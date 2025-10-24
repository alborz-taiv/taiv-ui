import React from 'react';
import { Card as MantineCard, CardProps as MantineCardProps } from '@mantine/core';

export interface CardProps extends MantineCardProps {
  children: React.ReactNode;
  animate?: boolean;
}

export const Card = ({ children, animate = false, ...props }: CardProps) => {
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
    <MantineCard p="1.8rem" radius="20px" withBorder {...(animate ? hoverAnimation : {})} {...props}>
      {children}
    </MantineCard>
  );
};
