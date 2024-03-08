import { nanoid } from "nanoid";

import { GraphQLRequest } from "../types/graphql-request.ts";

export const mockedGraphQLRequests = [
  {
    id: nanoid(),
    type: "query",
    rawGraphQL:
      "query GetUsersQuery($limit: Int, $offset: Int) { users(limit: $limit, offset: $offset) { id name } }",
    rawVariables: JSON.stringify({
      limit: 10,
      offset: 0,
    }),
    networkRequest: {
      id: nanoid(),
      url: "https://api.example.com/graphql",
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer 123",
        "Content-Type": "application/json",
      }),
      response: {
        headers: new Headers({
          "Content-Type": "application/json",
          "Set-Cookie":
            "session=abc123; Expires=Wed, 09 Jun 2021 10:18:14 GMT; Path=/; Secure; HttpOnly; SameSite=None",
        }),
        statusCode: 200,
        body: JSON.stringify({
          data: {
            users: [
              {
                id: "1",
                name: "John Doe",
              },
              {
                id: "2",
                name: "Jane Doe",
              },
            ],
          },
        }),
      },
    },
    name: "GetUsersQuery",
  },
  {
    id: nanoid(),
    type: "mutation",
    rawGraphQL: "mutation CreateUserMutation { createUser { id name } }",
    rawVariables: "{}",
    networkRequest: {
      id: nanoid(),
      url: "https://api.example.com/graphql",
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer 123",
        "Content-Type": "application/json",
      }),
      response: {
        headers: new Headers({
          "Content-Type": "application/json",
          "Set-Cookie":
            "session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c; Path=/; Expires=Wed, 09 Jun 2021 10:18:14 GMT; HttpOnly; Secure; SameSite=Strict",
        }),
        statusCode: 500,
        body: JSON.stringify({
          errors: [
            {
              message: "Internal server error",
            },
          ],
        }),
      },
    },
    name: "CreateUserMutation",
  },
] satisfies GraphQLRequest[];
