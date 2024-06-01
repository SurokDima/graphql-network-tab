export const unique = <TItem>(
  array: TItem[],
  predicate: (a: TItem, b: TItem) => boolean = (a, b) => a === b
): TItem[] => {
  return array.reduce<TItem[]>((acc, item1) => {
    const findTheSameItem = (item2: TItem) => {
      return predicate(item1, item2);
    };

    return acc.find(findTheSameItem) ? acc : [...acc, item1];
  }, []);
};

export function toggleItem<TItem>(
  array: TItem[],
  item: TItem,
  predicate: (a: TItem, b: TItem) => boolean = (a, b) => a === b
): TItem[] {
  if (array.find((val) => predicate(val, item))) {
    return array.filter((val) => !predicate(item, val));
  }

  return [...array, item];
}

/**
 * Inserts an element between each element of an array
 *
 */
export const interleave = <TItem>(arr: TItem[], x: TItem): TItem[] =>
  arr.flatMap((e) => [e, x]).slice(0, -1);
