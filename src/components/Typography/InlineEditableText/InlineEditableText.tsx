import { IconPencil } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { neutral, primary, white } from '../../../constants/colors';
import { fontStyle } from '../../../constants/font';
import { spacing } from '../../../constants/spacing';
import { IconButton } from '../../Inputs/Buttons/IconButton/IconButton';

// `fontStyle` combines `titleStyle` (header / sectionHeader / subheader / …)
// with `textStyle` (body / subtle / label / caption), so consumers can use
// this component for both prominent page-title rename affordances AND for
// compact toolbar / list-row inline edits — same state machine, different
// typography.
export type InlineEditableTextVariant = keyof typeof fontStyle;
export type InlineEditableTextColorScheme = 'light' | 'dark';

export interface InlineEditableTextProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  maxLength?: number;
  /** Typography variant used for the display form. Default `'sectionHeader'`. */
  variant?: InlineEditableTextVariant;
  /** Accessibility label on the edit button + input. Default `'Edit name'`. */
  ariaLabel?: string;
  /** Hide the pencil button — clicking the text itself still enters edit mode. */
  hidePencil?: boolean;
  /**
   * Cap the rendered width in px. Without this the component takes up to
   * `maxWidth: 100%` of its parent, which is undesirable inside a flex
   * toolbar that has other right-aligned actions. Set this when you need the
   * idle text to ellipsize at a specific width while leaving siblings room.
   */
  maxWidth?: number;
  /** Fired when the edit is committed (Enter or blur with a changed value). */
  onCommit?: (next: string) => void;
  /** Fired when the edit is cancelled (Escape). */
  onCancel?: () => void;
  /** Chrome color scheme. `'dark'` renders white text on translucent chrome. */
  colorScheme?: InlineEditableTextColorScheme;
}

/**
 * Heading-styled text that becomes an inline input on click or pencil press.
 * Commits on Enter and on blur; Escape cancels. Consumers own the persisted
 * state via `value` / `onChange`; `onCommit` fires only on successful commit.
 */
export const InlineEditableText = ({
  value,
  onChange,
  placeholder = 'Untitled',
  maxLength,
  variant = 'sectionHeader',
  ariaLabel = 'Edit name',
  hidePencil = false,
  maxWidth,
  onCommit,
  onCancel,
  colorScheme = 'light',
}: InlineEditableTextProps) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const typo = fontStyle[variant];
  const isDark = colorScheme === 'dark';
  const displayColor = isDark ? white : typo.color;
  const placeholderColor = isDark ? 'rgba(255, 255, 255, 0.5)' : neutral[200];
  const iconColor = isDark ? 'rgba(255, 255, 255, 0.7)' : neutral[200];
  const editingBorder = primary[200];
  const inputBackground = isDark ? 'rgba(255, 255, 255, 0.1)' : 'transparent';

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const enterEdit = () => {
    setDraft(value);
    // `flushSync` forces React to render the input synchronously so it's in
    // the DOM before this function returns — letting us call focus/select
    // INSIDE the original click handler. Critical on iOS Safari, which only
    // honors programmatic `input.focus()` (and opens the on-screen keyboard)
    // when the call is inside an active user-gesture window. The previous
    // `requestAnimationFrame` deferral fired ~16ms later, outside the window,
    // so the keyboard never appeared and the user had to tap multiple times.
    flushSync(() => setEditing(true));
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    // `el.select()` is unreliable on iOS Safari — it focuses but doesn't
    // actually highlight the text. `setSelectionRange` is the supported
    // equivalent on every browser.
    el.setSelectionRange(0, el.value.length);
  };

  const commit = () => {
    const next = draft.trim();
    setEditing(false);
    if (next !== value) {
      onChange(next);
      onCommit?.(next);
    }
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
    onCancel?.();
  };

  if (editing) {
    return (
      <input
        aria-label={ariaLabel}
        maxLength={maxLength}
        onBlur={commit}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            commit();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            cancel();
          }
        }}
        placeholder={placeholder}
        ref={inputRef}
        style={{
          ...typo,
          background: inputBackground,
          border: `1px solid ${editingBorder}`,
          borderRadius: 6,
          color: displayColor,
          margin: 0,
          maxWidth: maxWidth ? `${maxWidth}px` : undefined,
          outline: 'none',
          padding: `2px ${spacing.xs}`,
          width: maxWidth ? `${maxWidth}px` : '100%',
        }}
        type='text'
        value={draft}
      />
    );
  }

  const display = value.trim() === '' ? placeholder : value;
  const isPlaceholder = value.trim() === '';

  return (
    <span
      style={{
        alignItems: 'center',
        display: 'inline-flex',
        gap: spacing.md,
        maxWidth: maxWidth ? `${maxWidth}px` : '100%',
        minWidth: 0,
      }}
    >
      <button
        aria-label={ariaLabel}
        onClick={enterEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            enterEdit();
          }
        }}
        style={{
          ...typo,
          background: 'transparent',
          border: '1px solid transparent',
          borderRadius: 6,
          color: isPlaceholder ? placeholderColor : displayColor,
          cursor: 'text',
          margin: 0,
          overflow: 'hidden',
          padding: `2px ${spacing.xs}`,
          textAlign: 'left',
          textOverflow: 'ellipsis',
          transition: 'border-color 120ms ease',
          whiteSpace: 'nowrap',
        }}
        type='button'
      >
        {display}
      </button>
      {hidePencil ? null : (
        <IconButton aria-label={`Edit ${ariaLabel}`} onClick={enterEdit} subtle>
          <IconPencil size={20} />
        </IconButton>
      )}
    </span>
  );
};
