import { nanoid } from "nanoid";
import { FC, useCallback, useEffect, useRef } from "react";

import { atom, useAtom } from "jotai";

import { Headers, NetworkRequest, isAborted } from "../../common/types/networkRequest";
import { chromeProvider, getContentAsync, getHARLogAsync } from "../services/chromeProvider";

const networkRequestsAtom = atom<NetworkRequest[]>([]);

const networkRequestsSettingsAtom = atom<{
  shouldPreserveLog: boolean;
}>({
  shouldPreserveLog: false,
});

export type NetworkRequestsProviderProps = {
  children: React.ReactNode;
};

export const NetworkRequestsProvider: FC<NetworkRequestsProviderProps> = ({ children }) => {
  const [_, setNetworkRequests] = useAtom(networkRequestsAtom);
  const [settings] = useAtom(networkRequestsSettingsAtom);
  const isInitializedRef = useRef(false);

  const handleNewRequest = useCallback(
    async (chromeRequest: chrome.devtools.network.Request) => {
      const networkRequest = await mapRequestToNetworkRequest(chromeRequest);
      if (isAborted(networkRequest)) return;
      setNetworkRequests((prev) => [...prev, networkRequest]);
    },
    [setNetworkRequests]
  );

  const clearRequests = useCallback(() => {
    if (!settings.shouldPreserveLog) setNetworkRequests([]);
  }, [setNetworkRequests, settings.shouldPreserveLog]);

  useEffect(() => {
    chromeProvider.devtools.network.onRequestFinished.addListener(handleNewRequest);

    return () => {
      chromeProvider.devtools.network.onRequestFinished.removeListener(handleNewRequest);
    };
  }, [handleNewRequest]);

  useEffect(() => {
    chromeProvider.devtools.network.onNavigated.addListener(clearRequests);

    return () => {
      chromeProvider.devtools.network.onNavigated.removeListener(clearRequests);
    };
  }, [clearRequests]);

  useEffect(() => {
    const initHARLogRequests = async () => {
      const harLog = await getHARLogAsync();
      const requests = harLog.entries.filter(isChromeRequest);
      const networkRequests = await Promise.all(requests.map(mapRequestToNetworkRequest));
      setNetworkRequests(networkRequests);
    };

    if (!isInitializedRef.current) {
      clearRequests();
      initHARLogRequests();
      isInitializedRef.current = true;
    }
  }, [clearRequests, setNetworkRequests, settings.shouldPreserveLog]);

  return <>{children}</>;
};

export const useNetworkRequests = () => {
  const [networkRequests] = useAtom(networkRequestsAtom);
  const [settings, setSettings] = useAtom(networkRequestsSettingsAtom);

  const setShouldPreserveLog = useCallback(
    (shouldPreserveLog: boolean) => {
      setSettings((prev) => ({
        ...prev,
        shouldPreserveLog,
      }));
    },
    [setSettings]
  );

  return { networkRequests, settings, setShouldPreserveLog };
};

const mapRequestToNetworkRequest = async (
  request: chrome.devtools.network.Request
): Promise<NetworkRequest> => {
  const responseBody = await getContentAsync(request);

  return {
    id: nanoid(),
    request: {
      url: request.request.url,
      method: request.request.method,
      headers: mapHeaders(request.request.headers),
      body: request.request.postData?.text ?? null,
    },
    response: {
      headers: mapHeaders(request.response.headers),
      statusCode: request.response.status,
      body: responseBody,
    },
    startDate: new Date(request.startedDateTime),
  };
};

const mapHeaders = (headers: chrome.devtools.network.Request["request"]["headers"]): Headers => {
  return headers.reduce((acc, header) => {
    return {
      ...acc,
      [header.name]: header.value,
    };
  }, {});
};

const isChromeRequest = (
  request: chrome.devtools.network.HAREntry
): request is chrome.devtools.network.Request => {
  return "getContent" in request;
};
