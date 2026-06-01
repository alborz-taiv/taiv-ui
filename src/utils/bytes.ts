/**
 * Compact human-readable byte size: "512 B", "1.4 KB", "9.2 MB", "1.30 GB".
 *
 * Uses 1024 as the conversion base (binary), which matches what most
 * file-system / asset-store consumers display. KB and MB precision is one
 * decimal, GB precision is two decimals — matches the intuition that bigger
 * units deserve finer granularity for the same screen footprint.
 */
export const formatBytes = (n: number): string => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
};
