//TODO clean this file up
import {
  Avatar as MantineAvatar,
  type AvatarProps as MantineAvatarProps,
} from '@mantine/core';
import React from 'react';
import { primitives } from '../../../constants/colors';

export type AvatarPrimitiveColor = keyof typeof primitives;

interface AvatarProps extends Omit<MantineAvatarProps, 'color'> {
  color?: AvatarPrimitiveColor;
}

const AvatarRoot = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ color: primitiveColor = 'purple', styles, ...props }, ref) => {
    const mergedStyles =
      primitiveColor && typeof styles !== 'function'
        ? {
            ...(styles ?? {}),
            placeholder: {
              ...(styles?.placeholder ?? {}),
              backgroundColor: primitives[primitiveColor][25],
              color: primitives[primitiveColor][200],
            },
          }
        : primitiveColor && typeof styles === 'function'
          ? (...args: Parameters<typeof styles>) => {
              const resolved = styles(...args);
              return {
                ...resolved,
                placeholder: {
                  ...resolved?.placeholder,
                  backgroundColor: primitives[primitiveColor][25],
                  color: primitives[primitiveColor][200],
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
