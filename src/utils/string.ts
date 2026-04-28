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
