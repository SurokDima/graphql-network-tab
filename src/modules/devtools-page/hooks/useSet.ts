import { useCallback, useState } from "react";

export const useSet = <T>(initialValue: T[]) => {
  const [items, setItems] = useState<T[]>(initialValue);

  const has = useCallback(
    (item: T) => {
      return items.find((i) => i === item) !== undefined;
    },
    [items]
  );

  const add = useCallback(
    (newValue: T) => {
      if (!has(newValue)) {
        setItems((prev) => [...prev, newValue]);
      }
    },
    [has]
  );

  const remove = useCallback((value: T) => {
    setItems((prev) => prev.filter((item) => item !== value));
  }, []);

  const toggle = useCallback(
    (value: T) => {
      if (has(value)) {
        remove(value);
      } else {
        add(value);
      }
    },
    [has, add, remove]
  );

  return [items, { has, add, remove, toggle }] as const;
};
