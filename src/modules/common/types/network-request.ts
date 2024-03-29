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
    body: string;
  };
};

export type Headers = Record<string, string>;
