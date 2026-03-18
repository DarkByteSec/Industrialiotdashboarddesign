import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { MachineDetails } from "./pages/MachineDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/machine/:id",
    Component: MachineDetails,
  },
]);
