import type { PathRouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import Login from "lib/pages/signup";

export const routes: Array<PathRouteProps> = [
  {
    path: "/signup/:referralAddress",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
