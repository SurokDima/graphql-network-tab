import { FC } from "react";

import { GraphQLRequest } from "../../../../common/types/graphQLRequest";
import {
  CodeView,
  CodeViewContainer,
  CodeViewFoldToolbarItem,
  CodeViewUnfoldToolbarItem,
} from "../../../ui/CodeView";
import { Toolbar } from "../../../ui/Toolbar";

export type GraphQLRequestVariablesViewProps = {
  request: GraphQLRequest;
};

export const GraphQLRequestVariablesView: FC<GraphQLRequestVariablesViewProps> = ({ request }) => {
  return (
    <CodeViewContainer>
      <Toolbar>
        <CodeViewFoldToolbarItem size="sm" />
        <CodeViewUnfoldToolbarItem size="sm" />
      </Toolbar>
      <CodeView code={JSON.stringify(request.variables)} language="json" />
    </CodeViewContainer>
  );
};
