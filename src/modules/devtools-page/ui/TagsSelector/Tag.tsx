import { FC, ReactNode } from "react";

import { Done } from "@mui/icons-material";
import { Checkbox, ColorPaletteProp, ListItem } from "@mui/joy";

import { useTagsSelectorContext } from "./TagsSelectorContext";

export type TagProps = {
  color: ColorPaletteProp;
  value: string;
  children?: ReactNode;
};

export const Tag: FC<TagProps> = ({ children, color, value }) => {
  const { isSelected, onChange } = useTagsSelectorContext();
  const selected = isSelected(value);

  return (
    <ListItem color={color} sx={{ margin: 0 }}>
      {selected && (
        <Done
          size="sm"
          fontSize="sm"
          color={color}
          sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
        />
      )}
      <Checkbox
        size="sm"
        disableIcon
        overlay
        color={color}
        label={children}
        checked={selected}
        variant={selected ? "soft" : "outlined"}
        onChange={() => {
          onChange(value);
        }}
        slotProps={{
          action: ({ checked }) => ({
            sx: checked
              ? {
                  border: "1px solid",
                }
              : {},
          }),
        }}
      />
    </ListItem>
  );
};
