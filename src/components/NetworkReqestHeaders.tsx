import { FC } from "react";

import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Link } from "@mui/joy";

import { NetworkRequest } from "../types/network-request.ts";
import { Description } from "../ui/Description.tsx";

import { NetworkRequestStatus } from "./NetworkRequestStatus.tsx";

export type NetworkRequestHeadersProps = {
  networkRequest: NetworkRequest;
};

export const NetworkRequestHeaders: FC<NetworkRequestHeadersProps> = ({ networkRequest }) => {
  return (
    <AccordionGroup defaultChecked>
      <Accordion defaultExpanded>
        <AccordionSummary>General</AccordionSummary>
        <AccordionDetails>
          <Description
            rows={[
              {
                label: "Request URL",
                value: (
                  <Link href={networkRequest.url} target="_blank">
                    {networkRequest.url}
                  </Link>
                ),
                copyValue: networkRequest.url,
              },
              { label: "Method", value: networkRequest.method, copyValue: networkRequest.method },
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
        <AccordionDetails>
          <Description
            rows={[...networkRequest.headers.entries()].map(([key, value]) => ({
              label: key,
              value: value,
              copyValue: value,
            }))}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary>Response</AccordionSummary>
        <AccordionDetails>
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
