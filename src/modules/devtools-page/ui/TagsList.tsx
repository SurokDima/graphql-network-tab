import { FC } from "react";

import { Done } from "@mui/icons-material";
import { Checkbox, ColorPaletteProp, List, ListItem } from "@mui/joy";

type TagsListProps = {
  tags: { label: string; value: string; color: ColorPaletteProp; isSelected: boolean }[];
  onTagChange: (tag: string) => void;
};

export const TagsList: FC<TagsListProps> = ({ tags, onTagChange }) => {
  return (
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
      {tags.map((tag) => (
        <ListItem key={tag.value} color={tag.color} sx={{ margin: 0 }}>
          {tag.isSelected && (
            <Done
              size="sm"
              fontSize="sm"
              color={tag.color}
              sx={{ ml: -0.5, zIndex: 2, pointerEvents: "none" }}
            />
          )}
          <Checkbox
            size="sm"
            disableIcon
            overlay
            color={tag.color}
            label={tag.label}
            checked={tag.isSelected}
            variant={tag.isSelected ? "soft" : "outlined"}
            onChange={() => {
              onTagChange(tag.value);
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
      ))}
    </List>
  );
};
