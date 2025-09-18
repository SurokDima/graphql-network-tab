import { FC, PropsWithChildren } from "react";

import { useTheme } from "@mui/joy";
import { Toaster } from "react-hot-toast";

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const { palette } = useTheme();
  return (
    <>
      <Toaster
        toastOptions={{
          position: "top-right",
          success: {
            style: {
              background: palette.success.solidBg,
              color: palette.text.primary,
              fontWeight: "bold",
            },
            iconTheme: {
              primary: palette.text.primary,
              secondary: palette.success.solidBg,
            },
          },

          error: {
            style: {
              background: palette.danger.solidBg,
              color: palette.text.primary,
              fontWeight: "bold",
            },
            iconTheme: {
              primary: palette.text.primary,
              secondary: palette.danger.solidBg,
            },
          },
        }}
      />
      {children}
    </>
  );
};
