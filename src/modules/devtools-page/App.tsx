import { CssBaseline } from "@mui/joy";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { GraphQLRequestRulesBrowser } from "./features/GraphQLRequestRulesBrowser";
import { GraphQLRequestsBrowser } from "./features/GraphQLRequestsBrowser";
import { MainLayout } from "./layouts/MainLayout";

const router = createMemoryRouter(
  [
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <GraphQLRequestsBrowser /> },
        { path: "/rules", element: <GraphQLRequestRulesBrowser /> },
        { path: "/rules/:ruleId", element: <div>Rule</div> },
      ],
    },
  ],
  {
    initialEntries: ["/"],
    initialIndex: 0,
  }
);

// TODO Fix list horizontal overflow
// TODO Change Table header height
// TODO Add adaptivity for a tabs list
function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
