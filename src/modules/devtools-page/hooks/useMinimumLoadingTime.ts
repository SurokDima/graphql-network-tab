import { useEffect, useRef, useState } from "react";

/**
 * Set a minimum time for a loading
 *
 * This improves the perceived loading time of features
 * as users do not see loaders flash on screen for short
 * periods of time.
 *
 */
export const useMinimumLoadingTime = (loading: boolean, minTimeMs = 300) => {
  const [delayedLoading, setDelayedLoading] = useState(loading);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (loading) {
      setDelayedLoading(true);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDelayedLoading(false);
      }, minTimeMs);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading, minTimeMs]);

  return delayedLoading;
};
