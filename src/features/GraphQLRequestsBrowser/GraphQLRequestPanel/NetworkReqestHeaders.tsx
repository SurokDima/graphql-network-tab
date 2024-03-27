import { FC } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Link,
  accordionDetailsClasses,
  accordionSummaryClasses,
  styled,
} from "@mui/joy";

import { NetworkRequestStatus } from "../../../components/NetworkRequestStatus";
import { NetworkRequest } from "../../../types/network-request";
import { Description } from "../../../ui/Description";

export type NetworkRequestHeadersProps = {
  networkRequest: NetworkRequest;
};

export const NetworkRequestHeaders: FC<NetworkRequestHeadersProps> = ({ networkRequest }) => {
  return (
    <AccordionGroup
      size="sm"
      sx={{
        overflowY: "auto",
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
      defaultChecked
    >
      <Accordion defaultExpanded>
        <StyledAccordionSummary>General</StyledAccordionSummary>
        <AccordionDetails>
          <Description
            rows={[
              {
                label: "Request URL",
                value: (
                  <Link href={networkRequest.request.url} target="_blank">
                    {networkRequest.request.url}
                  </Link>
                ),
                copyValue: networkRequest.request.url,
              },
              {
                label: "Method",
                value: networkRequest.request.method,
                copyValue: networkRequest.request.method,
              },
              {
                label: "Status",
                value: <NetworkRequestStatus statusCode={networkRequest.response.statusCode} />,
                copyValue: networkRequest.response.statusCode.toString(),
              },
            ]}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <StyledAccordionSummary>Request</StyledAccordionSummary>
        <AccordionDetails>
          <Description
            rows={Object.entries(networkRequest.request.headers).map(([key, value]) => ({
              label: key,
              value: value,
              copyValue: value,
            }))}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <StyledAccordionSummary>Response</StyledAccordionSummary>
        <AccordionDetails>
          <Description
            rows={Object.entries(networkRequest.response.headers).map(([key, value]) => ({
              label: key,
              value: value,
              copyValue: value,
            }))}
          />
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

const StyledAccordionSummary = styled(AccordionSummary)`
  background: ${({ theme }) => theme.palette.background.surface};
`;
