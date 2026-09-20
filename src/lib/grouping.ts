/**
 * Groups items by a key function, ordered by `orderedKeys` (keys absent from
 * the data are omitted, mirroring the topic/category ordering used across the
 * section pages).
 */
export function groupBy<T, K extends string>(
  items: readonly T[],
  keyFn: (item: T) => K,
  orderedKeys: readonly K[],
): Array<{ key: K; items: T[] }> {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const list = map.get(key);
    if (list) list.push(item);
    else map.set(key, [item]);
  }
  return orderedKeys
    .filter((key) => map.has(key))
    .map((key) => ({ key, items: map.get(key)! }));
}