import { ColorPicker, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type React from 'react';
import { neutral, white } from '../../../constants/colors';
import { fontBase, fontSize } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';

export type ColorPickerTriggerVariant =
  | 'fontColor'
  | 'fillColor'
  | 'borderColor'
  | 'shadowColor';

export interface ColorPickerTriggerProps {
  variant: ColorPickerTriggerVariant;
  /** Current color. `null` / `'transparent'` renders the transparency checker. */
  value: string | null;
  onChange: (color: string) => void;
  /** Optional curated color swatches shown under the picker. */
  swatches?: string[];
  /** Color format passed to Mantine's `ColorPicker`. Default `'hex'`. */
  format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
  /** Accessibility label. Default derives from `variant`. */
  ariaLabel?: string;
  /** Render the trigger on a dark surface. Default `false`. */
  dark?: boolean;
  /** Disable the trigger. */
  disabled?: boolean;
  /** Controlled open state. When provided, `onOpenChange` must also be supplied. */
  opened?: boolean;
  /** Fires when the open state should change (controlled mode). */
  onOpenChange?: (next: boolean) => void;
  /** Size of the swatch in px for `fillColor` variant. Default `16`. */
  swatchSize?: number;
}

const CHECKER_BG = `
  linear-gradient(45deg, ${neutral[100]} 25%, transparent 25%),
  linear-gradient(-45deg, ${neutral[100]} 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, ${neutral[100]} 75%),
  linear-gradient(-45deg, transparent 75%, ${neutral[100]} 75%)
`;

const isTransparent = (v: string | null) => {
  if (v == null || v === 'transparent') return true;
  const match = v.match(/^#([0-9a-f]{8}|[0-9a-f]{4})$/i);
  if (!match) return false;
  const alpha =
    match[1].length === 8 ? match[1].slice(6) : match[1].slice(3).repeat(2);
  return alpha.toLowerCase() === '00';
};

/**
 * Trigger + popover pair that opens a Mantine `ColorPicker`. Four visual
 * variants:
 *   - `fontColor`: stacked "A" with a colored underline bar (the bar reflects
 *      the current text color).
 *   - `borderColor`: hollow "A" whose stroke reflects the current text-border
 *      color, paired with a colored underline bar.
 *   - `shadowColor`: solid "A" with a soft drop shadow tinted by the current
 *      shadow color, paired with a colored underline bar.
 *   - `fillColor`: 16×16 swatch, with a checkerboard pattern when the fill is
 *      transparent / null.
 *
 * All variants drive the same popover — used in the slide-editor text
 * toolbar and reusable anywhere a color needs to be picked inline.
 */
export const ColorPickerTrigger = ({
  variant,
  value,
  onChange,
  swatches,
  format = 'hex',
  ariaLabel,
  dark = false,
  disabled = false,
  opened: openedProp,
  onOpenChange,
  swatchSize = 16,
}: ColorPickerTriggerProps) => {
  const [internalOpened, { toggle: toggleInternal, close: closeInternal }] =
    useDisclosure(false);
  const isControlled = openedProp !== undefined;
  const opened = isControlled ? openedProp : internalOpened;
  const toggle = () => {
    if (isControlled) onOpenChange?.(!opened);
    else toggleInternal();
  };
  const close = () => {
    if (isControlled) onOpenChange?.(false);
    else closeInternal();
  };
  const label =
    ariaLabel ??
    (variant === 'fontColor'
      ? 'Text color'
      : variant === 'borderColor'
        ? 'Text border color'
        : variant === 'shadowColor'
          ? 'Text shadow color'
          : 'Fill color');
  const transparent = isTransparent(value);

  const baseButton: React.CSSProperties = {
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    height: 28,
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
    padding: `0 ${spacing.xs}`,
  };

  const trigger =
    variant === 'fontColor' ? (
      <button
        aria-label={label}
        disabled={disabled}
        onClick={toggle}
        style={baseButton}
        type='button'
      >
        <span
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <span
            style={{
              ...fontBase,
              ...fontSize.md,
              color: dark ? white : neutral[300],
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            A
          </span>
          <span
            style={{
              backgroundColor: value ?? neutral[300],
              borderRadius: 1,
              height: 3,
              width: 14,
            }}
          />
        </span>
      </button>
    ) : variant === 'shadowColor' ? (
      <button
        aria-label={label}
        disabled={disabled}
        onClick={toggle}
        style={baseButton}
        type='button'
      >
        <span
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <span
            style={{
              ...fontBase,
              ...fontSize.md,
              color: dark ? white : neutral[300],
              fontWeight: 600,
              lineHeight: 1,
              // Soft drop shadow on the glyph telegraphs "shadow color".
              textShadow: `1px 1px 1px ${value ?? neutral[200]}`,
            }}
          >
            A
          </span>
          <span
            style={{
              backgroundColor: value ?? neutral[300],
              borderRadius: 1,
              height: 3,
              width: 14,
            }}
          />
        </span>
      </button>
    ) : variant === 'borderColor' ? (
      <button
        aria-label={label}
        disabled={disabled}
        onClick={toggle}
        style={baseButton}
        type='button'
      >
        <span
          style={{
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <span
            style={{
              ...fontBase,
              ...fontSize.md,
              // Hollow letter — fill is the surface color so only the
              // stroke is visible, mirroring the chosen border color.
              color: dark ? 'transparent' : white,
              fontWeight: 700,
              lineHeight: 1,
              WebkitTextStroke: `1px ${value ?? (dark ? white : neutral[300])}`,
            }}
          >
            A
          </span>
          <span
            style={{
              backgroundColor: value ?? neutral[300],
              borderRadius: 1,
              height: 3,
              width: 14,
            }}
          />
        </span>
      </button>
    ) : (
      <button
        aria-label={label}
        disabled={disabled}
        onClick={toggle}
        style={{ ...baseButton, padding: `0 ${spacing.xxs}` }}
        type='button'
      >
        <span
          style={{
            background: transparent ? CHECKER_BG : (value ?? white),
            backgroundPosition: transparent
              ? '0 0, 0 4px, 4px -4px, -4px 0'
              : undefined,
            backgroundSize: transparent ? '8px 8px' : undefined,
            border: `1px solid ${dark ? 'rgba(255,255,255,0.2)' : neutral[100]}`,
            borderRadius: 4,
            display: 'inline-block',
            height: swatchSize,
            width: swatchSize,
          }}
        />
      </button>
    );

  return (
    <Popover
      onClose={close}
      opened={opened}
      position='bottom'
      shadow='md'
      withinPortal
    >
      <Popover.Target>{trigger}</Popover.Target>
      <Popover.Dropdown p={spacing.sm}>
        <ColorPicker
          format={format}
          onChange={onChange}
          swatches={swatches}
          value={value ?? '#000000'}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
