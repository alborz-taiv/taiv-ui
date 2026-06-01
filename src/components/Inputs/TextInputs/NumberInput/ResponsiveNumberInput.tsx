import { IconMinus, IconPlus } from '@tabler/icons-react';
import { neutral, red } from '../../../../constants/colors';
import { fontBase } from '../../../../constants/font';
import { spacing } from '../../../../constants/spacing';
import { useMobile } from '../../../../hooks/useMediaQuery';
import { IconButton } from '../../Buttons/IconButton/IconButton';
import { Group } from '../../../Layout/Group/Group';
import { Text } from '../../../Typography/Text/Text';
import { NumberInput } from './NumberInput';
import { componentSizes } from '../shared/sizes';

export interface ResponsiveNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Suffix rendered after the value in the mobile stepper (e.g. `s`, `px`).
   *  Desktop ignores this — the NumberInput shows the bare number. */
  unit?: string;
  /** Forwarded to the desktop `NumberInput` label. On mobile the stepper is
   *  control-only; render your own label in the surrounding layout. */
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: keyof typeof componentSizes;
  /** Accessible name for the mobile value readout / stepper buttons. */
  'aria-label'?: string;
  /**
   * Override the internal `useMobile()` (<640px) viewport check. Pass this
   * when the host surface uses a different breakpoint than the component's
   * default — e.g. an editor that already switches to a touch layout at
   * `useTablet()` (<768px) wants the stepper across that whole range, not
   * just below 640px. Omit to let the component decide by viewport.
   */
  isMobile?: boolean;
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

/**
 * Numeric input that swaps presentation by viewport:
 *
 * - **Desktop / laptop** → the standard `NumberInput` (typed entry plus the
 *   stacked spinner controls on the right edge).
 * - **Mobile** → a touch stepper: a read-only value pill on the left with
 *   `[−]` / `[+]` buttons grouped to its right. The value is *display-only*
 *   (not a native `<input type=number>`) on purpose — focusing one on iOS
 *   pops the on-screen numeric keyboard, which on canvas-style editors
 *   covers content and can steal focus. The buttons are full-size tap
 *   targets, unlike the desktop spinner chevrons.
 *
 * Same `value` / `onChange` / `min` / `max` / `step` contract on both, so a
 * caller can drop it in wherever a `NumberInput` lived and get the
 * responsive treatment for free.
 */
export const ResponsiveNumberInput: React.FC<ResponsiveNumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit,
  label,
  error,
  disabled = false,
  fullWidth = false,
  size = 'md',
  'aria-label': ariaLabel,
  isMobile: isMobileProp,
}) => {
  // Always call the hook (rules-of-hooks), but let an explicit prop win so
  // callers can align the switch with their own breakpoint.
  const detectedMobile = useMobile();
  const isMobile = isMobileProp ?? detectedMobile;

  if (!isMobile) {
    return (
      <NumberInput
        label={label}
        error={error}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        aria-label={ariaLabel}
        onChange={(v) => {
          const n = Number(v);
          if (!Number.isFinite(n)) return;
          onChange(n);
        }}
      />
    );
  }

  const handleStep = (dir: 1 | -1) =>
    onChange(clamp(value + dir * step, min, max));

  const display = `${value}${unit ? ` ${unit}` : ''}`;

  // Flanking layout: `[−] value [+]`, matching the app's other steppers
  // (font size, canvas zoom). When `fullWidth`, the group spans its row and
  // the value pill flexes to fill the space between the buttons; otherwise
  // it's a compact, content-width stepper.
  return (
    <Group
      spacing={spacing.xs}
      noWrap
      style={fullWidth ? { width: '100%' } : undefined}
    >
      <IconButton
        variant='secondary'
        subtle
        aria-label={`Decrease${ariaLabel ? ` ${ariaLabel}` : ''}`}
        onClick={() => handleStep(-1)}
        disabled={disabled || value <= min}
      >
        <IconMinus size={14} />
      </IconButton>
      <div
        role='status'
        aria-label={ariaLabel}
        style={{
          alignItems: 'center',
          border: `1px solid ${error ? red[200] : neutral[50]}`,
          borderRadius: 8,
          display: 'flex',
          flex: fullWidth ? 1 : undefined,
          height: 40,
          justifyContent: 'center',
          minWidth: 64,
          padding: `0 ${spacing.sm}`,
          ...fontBase,
          color: neutral[200],
        }}
      >
        <Text variant='body'>{display}</Text>
      </div>
      <IconButton
        variant='secondary'
        subtle
        aria-label={`Increase${ariaLabel ? ` ${ariaLabel}` : ''}`}
        onClick={() => handleStep(1)}
        disabled={disabled || value >= max}
      >
        <IconPlus size={14} />
      </IconButton>
    </Group>
  );
};
