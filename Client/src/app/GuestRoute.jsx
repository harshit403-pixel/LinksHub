import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/useAuth";

function GuestRoute({ children }) {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="
          theme-bg
          theme-text
          flex
          min-h-screen
          items-center
          justify-center
          transition-colors
          duration-250
        "
      >
        <p className="theme-muted">
          Loading...
        </p>
      </div>
    );
  }

  if (data?.user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default GuestRoute;