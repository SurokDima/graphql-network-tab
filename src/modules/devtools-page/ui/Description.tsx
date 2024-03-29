import { FC, ReactNode, useState } from "react";

import { Snackbar, Table, styled } from "@mui/joy";

import { CopyButton } from "./CopyButton";

export type DescriptionProps = {
  rows: {
    label: ReactNode;
    value: ReactNode;
    copyValue?: string;
  }[];
};

export const Description: FC<DescriptionProps> = ({ rows }) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  return (
    <>
      <Table
        size="sm"
        sx={{
          "--TableCell-height": "50px",
        }}
      >
        <tbody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <td>{row.label}</td>
              <td>{row.value}</td>
              <td>
                {row.copyValue && (
                  <div>
                    <CopyButton value={row.copyValue} />
                  </div>
                )}
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        variant="solid"
        color={"success"}
      >
        Copied
      </Snackbar>
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
