import { Link } from "react-router-dom";
import { FaLink, FaTrashRestore, FaChartBar } from "react-icons/fa";

import { useAuth } from "../auth/useAuth";
import { useMyLinks } from "./useMyLinks";

import CreateLinkForm from "./CreateLinkForm";
import LinkCard from "./LinkCard";

function Dashboard() {
  const { data: authData } = useAuth();
  const { data, isLoading } = useMyLinks();

  const links = data?.links || [];

  const profileUrl = `/${authData?.user?.username}`;

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">
            LinksHub
          </h1>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/dashboard"
              className="text-lime-400"
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/deleted"
              className="text-zinc-400 hover:text-white transition"
            >
              Deleted
            </Link>

            <Link
              to="/dashboard/analytics"
              className="text-zinc-400 hover:text-white transition"
            >
              Analytics
            </Link>

            <Link
              to={profileUrl}
              target="_blank"
              className="text-zinc-400 hover:text-white transition"
            >
              View Profile
            </Link>

            <span className="text-zinc-500">
              @{authData?.user?.username}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Top Cards */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500 text-sm">
              Total Links
            </p>

            <div className="flex items-center justify-between mt-3">
              <h2 className="text-4xl font-black text-white">
                {links.length}
              </h2>

              <FaLink className="text-lime-400 text-xl" />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500 text-sm">
              Profile URL
            </p>

            <p className="text-white mt-3 font-medium truncate">
              /{authData?.user?.username}
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500 text-sm">
              Deleted Links
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-white text-xl font-bold">
                Manage
              </span>

              <FaTrashRestore className="text-lime-400" />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500 text-sm">
              Analytics
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-white text-xl font-bold">
                View
              </span>

              <FaChartBar className="text-lime-400" />
            </div>
          </div>
        </div>

        {/* Create Link */}
        <div className="mb-8">
          <CreateLinkForm />
        </div>

        {/* Links */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">
              Your Links
            </h2>

            <span className="text-zinc-500">
              {links.length} links
            </span>
          </div>

          {isLoading ? (
            <div className="text-zinc-500">
              Loading links...
            </div>
          ) : links.length === 0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
              <p className="text-zinc-500">
                No links created yet.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {links.map((link) => (
                <LinkCard
                  key={link._id}
                  link={link}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;