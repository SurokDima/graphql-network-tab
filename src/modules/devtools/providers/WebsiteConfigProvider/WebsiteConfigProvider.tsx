import { nanoid } from "nanoid";
import { FC, PropsWithChildren, createContext, useContext } from "react";

import { WebsiteConfig } from "../../../common/types/websiteConfig";
import { useMinimumLoadingTime } from "../../hooks";
import { LoadingOverlay } from "../../ui/LoadingOverlay";

import { useStoredWebsiteConfig } from "./useStoredWebsiteConfig";

const WebsiteConfigContext = createContext<{ websiteConfig: WebsiteConfig | null }>({
  websiteConfig: {
    id: nanoid(),
    domain: "",
    enabled: false,
    rules: [],
  },
});

export const WebsiteConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  // TODO store in variables
  const { websiteConfig, loading, error } = useStoredWebsiteConfig();
  const delayedLoading = useMinimumLoadingTime(loading, 300);

  if (delayedLoading) {
    return <LoadingOverlay />;
  }

  // TODO handle error
  if (error || !websiteConfig) {
    return <></>;
  }

  return (
    <WebsiteConfigContext.Provider value={{ websiteConfig }}>
      {children}
    </WebsiteConfigContext.Provider>
  );
};

export const useWebsiteConfig = () => {
  const context = useContext(WebsiteConfigContext);

  if (!context) {
    throw new Error("Couldn't find WebsiteConfigContext value");
  }

  if (!context.websiteConfig) {
    throw new Error("It's not expected to have a null website config");
  }

  return context.websiteConfig;
};
