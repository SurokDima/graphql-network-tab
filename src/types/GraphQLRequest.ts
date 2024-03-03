export type GraphQLRequest = {
  id: string;
  name: string;
  type: "query" | "mutation";
  response: {
    statusCode: number;
  };
};
