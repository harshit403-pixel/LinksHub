import { Link } from "react-router-dom";

import { useAuth } from "../auth/useAuth";
import { useMyLinks } from "./useMyLinks";

import CreateLinkForm from "./CreateLinkForm";
import LinkCard from "./LinkCard";

function Dashboard() {
  const { data: authData } = useAuth();
  const { data, isLoading } = useMyLinks();

  const links = data?.links || [];

  return (
    <div className="min-h-screen bg-black">
      {/* NAVBAR */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-white text-2xl font-black">
            LinksHub
          </h1>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-lime-400"
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/analytics"
              className="text-zinc-400 hover:text-white"
            >
              Analytics
            </Link>

            <span className="text-zinc-500 hover:text-white transition-all cursor-pointer">
              @{authData?.user?.username}
            </span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* STATS */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-500">
              Total Links
            </p>

            <h2 className="text-5xl font-black text-white mt-2">
              {links.length}
            </h2>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2">
            <CreateLinkForm />
          </div>
        </div>

        {/* LINKS */}
        <div className="mt-8">
          <h2 className="text-white text-2xl font-bold mb-6">
            Your Links
          </h2>

          {isLoading ? (
            <p className="text-zinc-500">
              Loading...
            </p>
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
        </div>
      </main>
    </div>
  );
}

export default Dashboard;