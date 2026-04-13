import React from 'react';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { neutral } from '../../../constants/colors';
import { Box } from '../../Layout/Box/Box';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../Text/Text';
import { Title } from '../Title/Title';
import { Transition } from '../../Misc/Transition/Transition';
import { UnstyledButton } from '../../Inputs/Buttons/UnstyledButton/UnstyledButton';

interface CollapsibleTitleProps {
  title: string;
  subText: string;
  className?: string;
  opened: boolean;
  setOpened: (opened: boolean) => void;
  children?: React.ReactNode;
}

const CollapsibleTitle = ({ title, subText, className, opened, setOpened, children }: CollapsibleTitleProps) => {
  return (
    <>
      <UnstyledButton className={className} onClick={() => setOpened(!opened)}>
        <Stack gap="2px">
          <Group gap="4px" align="center">
            <Title variant="sectionSubheader" size="md" weight="medium">
              {title}
            </Title>
            <IconCaretDownFilled
              size={18}
              style={{
                color: neutral[200],
                transform: opened ? 'rotate(180deg)' : 'none',
                transition: 'transform 200ms ease',
              }}
            />
          </Group>
          <Text variant="caption">
            {subText}
          </Text>
        </Stack>
      </UnstyledButton>
      <Transition mounted={opened} transition="scale-y" duration={300}>
        {(styles) => <Box style={{ overflow: 'hidden' }}>{children}</Box>}
      </Transition>
    </>
  );
};

export { CollapsibleTitle };
