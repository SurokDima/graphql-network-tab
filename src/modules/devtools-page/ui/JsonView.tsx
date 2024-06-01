import { FC } from "react";

import { Box, styled } from "@mui/joy";
import JsonViewer from "react18-json-view";
import "react18-json-view/src/style.css";

type JsonViewProps = {
  json: string;
};

export const JsonView: FC<JsonViewProps> = ({ json }) => {
  return (
    <Box sx={{ padding: "0.75rem" }}>
      <StyledJsnViewer src={json} collapsed={1} displaySize={true} />
    </Box>
  );
};

const StyledJsnViewer = styled(JsonViewer)`
  --json-property: #e06c75;
  --json-index: #e06c75;
  --json-number: #d19a66;
  --json-string: #98c379;
  --json-boolean: #d19a66;
  --json-null: #d19a66;
  padding-top: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.palette.neutral.plainColor};
`;
