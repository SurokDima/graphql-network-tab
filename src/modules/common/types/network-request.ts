export type NetworkRequest = {
  id: string;
  request: {
    url: string;
    headers: Headers;
    method: string;
    body: string | null;
  };
  response: {
    headers: Headers;
    statusCode: number;
    body: string | null;
  };
  startDate: Date;
};

export type Headers = Record<string, string>;

export const isAborted = (networkRequest: NetworkRequest) => {
  return networkRequest.response.statusCode === 0;
};
