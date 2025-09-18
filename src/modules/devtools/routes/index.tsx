import { RouteObject } from "react-router";

import { MainLayout } from "../layouts/MainLayout";
import { GraphQLRequestsListPage } from "../pages/GraphQLRequestsListPage";
import { RulesListPage } from "../pages/RulesListPage";

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <GraphQLRequestsListPage /> },
      { path: "/rules", element: <RulesListPage /> },
      { path: "/rules/:ruleId", element: <div>Rule</div> },
    ],
  },
];
