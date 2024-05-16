import { nanoid } from "nanoid";
import { useCallback, useEffect, useMemo } from "react";

import { useAtom } from "jotai";

import { toolbarAtom } from "../store";

export const useToolbar = () => {
  const [items, setItems] = useAtom(toolbarAtom);

  const addItem = useCallback(
    (id: string, renderer: () => JSX.Element) => {
      setItems((prevItems) => [...prevItems, { id, renderer }]);
    },
    [setItems]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== id));
    },
    [setItems]
  );

  return { items, addItem, removeItem };
};

export const useToolbarItem = (renderer: () => JSX.Element) => {
  const { addItem, removeItem } = useToolbar();

  const id = useMemo(() => nanoid(), []);

  useEffect(() => {
    addItem(id, renderer);
    return () => removeItem(id);
  }, [addItem, id, removeItem, renderer]);
};
