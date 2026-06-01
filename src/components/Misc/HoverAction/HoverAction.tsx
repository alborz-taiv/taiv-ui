import { ReactNode, MouseEvent } from 'react';
import { ActionIcon, Box } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconX, IconTrash, IconPencil } from '@tabler/icons-react';
import { neutral, error, primary, white } from '../../../constants/colors';

const componentVariants = {
  close: {
    Icon: IconX,
    color: neutral[200],
    hoverColor: error[200],
  },
  trash: {
    Icon: IconTrash,
    color: neutral[200],
    hoverColor: error[200],
  },
  edit: {
    Icon: IconPencil,
    color: neutral[200],
    hoverColor: primary[200],
  },
} as const;

const componentSizes = {
  sm: { borderLength: 24, iconSize: 14 },
  md: { borderLength: 32, iconSize: 18 },
  lg: { borderLength: 44, iconSize: 24 },
  xl: { borderLength: 56, iconSize: 30 },
} as const;

export interface HoverActionProps {
  variant: keyof typeof componentVariants;
  onClick: () => void;
  children: ReactNode;
  showBackground?: boolean;
  offset?: number;
  visible?: boolean;
  iconSize?: number;
  size?: keyof typeof componentSizes;
  fullWidth?: boolean;
}

const HoverAction = ({
  variant,
  onClick,
  children,
  showBackground = false,
  offset = 10,
  visible,
  iconSize,
  size = 'md',
  fullWidth = false,
}: HoverActionProps) => {
  const { ref, hovered } = useHover<HTMLDivElement>();
  const { Icon, color, hoverColor } = componentVariants[variant];
  const selectedSize = componentSizes[size];
  const resolvedIconSize = iconSize ?? selectedSize.iconSize;
  const isVisible = visible !== undefined ? visible : hovered;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <Box ref={ref} sx={{ position: 'relative', width: fullWidth ? '100%' : 'fit-content' }}>
      {children}
      <ActionIcon
        onClick={handleClick}
        radius='xl'
        sx={{
          position: 'absolute',
          top: -offset,
          right: -offset,
          height: `${selectedSize.borderLength}px`,
          width: `${selectedSize.borderLength}px`,
          minHeight: `${selectedSize.borderLength}px`,
          minWidth: `${selectedSize.borderLength}px`,
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: 'opacity 0.15s ease-in-out, color 0.1s ease-in-out',
          backgroundColor: showBackground ? white : 'transparent',
          boxShadow: showBackground ? '0 2px 6px rgba(0, 0, 0, 0.12)' : 'none',
          color,
          '&:hover': {
            backgroundColor: white,
            color: hoverColor,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <Icon size={resolvedIconSize} />
      </ActionIcon>
    </Box>
  );
};

export { HoverAction };
