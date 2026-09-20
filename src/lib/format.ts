/**
 * Compact star-count formatting, e.g. 12400 -> "12.4k", 850 -> "850".
 */
export function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}