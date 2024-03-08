import React from "react";

import { useDelay } from "../hooks/useDelay";

type IDelayedLoaderProps = {
  loading: boolean;
  loader: React.ReactNode;
  children?: React.ReactNode;
  delay?: number;
};

/**
 * Rendering a loading indicator when content is loading.
 * But delay loading the indicator before the delay has passed.
 *
 * This improves the perceived performance of the app as the loader
 * does not flash on screen for short periods of time.
 *
 */
export const DelayedLoader: React.FC<IDelayedLoaderProps> = ({
  loading,
  loader,
  delay = 300,
  children,
}) => {
  const delayExceeded = useDelay(loading, delay);

  if (loading && delayExceeded) {
    return <>{loader}</>;
  }

  return <>{children}</>;
};
