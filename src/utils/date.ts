/**
 * Human-friendly relative-date string for a calendar offset from now.
 * Day-grain, two-direction (past + future), with named labels for the
 * 0 / ±1 day cases.
 *
 * Use for event countdowns and schedule ETAs where calendar-day resolution
 * is what users care about. For "edited 12h ago" style metadata where you
 * want minute/hour resolution and only support past timestamps, use
 * `formatRelativeTime` instead.
 *
 * @example
 *   formatRelativeDate(tomorrow)        // 'tomorrow'
 *   formatRelativeDate(in3Days)         // 'in 3 days'
 *   formatRelativeDate(twoWeeksAgo)     // '2 weeks ago'
 */
export const formatRelativeDate = (
  target: Date | string | number,
  reference: Date | number = new Date(),
): string => {
  const targetMs = target instanceof Date ? target.getTime() : new Date(target).getTime();
  const refMs = reference instanceof Date ? reference.getTime() : reference;
  if (Number.isNaN(targetMs) || Number.isNaN(refMs)) return '';

  // Compare calendar-day boundaries so "11pm tomorrow" reads as "tomorrow"
  // rather than "in 23 hours".
  const startOfDay = (ms: number) => {
    const d = new Date(ms);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  const dayDiff = Math.round(
    (startOfDay(targetMs) - startOfDay(refMs)) / 86_400_000,
  );

  if (dayDiff === 0) return 'today';
  if (dayDiff === 1) return 'tomorrow';
  if (dayDiff === -1) return 'yesterday';

  const abs = Math.abs(dayDiff);
  const future = dayDiff > 0;

  if (abs < 7) {
    return future ? `in ${abs} days` : `${abs} days ago`;
  }
  if (abs < 30) {
    const weeks = Math.round(abs / 7);
    const unit = weeks === 1 ? 'week' : 'weeks';
    return future ? `in ${weeks} ${unit}` : `${weeks} ${unit} ago`;
  }
  if (abs < 365) {
    const months = Math.round(abs / 30);
    const unit = months === 1 ? 'month' : 'months';
    return future ? `in ${months} ${unit}` : `${months} ${unit} ago`;
  }
  const years = Math.round(abs / 365);
  const unit = years === 1 ? 'year' : 'years';
  return future ? `in ${years} ${unit}` : `${years} ${unit} ago`;
};
