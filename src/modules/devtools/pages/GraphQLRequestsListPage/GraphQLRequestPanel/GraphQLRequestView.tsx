import { FC } from "react";

import { GraphQLRequest } from "../../../../common/types/graphQLRequest";
import {
  CodeView,
  CodeViewCloseToolbarItem,
  CodeViewContainer,
  CodeViewExitFullscreenToolbarItem,
  CodeViewFoldToolbarItem,
  CodeViewFullscreenToolbarItem,
  CodeViewUnfoldToolbarItem,
  FullscreenCodeView,
} from "../../../ui/CodeView";
import { Toolbar, ToolbarItemsGroup } from "../../../ui/Toolbar";

type GraphQLRequestViewProps = {
  request: GraphQLRequest;
};

export const GraphQLRequestView: FC<GraphQLRequestViewProps> = ({ request }) => {
  return (
    <CodeViewContainer>
      <Toolbar>
        <CodeViewFullscreenToolbarItem size="sm" />
        <CodeViewFoldToolbarItem size="sm" />
        <CodeViewUnfoldToolbarItem size="sm" />
      </Toolbar>
      <CodeView code={request.rawGraphQL} language="graphql" />
      <FullscreenCodeView>
        <Toolbar justify="space-between">
          <ToolbarItemsGroup>
            <CodeViewExitFullscreenToolbarItem size="md" />
            <CodeViewFoldToolbarItem size="md" />
            <CodeViewUnfoldToolbarItem size="md" />
          </ToolbarItemsGroup>
          <CodeViewCloseToolbarItem size="md" />
        </Toolbar>
      </FullscreenCodeView>
    </CodeViewContainer>
  );
};
