import { FC, PropsWithChildren } from "react";

import { Stack, Table, styled } from "@mui/joy";

export type DescriptionRootProps = PropsWithChildren;
export type DescriptionRowProps = PropsWithChildren;
export type DescriptionRowLabelProps = PropsWithChildren;
export type DescriptionRowValueProps = PropsWithChildren;
export type DescriptionRowActionsProps = PropsWithChildren;

const DescriptionRowLabel: FC<DescriptionRowLabelProps> = ({ children }) => {
  return <td>{children}</td>;
};

const DescriptionRowValue: FC<DescriptionRowValueProps> = ({ children }) => {
  return <td>{children}</td>;
};

const DescriptionRowActions: FC<DescriptionRowActionsProps> = ({ children }) => {
  return (
    <td>
      <Stack direction="row" spacing={1}>
        {children}
      </Stack>
    </td>
  );
};

const DescriptionRow: FC<DescriptionRowProps> = ({ children }) => {
  return <TableRow>{children}</TableRow>;
};

const DescriptionRoot: FC<DescriptionRootProps> = ({ children }) => {
  return (
    <>
      <Table
        size="sm"
        sx={{
          "--TableCell-height": "50px",
        }}
      >
        <tbody>{children}</tbody>
      </Table>
    </>
  );
};

const TableRow = styled("tr")`
  td:nth-child(1) {
    width: 25%;
  }

  td:nth-child(2) {
    word-wrap: break-word;
  }

  td:nth-child(3) {
    width: 50px;

    > div {
      display: none;
    }
  }

  &:hover {
    td:nth-child(3) > div {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const Description = {
  Root: DescriptionRoot,
  Row: DescriptionRow,
  RowLabel: DescriptionRowLabel,
  RowValue: DescriptionRowValue,
  RowActions: DescriptionRowActions,
};
