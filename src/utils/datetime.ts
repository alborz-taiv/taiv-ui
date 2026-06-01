/**
 * Compact "time-since" string with minute/hour granularity. Past-only —
 * use this for "edited 5m ago", "uploaded 12h ago" style metadata where
 * the value will never be in the future. Near-now and slightly-future
 * inputs (clock skew) collapse to 'just now'.
 *
 * @param input     The timestamp to describe.
 * @param reference The "now" to measure against. Defaults to the current
 *                  time; pass an explicit value to make output deterministic
 *                  in tests.
 *
 * @example
 *   formatRelativeTime(thirtySecondsAgo) // 'just now'
 *   formatRelativeTime(twelveHoursAgo)   // '12h ago'
 *   formatRelativeTime(threeWeeksAgo)    // '3w ago'
 */
export const formatRelativeTime = (
  input: string | number | Date,
  reference: string | number | Date = new Date(),
): string => {
  const targetMs =
    input instanceof Date ? input.getTime() : new Date(input).getTime();
  const refMs =
    reference instanceof Date ? reference.getTime() : new Date(reference).getTime();
  if (Number.isNaN(targetMs) || Number.isNaN(refMs)) return '';
  const diffSeconds = Math.floor((refMs - targetMs) / 1000);

  if (diffSeconds < 60) return 'just now';
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};
