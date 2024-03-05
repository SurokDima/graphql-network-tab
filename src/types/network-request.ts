export type NetworkRequest = {
  id: string;
  url: string;
  method: string;
  headers: Headers;
  response: {
    headers: Headers;
    statusCode: number;
  };
};
