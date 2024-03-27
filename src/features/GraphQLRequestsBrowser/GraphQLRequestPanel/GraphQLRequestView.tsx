import { FC } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  accordionSummaryClasses,
  accordionDetailsClasses,
  Box,
  styled,
} from "@mui/joy";

import { GraphQLRequest } from "../../../types/graphQL-request";
import { CodeView } from "../../../ui/CodeView";

type GraphQLRequestViewProps = {
  request: GraphQLRequest;
};

export const GraphQLRequestView: FC<GraphQLRequestViewProps> = ({ request }) => {
  return (
    <Box>
      <AccordionGroup
        size="sm"
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
          <StyledAccordionSummary>Request</StyledAccordionSummary>
          <AccordionDetails variant="soft">
            <Box sx={{ overflowX: "auto" }}>
              <CodeView
                code={request.rawGraphQL}
                language="graphql"
                // sx={{
                //   overflowY: "hidden",
                // }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <StyledAccordionSummary>Variables</StyledAccordionSummary>
          <AccordionDetails variant="soft">
            <Box sx={{ overflowX: "auto" }}>
              <CodeView
                code={JSON.stringify(request.variables)}
                language="json"
                // sx={{
                //   overflowY: "hidden",
                // }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

const StyledAccordionSummary = styled(AccordionSummary)`
  background: ${({ theme }) => theme.palette.background.surface};
`;
