import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

import Dashboard from "../features/links/Dashboard";
import Analytics from "../features/analytics/Analytics";

import Profile from "../features/profile/Profile";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/:username",
        element: <Profile />,
      },
    ],
  },

  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/analytics",
        element: <Analytics />,
      },
    ],
  },
]);