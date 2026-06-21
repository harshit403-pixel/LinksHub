import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/useAuth";

function GuestRoute({ children }) {
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