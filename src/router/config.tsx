import type { RouteObject } from "react-router-dom";

import { AppLayout } from "@/components/feature/AppLayout";

import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ExperienceDetailPage from "../pages/experience-detail/page";
import CheckoutPage from "@/pages/checkout/page";

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/experience/:slug",
        element: <ExperienceDetailPage />,
      },
      {
        path: "/checkout/:id",
        element: <CheckoutPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
