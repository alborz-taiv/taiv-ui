/**
 * iOS Safari auto-zooms when a focused form input has font-size < 16px AND
 * the page's viewport allows zoom (`maximum-scale > 1`). Both conditions
 * must hold; iOS evaluates them at focus time. We sidestep the zoom by
 * temporarily setting `maximum-scale=1` on the viewport meta while the
 * user is interacting with a text input, then restoring whatever was
 * there before. The page's normal pinch-to-zoom remains available
 * everywhere else.
 *
 * Why this over the previous `mobileInputZoomFix.ts` (CSS bump to 16px):
 * preserves the toolkit's input typography exactly. No visual change at
 * any breakpoint.
 *
 * **Why `pointerdown` and not `focusin`:** iOS commits the auto-zoom
 * decision when focus is committed to the element, which happens BEFORE
 * the DOM `focusin` event fires in our listener. Setting the viewport
 * inside `focusin` is too late — iOS has already evaluated and queued
 * the zoom animation. Listening on `pointerdown` (capture phase) lets
 * us write the new viewport meta before the browser commits focus.
 * `pointerdown` covers both touch and mouse uniformly.
 *
 * Composability with other viewport tweaks (e.g. `useEditorViewport` on
 * the slide editor route): we capture the viewport content at lock time,
 * not at module load. So whatever state the page is in when the user
 * taps an input — default, slide-editor-locked, future overrides — is
 * what we restore on blur. Setup-time capture would have stale state and
 * clobber other modules that lock the viewport for their own reasons.
 *
 * If we ever need to revert: change the import in `src/components/index.ts`
 * back to `../styles/mobileInputZoomFix` (Option A — the CSS-bump variant
 * is still in the repo).
 */

const VIEWPORT_FOCUSED =
  'width=device-width, initial-scale=1, maximum-scale=1';

const setupIosInputZoomFix = (): void => {
  // No-op on the server.
  if (typeof document === 'undefined') return;

  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="viewport"]',
  );
  if (!meta) return;

  // Idempotency: a flag on the meta so HMR / multiple imports don't stack
  // listeners. Using a DOM marker rather than a module-scoped boolean
  // because side-effect imports can be re-evaluated by some bundler
  // configurations during dev.
  const ATTACHED = 'data-taiv-ios-zoom-fix';
  if (meta.getAttribute(ATTACHED) === 'true') return;
  meta.setAttribute(ATTACHED, 'true');

  // Per-focus snapshot. Captured on focusin, restored on focusout. Stored
  // outside the listeners so paired events share state. `null` when no
  // text input is currently focused.
  let snapshot: string | null = null;

  const isTextEntry = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
    if (tag !== 'INPUT') return false;
    // Excludes button-like input types that don't trigger iOS's auto-zoom
    // (checkbox, radio, file, button, submit, etc.).
    const type = (target as HTMLInputElement).type;
    return (
      type !== 'checkbox' &&
      type !== 'radio' &&
      type !== 'button' &&
      type !== 'submit' &&
      type !== 'reset' &&
      type !== 'file' &&
      type !== 'image' &&
      type !== 'hidden' &&
      type !== 'range' &&
      type !== 'color'
    );
  };

  // `pointerdown` fires before the browser commits focus, so the viewport
  // meta is in place by the time iOS evaluates whether to auto-zoom.
  // Capture phase ensures we run before any consumer's pointerdown handlers
  // that might call `stopPropagation()`. `passive: true` keeps scrolling
  // smooth — we only read `target` and write the meta, never preventDefault.
  //
  // Resolving the input from `e.target` is two-step:
  //   1. `closest('input, textarea, select')` walks up to the nearest
  //      input ancestor — handles direct taps on the input itself.
  //   2. If no ancestor input, walk up to a Mantine input wrapper and
  //      look INSIDE for the input. Mantine renders trigger affordances
  //      (chevron, clear button, search icon) as siblings of the input
  //      under a shared wrapper; tapping those would otherwise miss the
  //      lock because the input is a sibling, not an ancestor. This case
  //      matters most for `<Select>` — the chevron and the input both
  //      live under `.mantine-Input-wrapper`, and the chevron tap is
  //      what programmatically focuses the input → iOS zooms without
  //      our lock unless we catch the wrapper-level tap.
  document.addEventListener(
    'pointerdown',
    (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      let field: Element | null = target.closest('input, textarea, select');
      if (!field) {
        const wrapper = target.closest(
          '.mantine-Input-wrapper, .mantine-InputWrapper-root',
        );
        if (wrapper) {
          field = wrapper.querySelector('input, textarea, select');
        }
      }
      if (!isTextEntry(field)) return;
      // Only snapshot if we don't already have one — avoids overwriting on
      // rapid pointerdown sequences (e.g. tap-and-drag) before focusout
      // has a chance to clean up.
      if (snapshot === null) {
        snapshot = meta.getAttribute('content');
      }
      meta.setAttribute('content', VIEWPORT_FOCUSED);
    },
    { capture: true, passive: true },
  );

  // Restore on blur. focusout bubbles, focus does not — using focusout
  // means a single document-level listener catches every input.
  document.addEventListener('focusout', (e) => {
    if (!isTextEntry(e.target)) return;
    if (snapshot !== null) {
      meta.setAttribute('content', snapshot);
      snapshot = null;
    }
  });
};

setupIosInputZoomFix();
