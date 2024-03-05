import { FC, ReactNode, useState } from "react";

import { CopyAll } from "@mui/icons-material";
import { IconButton, Snackbar, Table } from "@mui/joy";
import toast from "react-hot-toast";

import { useCopy } from "../hooks/useCopy.ts";

import styles from "./Description.module.scss";

export type DescriptionProps = {
  rows: {
    label: ReactNode;
    value: ReactNode;
    copyValue?: string;
  }[];
};

export const Description: FC<DescriptionProps> = ({ rows }) => {
  const { copy } = useCopy({
    onSuccess: () => toast.success("Copied"),
  });

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
                    <IconButton
                      onClick={() => {
                        if (!row.copyValue) return;
                        copy(row.copyValue);
                      }}
                      variant="plain"
                      color="success"
                    >
                      <CopyAll />
                    </IconButton>
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
