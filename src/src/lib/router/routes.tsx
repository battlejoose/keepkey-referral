import type { PathRouteProps } from "react-router-dom";

import Home from "lib/pages/home";
import Login from "lib/pages/login";

export const routes: Array<PathRouteProps> = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [];
