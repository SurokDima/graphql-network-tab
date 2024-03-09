import { FC } from "react";

import { styled } from "@mui/joy";
import JsonViewer from "react18-json-view";
import "react18-json-view/src/style.css";

type JsonViewProps = {
  json: string;
};

export const JsonView: FC<JsonViewProps> = ({ json }) => {
  return <StyledJsnViewer src={json} />;
};

const StyledJsnViewer = styled(JsonViewer)`
  --json-property: #e06c75;
  --json-index: #e06c75;
  --json-number: #d19a66;
  --json-string: #98c379;
  --json-boolean: #d19a66;
  --json-null: #d19a66;
  color: ${({ theme }) => theme.palette.neutral.plainColor};
`;
