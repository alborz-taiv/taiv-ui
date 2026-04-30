/**
 * iOS Safari auto-zooms when a focused form input has font-size < 16px. The
 * zoom doesn't reset on blur, so users on iPhone end up needing to manually
 * pinch out after every input interaction. This is a documented quirk that
 * any site with smaller-than-default input typography hits.
 *
 * `inputFontSize` in `constants/font.ts` ships values of 11.5/13.5/15px for
 * design-density reasons — every consuming app inherits the iOS zoom unless
 * we counteract it.
 *
 * This module injects a single mobile-only stylesheet that bumps any Mantine
 * input class to 16px below 768px, sidestepping the zoom trigger. The bump
 * applies to the rendered output only — JS APIs and the documented `size`
 * prop are unchanged. Desktop typography is untouched. To revert app-wide,
 * delete this file and the `import` line from `src/index.ts`.
 *
 * Why `!important`: Taiv UI inputs render through Mantine's emotion-styled
 * inline blocks (e.g. `.mantine-1abc234 input`), which carry higher CSS
 * specificity than a plain class selector. `!important` is the smallest
 * override; the alternative is duplicating each emotion class to inflate
 * specificity, which is fragile across Mantine upgrades.
 */

const STYLE_ID = 'taiv-ui-mobile-input-zoom-fix';

const injectMobileInputZoomFix = (): void => {
  // No-op on the server — Mantine itself only mounts inputs in the DOM, so
  // this rule is only meaningful client-side.
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @media (max-width: 768px) {
      .mantine-TextInput-input,
      .mantine-PasswordInput-input,
      .mantine-NumberInput-input,
      .mantine-Textarea-input,
      .mantine-Select-input,
      .mantine-MultiSelect-input,
      .mantine-Autocomplete-input,
      .mantine-DatePickerInput-input,
      .mantine-DateTimePicker-input,
      .mantine-TagsInput-input,
      .mantine-PinInput-input,
      .mantine-NativeSelect-input {
        font-size: 16px !important;
      }
    }
  `;
  document.head.appendChild(style);
};

injectMobileInputZoomFix();
