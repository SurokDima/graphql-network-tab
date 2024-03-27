import { nanoid } from "nanoid";
import { useCallback, useEffect } from "react";

import { chromeProvider, getContentAsync, getHARLogAsync } from "../services/chrome-provider";
import { Headers, NetworkRequest } from "../types/network-request";

export const useNetworkRequestsMonitor = ({
  onNewRequest,
  onInit,
}: {
  onNewRequest: (networkRequest: NetworkRequest) => void;
  onInit: (networkRequests: NetworkRequest[]) => void;
}) => {
  const handleNewRequest = useCallback(
    async (chromeRequest: chrome.devtools.network.Request) => {
      const networkRequest = await mapRequestToNetworkRequest(chromeRequest);
      onNewRequest(networkRequest);
    },
    // We don't wanna make a user add memorize `onNewRequest`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    chromeProvider.devtools.network.onRequestFinished.addListener(handleNewRequest);

    return () => {
      chromeProvider.devtools.network.onRequestFinished.removeListener(handleNewRequest);
    };
  }, [handleNewRequest]);

  useEffect(() => {
    getHARLogAsync().then((harLog) => {
      const requests = harLog.entries.filter(isChromeRequest);
      Promise.all(requests.map(mapRequestToNetworkRequest)).then(onInit);
    });
    // We don't wanna make a user add memorize `onInit`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
