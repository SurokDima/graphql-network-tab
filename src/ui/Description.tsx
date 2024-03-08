import { FC, ReactNode, useState } from "react";

import { Snackbar, Table } from "@mui/joy";

import { CopyButton } from "./CopyButton.tsx";
import styles from "./Description.module.scss";

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
        sx={{
          "--TableCell-height": "50px",
        }}
      >
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={styles.row}>
              <td>{row.label}</td>
              <td>{row.value}</td>
              <td>
                {row.copyValue && (
                  <div>
                    <CopyButton value={row.copyValue} />
                  </div>
                )}
              </td>
            </tr>
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
