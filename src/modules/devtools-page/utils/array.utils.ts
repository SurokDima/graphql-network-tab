export const unique = <TItem>(
  array: TItem[],
  compare: (a: TItem, b: TItem) => boolean = (a, b) => a === b
): TItem[] => {
  return array.reduce<TItem[]>((acc, item1) => {
    const findTheSameItem = (item2: TItem) => {
      return compare(item1, item2);
    };

    return acc.find(findTheSameItem) ? acc : [...acc, item1];
  }, []);
};
