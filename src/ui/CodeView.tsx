import { FC, useState } from "react";

import DataObjectIcon from "@mui/icons-material/DataObject";
import { Box, CircularProgress, IconButton, Stack } from "@mui/joy";

import { useHighlight } from "../hooks/useHighlight";
import { usePrettier } from "../hooks/usePrettier";

import { CopyButton } from "./CopyButton";
import { DelayedLoader } from "./DelayedLoader";

type CodeViewProps = {
  code: string;
  language: "json" | "graphql";
  pretty?: boolean;
};

export const CodeView: FC<CodeViewProps> = ({ code, language, pretty: defaultPretty = true }) => {
  const [isPretty, setIsPretty] = useState(defaultPretty);
  const { formattedCode, isLoading: isPrettierLoading } = usePrettier(code, language);

  const { isLoading: isHighlightLoading, markup } = useHighlight({
    language,
    code: isPretty ? formattedCode! : code,
    skip: isPretty ? !formattedCode || isPrettierLoading : false,
  });

  return (
    <DelayedLoader
      loading={isPretty ? isHighlightLoading || isPrettierLoading : isHighlightLoading}
      loader={
        <Stack height="100%" width="100%" justifyItems="center" alignItems="center">
          <CircularProgress size="md" />
        </Stack>
      }
      delay={300}
    >
      <Stack direction="column" height="100%">
        <Stack direction="row" spacing={1}>
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={() => setIsPretty(!isPretty)}
            aria-pressed={isPretty ? "true" : "false"}
            sx={(theme) => ({
              [`&[aria-pressed="true"]`]: {
                ...theme.variants.outlinedActive.neutral,
                borderColor: theme.vars.palette.neutral.outlinedHoverBorder,
              },
            })}
          >
            <DataObjectIcon />
          </IconButton>
          <CopyButton value={isPretty ? formattedCode! : code} />
        </Stack>
        <Box sx={{ overflowX: "auto" }} flex="1 1 auto">
          <pre>
            <code dangerouslySetInnerHTML={{ __html: markup }} />
          </pre>
        </Box>
      </Stack>
    </DelayedLoader>
  );
};
