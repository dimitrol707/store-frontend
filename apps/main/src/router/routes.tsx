import { createBrowserRouter } from "react-router";

import { CartPage, LoginPage, MainPage } from "../pages";
import { AppLayout } from "./layouts/AppLayout";
import { AppRoute } from "./routes/AppRoute";

export const router = createBrowserRouter([
  {
    element: <AppRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <MainPage />,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
