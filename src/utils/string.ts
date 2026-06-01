/**
 * Returns the singular form when `count` is 1, otherwise the plural.
 * If no explicit plural is provided, appends `s` to the singular.
 *
 * @example
 *   pluralize('item', 1)             // 'item'
 *   pluralize('item', 3)             // 'items'
 *   pluralize('child', 2, 'children') // 'children'
 */
export const pluralize = (
  word: string,
  count: number,
  plural?: string,
): string => {
  if (count === 1) return word;
  return plural ?? `${word}s`;
};

/**
 * Like {@link pluralize}, but prefixes the count — the common "{n} things"
 * phrasing. Forwards the optional custom plural.
 *
 * @example
 *   quantify('item', 1)                          // '1 item'
 *   quantify('item', 3)                          // '3 items'
 *   quantify('item', 0)                          // '0 items'
 *   quantify('subcategory', 2, 'subcategories')  // '2 subcategories'
 */
export const quantify = (
  word: string,
  count: number,
  plural?: string,
): string => `${count} ${pluralize(word, count, plural)}`;
