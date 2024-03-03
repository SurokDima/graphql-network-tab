import { nanoid } from "nanoid";

import { GraphQLRequest } from "../types/GraphQLRequest.ts";

export const mockedGraphQLRequests = [
  {
    id: nanoid(),
    type: "query",
    response: {
      statusCode: 200,
    },
    name: "GetUsersQuery",
  },
  {
    id: nanoid(),
    type: "mutation",
    response: {
      statusCode: 500,
    },
    name: "CreateUserMutation",
  },
] satisfies GraphQLRequest[];
