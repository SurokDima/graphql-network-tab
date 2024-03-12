import { FC } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Link,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";

import { NetworkRequest } from "../types/network-request.ts";
import { Description } from "../ui/Description.tsx";

import { NetworkRequestStatus } from "./NetworkRequestStatus.tsx";

export type NetworkRequestHeadersProps = {
  networkRequest: NetworkRequest;
};

export const NetworkRequestHeaders: FC<NetworkRequestHeadersProps> = ({ networkRequest }) => {
  return (
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
      defaultChecked
    >
      <Accordion defaultExpanded>
        <AccordionSummary>General</AccordionSummary>
        <AccordionDetails variant="soft">
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
        <AccordionSummary>Request</AccordionSummary>
        <AccordionDetails variant="soft">
          <Description
            rows={[...networkRequest.request.headers.entries()].map(([key, value]) => ({
              label: key,
              value: value,
              copyValue: value,
            }))}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>Response</AccordionSummary>
        <AccordionDetails variant="soft">
          <Description
            rows={[...networkRequest.response.headers.entries()].map(([key, value]) => ({
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
