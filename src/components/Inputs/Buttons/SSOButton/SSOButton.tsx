import React from 'react';
import { Button as MantineButton, ButtonProps as MantineButtonProps } from '@mantine/core';
import { fontBase, fontWeight } from '../../../../constants/font';
import { componentSizes } from '../Button/sizes';
import { componentVariants } from '../shared/variants';
import { GoogleIcon } from '../../../../assets/icons';

type OmittedProps = 'variant' | 'leftIcon' | 'rightIcon';

const providers = {
  google: { name: 'Google', icon: React.createElement(GoogleIcon, { size: 18 }) },
} as const;

export type SSOProvider = keyof typeof providers;

interface SSOButtonBase extends Omit<MantineButtonProps, OmittedProps> {
  onClick?: () => void;
  size?: keyof typeof componentSizes;
  fullWidth?: boolean;
}

type WithProvider = SSOButtonBase & {
  /** Shorthand — resolves the provider's name and icon automatically */
  provider: SSOProvider;
  /** Override the resolved provider name */
  providerName?: string;
  /** Override the resolved provider icon */
  providerIcon?: React.ReactNode;
};

type WithCustomProvider = SSOButtonBase & {
  provider?: never;
  /** Display name of the provider (e.g. "Google", "Apple") */
  providerName: string;
  /** Provider icon rendered to the left of the label */
  providerIcon: React.ReactNode;
};

export type SSOButtonProps = WithProvider | WithCustomProvider;

export const SSOButton = ({
  provider,
  providerName,
  providerIcon,
  onClick,
  size = 'md',
  fullWidth = false,
  styles,
  children,
  ...props
}: SSOButtonProps) => {
  const resolved = provider ? providers[provider] : undefined;
  const name = providerName ?? resolved?.name;
  const icon = providerIcon ?? resolved?.icon;

  const selectedVariant = componentVariants['secondary'];
  const selectedSize = componentSizes[size];

  const style = {
    root: {
      borderRadius: '8px',
      width: fullWidth ? '100%' : 'fit-content',
      height: `${selectedSize.height}rem`,
      padding: selectedSize.padding,
      minWidth: `${selectedSize.minWidth}rem`,
      fontSize: selectedSize.fontSize,
      transition: 'background 0.1s ease-in-out',
      ...selectedVariant,
    },
    label: {
      ...fontBase,
      fontWeight: fontWeight['semibold'],
    },
    leftIcon: {
      marginRight: '1rem',
    },
    ...styles,
  };

  return (
    <MantineButton
      styles={style}
      size={size}
      onClick={onClick}
      leftIcon={icon}
      {...props}
    >
      {children ?? (name ? `Continue with ${name}` : undefined)}
    </MantineButton>
  );
};
