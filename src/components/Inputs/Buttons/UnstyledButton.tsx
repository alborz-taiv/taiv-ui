import React from 'react';
import {
  UnstyledButton as MantineUnstyledButton,
  UnstyledButtonProps as MantineUnstyledButtonProps,
} from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface UnstyledButtonProps extends MantineUnstyledButtonProps {
  styles?: Record<string, CSSObject>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UnstyledButton = ({ styles, onClick, ...props }: UnstyledButtonProps) => {
  return <MantineUnstyledButton styles={styles} onClick={onClick} {...props} />;
};

export { UnstyledButton };
