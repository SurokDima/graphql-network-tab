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

import { NetworkRequest } from "../../../../common/types/network-request";
import { NetworkRequestStatus } from "../../../components/NetworkRequestStatus";
import { CopyButton } from "../../../ui/CopyButton";
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
          <Description.Root>
            <Description.Row>
              <Description.RowLabel>Request URL</Description.RowLabel>
              <Description.RowValue>
                <Link href={networkRequest.request.url} target="_blank">
                  {networkRequest.request.url}
                </Link>
              </Description.RowValue>
              <Description.RowActions>
                <CopyButton value={networkRequest.request.url} />
              </Description.RowActions>
            </Description.Row>
            <Description.Row>
              <Description.RowLabel>Method</Description.RowLabel>
              <Description.RowValue>{networkRequest.request.method}</Description.RowValue>
              <Description.RowActions>
                <CopyButton value={networkRequest.request.method} />
              </Description.RowActions>
            </Description.Row>
            <Description.Row>
              <Description.RowLabel>Status</Description.RowLabel>
              <Description.RowValue>
                <NetworkRequestStatus statusCode={networkRequest.response.statusCode} />
              </Description.RowValue>
              <Description.RowActions>
                <CopyButton value={networkRequest.response.statusCode.toString()} />
              </Description.RowActions>
            </Description.Row>
          </Description.Root>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <StyledAccordionSummary>Request</StyledAccordionSummary>
        <AccordionDetails>
          <Description.Root>
            {Object.entries(networkRequest.request.headers).map(([key, value]) => (
              <Description.Row key={key}>
                <Description.RowLabel>{key}</Description.RowLabel>
                <Description.RowValue>{value}</Description.RowValue>
                <Description.RowActions>
                  <CopyButton value={value} />
                </Description.RowActions>
              </Description.Row>
            ))}
          </Description.Root>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <StyledAccordionSummary>Response</StyledAccordionSummary>
        <AccordionDetails>
          <Description.Root>
            {Object.entries(networkRequest.response.headers).map(([key, value]) => (
              <Description.Row key={key}>
                <Description.RowLabel>{key}</Description.RowLabel>
                <Description.RowValue>{value}</Description.RowValue>
                <Description.RowActions>
                  <CopyButton value={value} />
                </Description.RowActions>
              </Description.Row>
            ))}
          </Description.Root>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

const StyledAccordionSummary = styled(AccordionSummary)`
  background: ${({ theme }) => theme.palette.background.surface};
`;
