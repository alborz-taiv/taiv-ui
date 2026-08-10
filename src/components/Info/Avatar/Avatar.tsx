//TODO clean this file up
import {
  Avatar as MantineAvatar,
  type AvatarProps as MantineAvatarProps,
} from '@mantine/core';
import React from 'react';
import { primary, primitives, white } from '../../../constants/colors';

export type AvatarPrimitiveColor = keyof typeof primitives;

interface AvatarProps extends Omit<MantineAvatarProps, 'color'> {
  color?: AvatarPrimitiveColor;
}

// Default (no `color` prop) is a solid primary fill with white initials —
// higher contrast than the light-tint convention used for explicit colors.
const getPlaceholderColors = (primitiveColor: AvatarPrimitiveColor) =>
  primitiveColor === 'purple'
    ? { backgroundColor: primary[200], color: white }
    : { backgroundColor: primitives[primitiveColor][25], color: primitives[primitiveColor][200] };

const AvatarRoot = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ color: primitiveColor = 'purple', styles, ...props }, ref) => {
    const mergedStyles =
      primitiveColor && typeof styles !== 'function'
        ? {
            ...(styles ?? {}),
            placeholder: {
              ...(styles?.placeholder ?? {}),
              ...getPlaceholderColors(primitiveColor),
            },
          }
        : primitiveColor && typeof styles === 'function'
          ? (...args: Parameters<typeof styles>) => {
              const resolved = styles(...args);
              return {
                ...resolved,
                placeholder: {
                  ...resolved?.placeholder,
                  ...getPlaceholderColors(primitiveColor),
                },
              };
            }
          : styles;

    return <MantineAvatar ref={ref} styles={mergedStyles} {...props} />;
  },
);

AvatarRoot.displayName = 'Avatar';

const Avatar = Object.assign(AvatarRoot, {
  Group: MantineAvatar.Group,
}) as typeof MantineAvatar;

export { Avatar, type AvatarProps };
