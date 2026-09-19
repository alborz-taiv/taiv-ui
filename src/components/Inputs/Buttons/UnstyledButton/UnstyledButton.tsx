import React, { forwardRef } from 'react';
import {
  UnstyledButton as MantineUnstyledButton,
  UnstyledButtonProps as MantineUnstyledButtonProps,
  createPolymorphicComponent,
} from '@mantine/core';
import { CSSObject } from '@mantine/styles';

interface UnstyledButtonProps extends MantineUnstyledButtonProps {
  styles?: Record<string, CSSObject>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const _UnstyledButton = forwardRef<HTMLButtonElement, UnstyledButtonProps>(
  ({ styles, onClick, ...props }, ref) => {
    return <MantineUnstyledButton ref={ref} styles={styles} onClick={onClick} {...props} />;
  },
);
_UnstyledButton.displayName = 'UnstyledButton';

const UnstyledButton = createPolymorphicComponent<'button', UnstyledButtonProps>(_UnstyledButton);

export { UnstyledButton };
