import { FC, useCallback, useMemo, useState } from "react";

import { List } from "@mui/joy";

import { toggleItem } from "../../../common/utils/array.utils";

import { TagsSelectorContext } from "./TagsSelectorContext";

export type TagsSelectorProps = {
  children: JSX.Element[];
  selectedTags?: string[];
  onChange?: (tags: string[]) => void;
  defaultSelected?: string[];
};

export const TagsSelector: FC<TagsSelectorProps> = ({
  children,
  onChange,
  selectedTags: externalSelectedTags,
  defaultSelected = [],
}) => {
  const [internalSelectedTags, setInternalSelectedTags] = useState<string[]>(defaultSelected);

  // If external state is provider - use it, otherwise use internal state
  const selectedTags = externalSelectedTags ? externalSelectedTags : internalSelectedTags;
  const setSelectedTags = externalSelectedTags ? onChange : setInternalSelectedTags;

  const handleChange = useCallback(
    (value: string) => {
      const newSelectedTags = toggleItem(selectedTags, value);
      setSelectedTags?.(newSelectedTags);
    },
    [selectedTags, setSelectedTags]
  );

  const isSelected = useCallback((value: string) => selectedTags.includes(value), [selectedTags]);

  const contextValue = useMemo(
    () => ({ isSelected, onChange: handleChange }),
    [isSelected, handleChange]
  );

  return (
    <TagsSelectorContext.Provider value={contextValue}>
      <List
        orientation="horizontal"
        wrap
        sx={{
          padding: 1,
          margin: 0,
          gap: 1,
          alignItems: "center",
          "--List-padding": 1,
          "--ListItem-radius": "20px",
          "--ListItem-minHeight": "32px",
          "--ListItem-gap": "4px",
        }}
      >
        {children}
      </List>
    </TagsSelectorContext.Provider>
  );
};
