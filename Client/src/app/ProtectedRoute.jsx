import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/useAuth";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          theme-bg
          theme-text
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

  if (!data?.user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;