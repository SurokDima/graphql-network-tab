import { FC } from "react";

import { CodeView } from "../ui/CodeView";

type RawResponseViewProps = {
  response: string;
};

export const RawResponseView: FC<RawResponseViewProps> = ({ response }) => {
  return <CodeView code={response} language="json" />;
};
