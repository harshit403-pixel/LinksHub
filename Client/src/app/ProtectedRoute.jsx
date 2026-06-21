import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/useAuth";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500">
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