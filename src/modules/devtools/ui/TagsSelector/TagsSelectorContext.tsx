import { createContext, useContext } from "react";

export const TagsSelectorContext = createContext<{
  isSelected: (val: string) => boolean;
  onChange: (val: string) => void;
} | null>(null);

export const useTagsSelectorContext = () => {
  const context = useContext(TagsSelectorContext);

  if (!context) {
    throw new Error("Couldn't find TagsSelectorContext value");
  }

  return context;
};
