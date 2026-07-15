import type { TextInputProps } from '@mantine/core';
import { useHotkeys, useId } from '@mantine/hooks';
import type React from 'react';
import { neutral, red } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { useIsMac, useTablet, useTouchDevice } from '../../../../hooks';
import { Text } from '../../../Typography/Text/Text';
import { componentSizes } from '../shared/sizes';
import { TextInput } from '../TextInput/TextInput';

interface SearchBarProps extends TextInputProps {
  fullWidth?: boolean;
  useHotkey?: boolean;
}

const SearchBar = ({
  width,
  fullWidth = false,
  size = 'md',
  styles,
  useHotkey = false,
  id,
  onKeyDown,
  value,
  ...props
}: SearchBarProps) => {
  const selectedSize = componentSizes[(size as 'sm' | 'md' | 'lg') || 'md'];
  const computedWidth = fullWidth ? '100%' : width || `${selectedSize.width}px`;
  const inputId = useId(id);
  const isTablet = useTablet();
  const isTouchDevice = useTouchDevice();
  const isMobile = isTablet || isTouchDevice;
  const isMac = useIsMac();
  const hotkeyEnabled = useHotkey && !isMobile;
  const hasValue = Boolean(value);

  useHotkeys(
    hotkeyEnabled
      ? [
          [
            'mod+K',
            (event) => {
              event.preventDefault();
              const el = document.getElementById(
                inputId,
              ) as HTMLInputElement | null;
              el?.focus();
              el?.select();
            },
          ],
        ]
      : [],
    [],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (hotkeyEnabled && event.key === 'Escape') event.currentTarget.blur();
    onKeyDown?.(event);
  };

  const style = {
    input: {
      ...fontBase,
      '&[data-invalid]': {
        '&::placeholder': {
          color: red[200],
        },
        borderColor: red[200],
        color: neutral[200],
      },
      border: `1px solid ${neutral[100]}`,
      borderRadius: '8px',
      color: neutral[200],
      fontSize: selectedSize.fontSize,
      height: `${selectedSize.height}px`,
      transition: 'all 200ms ease-in-out',
    },
    ...(hotkeyEnabled
      ? { rightSection: { justifyContent: 'flex-end', paddingRight: spacing.md } }
      : {}),
    ...styles,
  };

  const hotkeyHint = hotkeyEnabled && !hasValue ? (
    <Text
      span
      variant='label'
      color='#adb5bd'
      sx={{
        alignItems: 'center',
        display: 'inline-flex',
        letterSpacing: 0.5,
        lineHeight: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {isMac ? '⌘+K' : 'Ctrl+K'}
    </Text>
  ) : undefined;

  return (
    <TextInput
      fullWidth={fullWidth}
      icon={
        <i
          className='fas fa-search'
          style={{ fontSize: 14, marginLeft: spacing.xxs }}
        />
      }
      id={inputId}
      onKeyDown={handleKeyDown}
      placeholder='Search'
      rightSection={hotkeyHint}
      rightSectionWidth={hotkeyEnabled ? (isMac ? 50 : 66) : undefined}
      size={'lg'}
      styles={style}
      value={value}
      width={computedWidth}
      {...props}
    />
  );
};

export { SearchBar };
