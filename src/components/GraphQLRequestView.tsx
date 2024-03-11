import { FC } from "react";

import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box } from "@mui/joy";

import { GraphQLRequest } from "../types/graphql-request.ts";
import { CodeView } from "../ui/CodeView.tsx";

type GraphQLRequestViewProps = {
  request: GraphQLRequest;
};

export const GraphQLRequestView: FC<GraphQLRequestViewProps> = ({ request }) => {
  return (
    <Box>
      <AccordionGroup>
        <Accordion defaultExpanded>
          <AccordionSummary>Request</AccordionSummary>
          <AccordionDetails>
            <Box paddingTop={1} sx={{ overflowX: "auto" }}>
              <CodeView code={request.rawGraphQL} language="graphql" />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary>Variables</AccordionSummary>
          <AccordionDetails>
            <Box paddingTop={1} sx={{ overflowX: "auto" }}>
              <CodeView code={JSON.stringify(request.variables)} language="json" />
            </Box>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};
