import { Burger as MantineBurger, BurgerProps as MantineBurgerProps } from '@mantine/core';
import { neutral } from '../../../constants/colors';

export interface BurgerProps extends MantineBurgerProps {}

const Burger = ({ color = neutral[300], size = 'md', transitionDuration = 200, ...props }: BurgerProps) => {
  return (
    <MantineBurger
      color={color}
      size={size}
      transitionDuration={transitionDuration}
      {...props}
    />
  );
};

export { Burger };
