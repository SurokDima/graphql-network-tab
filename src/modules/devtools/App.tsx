import { CssBaseline } from "@mui/joy";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { routes } from "./routes";

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
  initialIndex: 0,
});

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
