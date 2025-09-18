import { FC, PropsWithChildren, createContext, useContext } from "react";

import { AppliedRule } from "../../common/types/rule";
import { useMinimumLoadingTime, useStorageItem } from "../hooks";
import { LoadingOverlay } from "../ui/LoadingOverlay";

const AppliedRulesContext = createContext<AppliedRule[]>([]);

export const AppliedRulesProvider: FC<PropsWithChildren> = ({ children }) => {
  // TODO use constants for key
  const { data: appliedRules, loading, error } = useStorageItem<AppliedRule[]>("appliedRules");
  const delayedLoading = useMinimumLoadingTime(loading, 300);

  if (delayedLoading) {
    return <LoadingOverlay />;
  }

  // TODO: handle error
  if (error) {
    return <></>;
  }

  return (
    <AppliedRulesContext.Provider value={appliedRules ?? []}>
      {children}
    </AppliedRulesContext.Provider>
  );
};

export const useAppliedRules = () => {
  const appliedRules = useContext(AppliedRulesContext);
  return appliedRules;
};
