/**
 * Reusable sort helpers. Two layers:
 *
 *   1. Convenience verbs (`sortByName`, `sortByCreated`, `sortByUpdated`) for the
 *      shared fields most domain objects carry. Callsites pass a list + direction
 *      and never write a comparator: `sortByUpdated(slides, 'desc')`.
 *
 *   2. Comparator primitives (`byString`, `byNumber`, `byDate`) + a non-mutating
 *      `sortBy(items, ...comparators)` for fields the verbs don't cover (e.g.
 *      `byNumber(p => p.slides.length)`) or multi-key sorts with tiebreakers.
 *
 * All comparators centralize the fiddly bits once: nullish coalescing, a pinned
 * `'en'` locale for stable string ordering across browsers/OSes, and Date
 * parsing with a NaN guard (unparseable / missing dates sort as epoch 0).
 */

export type SortDirection = 'asc' | 'desc';

type DateLike = string | number | Date | null | undefined;

const dirSign = (dir: SortDirection): 1 | -1 => (dir === 'desc' ? -1 : 1);

const toTime = (v: DateLike): number => {
  if (v == null) return 0;
  const t = v instanceof Date ? v.getTime() : new Date(v).getTime();
  return Number.isFinite(t) ? t : 0;
};

// Case-insensitive, locale-stable. Pinned to 'en' rather than the runtime
// default so ordering is identical across browsers/OSes (Turkish-i, German-ß,
// etc. otherwise diverge).
const compareStrings = (
  a: string | null | undefined,
  b: string | null | undefined,
): number => (a ?? '').localeCompare(b ?? '', 'en', { sensitivity: 'base' });

// ── Comparator primitives ──────────────────────────────────────────────────
// Each takes an accessor + direction and returns a comparator. Compose them
// with `sortBy` for custom fields, multi-key sorts, or tiebreakers.

export const byString =
  <T>(get: (item: T) => string | null | undefined, dir: SortDirection = 'asc') =>
  (a: T, b: T): number =>
    dirSign(dir) * compareStrings(get(a), get(b));

export const byNumber =
  <T>(get: (item: T) => number | null | undefined, dir: SortDirection = 'asc') =>
  (a: T, b: T): number =>
    dirSign(dir) * ((get(a) ?? 0) - (get(b) ?? 0));

export const byDate =
  <T>(get: (item: T) => DateLike, dir: SortDirection = 'asc') =>
  (a: T, b: T): number =>
    dirSign(dir) * (toTime(get(a)) - toTime(get(b)));

// ── Non-mutating, multi-key sort ─────────────────────────────────────────────
// Returns a new array. Comparators are applied in order; the first non-zero
// result wins, so trailing comparators act as tiebreakers:
//   sortBy(users, byBoolean(u => u.isSelf, 'desc'), byString(u => u.name))
export const sortBy = <T>(
  items: readonly T[],
  ...comparators: Array<(a: T, b: T) => number>
): T[] =>
  [...items].sort((a, b) => {
    for (const cmp of comparators) {
      const result = cmp(a, b);
      if (result !== 0) return result;
    }
    return 0;
  });

// ── Convenience verbs for common shared fields ───────────────────────────────

/** Sort by display name. Resolves `name → title → label` so it covers both
 *  domain objects and `Select`-style `{ value, label }` options. */
export const sortByName = <
  T extends {
    name?: string | null;
    title?: string | null;
    label?: string | null;
  },
>(
  items: readonly T[],
  dir: SortDirection = 'asc',
): T[] => sortBy(items, byString((i) => i.name ?? i.title ?? i.label, dir));

/** Sort by creation time. Resolves `created → createdAt`. */
export const sortByCreated = <
  T extends { created?: DateLike; createdAt?: DateLike },
>(
  items: readonly T[],
  dir: SortDirection = 'asc',
): T[] => sortBy(items, byDate((i) => i.created ?? i.createdAt, dir));

/** Sort by last-updated time. Resolves `edited → updated → updatedAt`, falling
 *  back to `created → createdAt` so never-edited items still sort sensibly. */
export const sortByUpdated = <
  T extends {
    edited?: DateLike;
    updated?: DateLike;
    updatedAt?: DateLike;
    created?: DateLike;
    createdAt?: DateLike;
  },
>(
  items: readonly T[],
  dir: SortDirection = 'asc',
): T[] =>
  sortBy(
    items,
    byDate(
      (i) => i.edited ?? i.updated ?? i.updatedAt ?? i.created ?? i.createdAt,
      dir,
    ),
  );
