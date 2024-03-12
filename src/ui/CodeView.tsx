import { FC, useState } from "react";

import DataObjectIcon from "@mui/icons-material/DataObject";
import { Box, CircularProgress, IconButton, Stack, styled } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

import { useHighlight } from "../hooks/useHighlight";
import { usePrettier } from "../hooks/usePrettier";

import { CopyButton } from "./CopyButton";
import { DelayedLoader } from "./DelayedLoader";

type CodeViewProps = {
  code: string;
  language: "json" | "graphql";
  pretty?: boolean;
  sx?: SxProps;
};

export const CodeView: FC<CodeViewProps> = ({
  code,
  language,
  sx,
  pretty: defaultPretty = true,
}) => {
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
      <Stack
        sx={{
          height: "100%",
          flexDirection: "column",
          ...sx,
        }}
      >
        <Stack direction="row" spacing={1} paddingBottom={1}>
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
        <Box flex="1 1 auto">
          <StyledPre>
            <code dangerouslySetInnerHTML={{ __html: markup }} />
          </StyledPre>
        </Box>
      </Stack>
    </DelayedLoader>
  );
};

const StyledPre = styled("pre")`
  margin: 0;
`;
