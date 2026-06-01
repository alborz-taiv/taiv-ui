/**
 * Compact human-readable duration: "5.3s", "2m 35s", "1h 20m", "3h".
 *
 * Input is in **seconds** (not milliseconds). Callers should guard against
 * zero, negative, NaN, and Infinity before calling — this function does not
 * clamp or default those values.
 *
 * Precision rules:
 *   - Sub-60s: one decimal place ("5.3s") — fine grain matters for short clips.
 *   - 60s and above: whole seconds only, sub-second precision dropped ("2m 35s").
 *
 * No day unit — hours are the largest unit ("25h"). Suitable for content
 * durations (slides, playlists, video clips) where values above a few hours
 * are not expected.
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    const rounded = Math.round(seconds * 10) / 10;
    return `${rounded}s`;
  }

  const totalSeconds = Math.round(seconds);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;

  if (m >= 60) {
    const h = Math.floor(m / 60);
    const remainingM = m % 60;
    return remainingM > 0 ? `${h}h ${remainingM}m` : `${h}h`;
  }

  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};
