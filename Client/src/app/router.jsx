import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

import Dashboard from "../features/links/Dashboard";
import Analytics from "../features/analytics/Analytics";
import DeletedLinks from "../features/links/DeletedLinks";

import Profile from "../features/profile/Profile";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/:username",
        element: <Profile />,
      },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/analytics",
        element: <Analytics />,
      },
      {
        path: "/dashboard/deleted",
        element: <DeletedLinks />,
      },
    ],
  },
]);