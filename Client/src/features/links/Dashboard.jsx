import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaLink,
  FaTrashRestore,
  FaChartBar,
} from "react-icons/fa";
import { toast } from "sonner";

import { useAuth } from "../auth/useAuth";
import { useLogout } from "../auth/useLogout";

import { useMyLinks } from "./useMyLinks";

import CreateLinkForm from "./CreateLinkForm";
import LinkCard from "./LinkCard";
import EditLinkModal from "./EditLinkModal";
import DeleteLinkModal from "./DeleteLinkModal";

function Dashboard() {
  const { data: authData } = useAuth();
  const { data, isLoading } = useMyLinks();

  const { mutate: logout } = useLogout();

  const [editingLink, setEditingLink] =
    useState(null);

  const [deletingLink, setDeletingLink] =
    useState(null);

  const links = data?.links || [];

  const profileUrl = `/${authData?.user?.username}`;

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${authData?.user?.username}`
    );

    toast.success("Profile URL copied");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">
            LinksHub
          </h1>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/dashboard"
              className="text-lime-400 cursor-pointer"
            >
              Dashboard
            </Link>

            <Link
              to="/dashboard/deleted"
              className="text-zinc-400 hover:text-white transition cursor-pointer"
            >
              Deleted
            </Link>

            <Link
              to="/dashboard/analytics"
              className="text-zinc-400 hover:text-white transition cursor-pointer"
            >
              Analytics
            </Link>

            <Link
              to={profileUrl}
              target="_blank"
              className="text-zinc-400 hover:text-white transition cursor-pointer"
            >
              View Profile
            </Link>

            <button
              onClick={handleCopyProfile}
              className="text-zinc-400 hover:text-white transition cursor-pointer"
            >
              Copy Profile
            </button>

            <button
              onClick={() => logout()}
              className="text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto p-6">
        {/* TOP CARDS */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          {/* TOTAL LINKS */}
          <div
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              hover:border-lime-400
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
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

          {/* PROFILE URL */}
          <button
            onClick={handleCopyProfile}
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              text-left
              hover:border-lime-400
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <p className="text-zinc-500 text-sm">
              Profile URL
            </p>

            <p className="text-white mt-3 font-medium truncate">
              /{authData?.user?.username}
            </p>
          </button>

          {/* DELETED LINKS */}
          <Link
            to="/dashboard/deleted"
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              hover:border-lime-400
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <p className="text-zinc-500 text-sm">
              Deleted Links
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-white text-xl font-bold">
                Manage
              </span>

              <FaTrashRestore className="text-lime-400" />
            </div>
          </Link>

          {/* ANALYTICS */}
          <Link
            to="/dashboard/analytics"
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              hover:border-lime-400
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <p className="text-zinc-500 text-sm">
              Analytics
            </p>

            <div className="flex items-center justify-between mt-3">
              <span className="text-white text-xl font-bold">
                View
              </span>

              <FaChartBar className="text-lime-400" />
            </div>
          </Link>
        </div>

        {/* CREATE LINK */}
        <div className="mb-8">
          <CreateLinkForm />
        </div>

        {/* LINKS */}
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
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
              <p className="text-zinc-400 text-lg">
                No links yet
              </p>

              <p className="text-zinc-600 mt-2">
                Create your first link and start sharing.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {links.map((link) => (
                <LinkCard
                  key={link._id}
                  link={link}
                  onEdit={setEditingLink}
                  onDelete={setDeletingLink}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* MODALS */}
      {editingLink && (
        <EditLinkModal
          link={editingLink}
          onClose={() =>
            setEditingLink(null)
          }
        />
      )}

      {deletingLink && (
        <DeleteLinkModal
          link={deletingLink}
          onClose={() =>
            setDeletingLink(null)
          }
        />
      )}
    </div>
  );
}

export default Dashboard;