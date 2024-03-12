import { FC } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  accordionSummaryClasses,
  accordionDetailsClasses,
  Box,
} from "@mui/joy";

import { GraphQLRequest } from "../types/graphql-request.ts";
import { CodeView } from "../ui/CodeView.tsx";

type GraphQLRequestViewProps = {
  request: GraphQLRequest;
};

export const GraphQLRequestView: FC<GraphQLRequestViewProps> = ({ request }) => {
  return (
    <Box>
      <AccordionGroup
        sx={{
          [`& .${accordionSummaryClasses.button}:hover`]: {
            bgcolor: "transparent",
          },
          [`& .${accordionDetailsClasses.content}`]: {
            boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
            [`&.${accordionDetailsClasses.expanded}`]: {
              paddingBlock: "0.75rem",
            },
          },
        }}
      >
        <Accordion defaultExpanded>
          <AccordionSummary>Request</AccordionSummary>
          <AccordionDetails variant="soft">
            <Box sx={{ overflowX: "auto" }}>
              <CodeView
                code={request.rawGraphQL}
                language="graphql"
                sx={{
                  overflowY: "hidden",
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary>Variables</AccordionSummary>
          <AccordionDetails variant="soft">
            <Box sx={{ overflowX: "auto" }}>
              <CodeView
                code={JSON.stringify(request.variables)}
                language="json"
                sx={{
                  overflowY: "hidden",
                }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};
