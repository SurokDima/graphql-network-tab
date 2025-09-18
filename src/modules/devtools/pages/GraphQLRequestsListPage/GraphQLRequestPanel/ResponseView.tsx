import { FC, useMemo } from "react";

import { isJSON } from "../../../../common/utils/string.utils";
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

type ResponseViewProps = {
  response: string;
};

export const ResponseView: FC<ResponseViewProps> = ({ response }) => {
  const language = useMemo(() => (isJSON(response) ? "json" : "text"), [response]);

  return (
    <CodeViewContainer>
      <Toolbar>
        <CodeViewFullscreenToolbarItem size="sm" />
        {language === "json" && (
          <>
            <CodeViewFoldToolbarItem size="sm" />
            <CodeViewUnfoldToolbarItem size="sm" />
          </>
        )}
      </Toolbar>
      <CodeView code={response} language={language} />
      <FullscreenCodeView>
        <Toolbar justify="space-between">
          <ToolbarItemsGroup>
            <CodeViewExitFullscreenToolbarItem size="md" />
            {language === "json" && (
              <>
                <CodeViewFoldToolbarItem size="md" />
                <CodeViewUnfoldToolbarItem size="md" />
              </>
            )}
          </ToolbarItemsGroup>
          <CodeViewCloseToolbarItem size="md" />
        </Toolbar>
      </FullscreenCodeView>
    </CodeViewContainer>
  );
};
