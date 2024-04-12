import { RouteObject } from "react-router";

import { MainLayout } from "../layouts/MainLayout";
import { GraphQLRequestRulesListPage } from "../pages/GraphQLRequestRulesListPage";
import { GraphQLRequestsListPage } from "../pages/GraphQLRequestsListPage";

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <GraphQLRequestsListPage /> },
      { path: "/rules", element: <GraphQLRequestRulesListPage /> },
      { path: "/rules/:ruleId", element: <div>Rule</div> },
    ],
  },
];
