import React from 'react';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { primary } from '../../../constants/colors';
import { Box } from '../../Layout/Box/Box';
import { Group } from '../../Layout/Group/Group';
import { Text } from '../Text/Text';
import { Transition } from '../../Misc/Transition/Transition';
import { UnstyledButton } from '../../Inputs/Buttons/UnstyledButton/UnstyledButton';
import { textStyle } from '../../../constants/font';

interface CollapsibleTextProps {
  text: string;
  variant?: keyof typeof textStyle;
  className?: string;
  styles?: React.CSSProperties;
  opened: boolean;
  setOpened: (opened: boolean) => void;
  children?: React.ReactNode;
}

const CollapsibleText = ({ text, variant = 'body', className, opened, setOpened, children }: CollapsibleTextProps) => {
  return (
    <>
      <UnstyledButton className={className} onClick={() => setOpened(!opened)}>
        <Group gap="0.4rem" align="center">
          <Text variant={variant} color={primary[200]}>
            {text}
          </Text>
          <IconCaretDownFilled
            size={18}
            style={{
              color: primary[200],
              transform: opened ? 'rotate(180deg)' : 'none',
              transition: 'transform 200ms ease',
            }}
          />
        </Group>
      </UnstyledButton>
      <Transition mounted={opened} transition="scale-y" duration={300}>
        {(styles) => <Box style={{ overflow: 'hidden' }}>{children}</Box>}
      </Transition>
    </>
  );
};

export { CollapsibleText };
