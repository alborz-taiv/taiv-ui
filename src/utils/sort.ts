/**
 * Generic sort primitives for driving `<SortSelect />` options across consumer
 * projects. Consumers can mix these with custom-value options by spreading
 * `GENERIC_SORT_OPTIONS` and adding their own entries.
 */

export type SortDirection = 'asc' | 'desc';

export interface SortOption<V extends string = string> {
  label: string;
  value: V;
}

export const GENERIC_SORT_VALUES = [
  'newest',
  'oldest',
  'name-asc',
  'name-desc',
  'updated-desc',
  'updated-asc',
] as const;

export type GenericSortValue = (typeof GENERIC_SORT_VALUES)[number];

export const GENERIC_SORT_OPTIONS: SortOption<GenericSortValue>[] = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
  { label: 'Name A → Z', value: 'name-asc' },
  { label: 'Name Z → A', value: 'name-desc' },
  { label: 'Recently updated', value: 'updated-desc' },
  { label: 'Least recently updated', value: 'updated-asc' },
];

export interface SortableByName {
  name?: string | null;
  title?: string | null;
  /** Fallback used by Select-style options that key the displayed string as `label`. */
  label?: string | null;
}

export interface SortableByDate {
  createdAt?: string | number | Date | null;
  updatedAt?: string | number | Date | null;
}

const toTime = (v: string | number | Date | null | undefined) =>
  v == null ? 0 : new Date(v).getTime();

const cmpString = (
  a: string | null | undefined,
  b: string | null | undefined,
) => (a ?? '').localeCompare(b ?? '', undefined, { sensitivity: 'base' });

/**
 * Comparator for the built-in `GenericSortValue` set. Returns `null` for
 * values outside the set so consumers can fall back to their own comparator.
 *
 * @example
 * items.sort(compareByGenericSort(sortValue) ?? customComparator);
 */
export const compareByGenericSort = <T extends SortableByName & SortableByDate>(
  value: GenericSortValue,
): ((a: T, b: T) => number) => {
  switch (value) {
    case 'newest':
      return (a, b) => toTime(b.createdAt) - toTime(a.createdAt);
    case 'oldest':
      return (a, b) => toTime(a.createdAt) - toTime(b.createdAt);
    case 'name-asc':
      return (a, b) =>
        cmpString(a.name ?? a.title ?? a.label, b.name ?? b.title ?? b.label);
    case 'name-desc':
      return (a, b) =>
        cmpString(b.name ?? b.title ?? b.label, a.name ?? a.title ?? a.label);
    case 'updated-desc':
      return (a, b) => toTime(b.updatedAt) - toTime(a.updatedAt);
    case 'updated-asc':
      return (a, b) => toTime(a.updatedAt) - toTime(b.updatedAt);
  }
};
