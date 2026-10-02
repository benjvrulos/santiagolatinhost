import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ExperienceDetailPage from "../pages/experience-detail/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/experiencia/:id",
    element: <ExperienceDetailPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;