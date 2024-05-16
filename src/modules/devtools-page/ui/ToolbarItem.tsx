import { FC, useCallback } from "react";

import { useToolbarItem } from "../hooks/useToolbar";

export type ToolbarItemProps = {
  children?: React.ReactNode;
};

export const ToolbarItem: FC<ToolbarItemProps> = ({ children }) => {
  const renderer = useCallback(() => <>{children}</>, [children]);
  useToolbarItem(renderer);
  return null;
};
