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
