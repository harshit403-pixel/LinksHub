import { Link } from "react-router-dom";

import { useAuth } from "../../features/auth/useAuth";
import { useLogout } from "../../features/auth/useLogout";

function DashboardNavbar() {
  const { data: authData } = useAuth();

  const { mutate: logout } = useLogout();

  const profileUrl = `/${authData?.user?.username}`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-black text-white">
            LinksHub
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm">
            <Link
              to="/dashboard"
              className="text-zinc-400 hover:text-white transition"
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/library"
              className="text-zinc-400 hover:text-white transition"
            >
              Library
            </Link>

            <Link
              to="/dashboard/analytics"
              className="text-zinc-400 hover:text-white transition"
            >
              Analytics
            </Link>

            <Link
              to="/dashboard/deleted"
              className="text-zinc-400 hover:text-white transition"
            >
              Deleted
            </Link>

            <Link
              to={profileUrl}
              target="_blank"
              className="text-zinc-400 hover:text-white transition"
            >
              View Profile
            </Link>

            <button
              onClick={() => logout()}
              className="text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;