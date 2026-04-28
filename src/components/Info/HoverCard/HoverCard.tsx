import { HoverCard as MantineHoverCard, HoverCardProps as MantineHoverCardProps } from '@mantine/core';
import { CSSObject } from '@mantine/styles';
import { neutral } from '../../../constants/colors';
import { fontBase } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export interface HoverCardProps extends MantineHoverCardProps {
  styles?: { dropdown?: CSSObject; arrow?: CSSObject };
}

const HoverCard = ({
  openDelay = 80,
  closeDelay = 120,
  position = 'bottom',
  withArrow = false,
  styles,
  children,
  ...props
}: HoverCardProps) => {
  const mergedStyles = {
    dropdown: {
      borderRadius: 8,
      border: `1px solid ${neutral[50]}`,
      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
      padding: spacing.md,
      ...fontBase,
      ...styles?.dropdown,
    },
    arrow: { ...styles?.arrow },
  };

  return (
    <MantineHoverCard
      closeDelay={closeDelay}
      openDelay={openDelay}
      position={position}
      styles={mergedStyles}
      transitionProps={{ duration: 180, transition: 'pop' }}
      withArrow={withArrow}
      withinPortal
      {...props}
    >
      {children}
    </MantineHoverCard>
  );
};

HoverCard.Target = MantineHoverCard.Target;
HoverCard.Dropdown = MantineHoverCard.Dropdown;

export { HoverCard };
