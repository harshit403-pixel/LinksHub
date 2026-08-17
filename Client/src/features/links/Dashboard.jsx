import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaFileImport,
  FaChartBar,
  FaUserCog,
  FaQrcode,
} from "react-icons/fa";

import { toast } from "sonner";
import { Reorder } from "motion/react";

import { useReorderLinks } from "./useReorderLinks";

import ProfileSettingsModal from "../profile/ProfileSettingsModal";
import ProfileQrModal from "../profile/ProfileQrModal";
import ImportLinktreeModal from "./ImportLinktreeModal.jsx";

import { useAuth } from "../auth/useAuth";
import { useMyLinks } from "./useMyLinks";

import CreateLinkForm from "./CreateLinkForm";
import LinkCard from "./LinkCard";
import EditLinkModal from "./EditLinkModal";
import DeleteLinkModal from "./DeleteLinkModal";

function Dashboard() {
  const [
    importModalOpen,
    setImportModalOpen,
  ] = useState(false);

  const { data: authData } = useAuth();
  const { data, isLoading } = useMyLinks();

  const [qrOpen, setQrOpen] =
    useState(false);

  const [editingLink, setEditingLink] =
    useState(null);

  const [deletingLink, setDeletingLink] =
    useState(null);

  const [
    profileSettingsOpen,
    setProfileSettingsOpen,
  ] = useState(false);

  const links = data?.links || [];

  const [orderedLinks, setOrderedLinks] =
    useState([]);

  const {
    mutate: reorderLinks,
  } = useReorderLinks();

  useEffect(() => {
    setOrderedLinks(links);
  }, [links]);

  const handleCopyProfile = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/${authData?.user?.username}`
    );

    toast.success("Profile URL copied");
  };

  return (
    <div
      className="
        min-h-screen
        theme-bg
        theme-text
        transition-colors
        duration-250
      "
    >
      <main className="mx-auto max-w-7xl p-6">

        {/* TOP CARDS */}

        <div className="mb-8 grid gap-4 lg:grid-cols-5">

          {/* IMPORT LINKS */}

          <button
            type="button"
            onClick={() =>
              setImportModalOpen(true)
            }
            className="
              cursor-pointer
              rounded-3xl
              border
              theme-border
              theme-surface
              p-6
              text-left

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[var(--accent)]
              hover:shadow-lg
            "
          >
            <p className="text-sm theme-muted">
              Import Links
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span
                className="
                  text-xl
                  font-bold
                  theme-text
                "
              >
                Linktree
              </span>

              <FaFileImport className="theme-accent" />
            </div>
          </button>

          {/* COPY PROFILE URL */}

          <button
            type="button"
            onClick={handleCopyProfile}
            className="
              cursor-pointer
              rounded-3xl
              border
              theme-border
              theme-surface
              p-6
              text-left

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[var(--accent)]
              hover:shadow-lg
            "
          >
            <p className="text-sm theme-muted">
              Copy Profile URL
            </p>

            <p
              className="
                mt-3
                truncate
                font-medium
                theme-text
              "
            >
              /{authData?.user?.username}
            </p>
          </button>

          {/* PROFILE QR */}

          <button
            type="button"
            onClick={() =>
              setQrOpen(true)
            }
            className="
              cursor-pointer
              rounded-3xl
              border
              theme-border
              theme-surface
              p-6
              text-left

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[var(--accent)]
              hover:shadow-lg
            "
          >
            <p className="text-sm theme-muted">
              Profile QR
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span
                className="
                  text-xl
                  font-bold
                  theme-text
                "
              >
                Open
              </span>

              <FaQrcode className="theme-accent" />
            </div>
          </button>

          {/* ANALYTICS */}

          <Link
            to="/dashboard/analytics"
            className="
              cursor-pointer
              rounded-3xl
              border
              theme-border
              theme-surface
              p-6

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[var(--accent)]
              hover:shadow-lg
            "
          >
            <p className="text-sm theme-muted">
              Analytics
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span
                className="
                  text-xl
                  font-bold
                  theme-text
                "
              >
                View
              </span>

              <FaChartBar className="theme-accent" />
            </div>
          </Link>

          {/* PROFILE SETTINGS */}

          <button
            type="button"
            onClick={() =>
              setProfileSettingsOpen(true)
            }
            className="
              cursor-pointer
              rounded-3xl
              border
              theme-border
              theme-surface
              p-6
              text-left

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[var(--accent)]
              hover:shadow-lg
            "
          >
            <p className="text-sm theme-muted">
              Profile Settings
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span
                className="
                  text-xl
                  font-bold
                  theme-text
                "
              >
                Edit
              </span>

              <FaUserCog className="theme-accent" />
            </div>
          </button>
        </div>

        {/* CREATE LINK */}

        <div className="mb-8">
          <CreateLinkForm />
        </div>

        {/* LINKS */}

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="
                text-2xl
                font-bold
                theme-text
              "
            >
              Your Links
            </h2>

            <span className="theme-muted">
              {links.length} links
            </span>
          </div>

          {/* LOADING */}

          {isLoading ? (
            <div className="theme-muted">
              Loading links...
            </div>
          ) : links.length === 0 ? (

            /* EMPTY STATE */

            <div
              className="
                rounded-3xl
                border
                theme-border
                theme-surface
                p-12
                text-center
              "
            >
              <p
                className="
                  text-lg
                  theme-muted
                "
              >
                No links yet
              </p>

              <p
                className="
                  mt-2
                  theme-muted
                  opacity-70
                "
              >
                Create your first link and
                start sharing.
              </p>
            </div>

          ) : (

            /* LINKS */

            <Reorder.Group
              axis="y"
              values={orderedLinks}
              onReorder={(newOrder) => {
                setOrderedLinks(newOrder);

                reorderLinks(
                  newOrder.map(
                    (link, index) => ({
                      id: link._id,
                      order: index + 1,
                    })
                  )
                );
              }}
              className="
                flex
                flex-col
                gap-4
              "
            >
              {orderedLinks.map((link) => (
                <Reorder.Item
                  key={link._id}
                  value={link}
                  className="cursor-grab"
                >
                  <LinkCard
                    link={link}
                    onEdit={setEditingLink}
                    onDelete={setDeletingLink}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
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

      {profileSettingsOpen && (
        <ProfileSettingsModal
          user={authData?.user}
          onClose={() =>
            setProfileSettingsOpen(false)
          }
        />
      )}

      {qrOpen && (
        <ProfileQrModal
          profileUrl={`${window.location.origin}/${authData?.user?.username}`}
          onClose={() =>
            setQrOpen(false)
          }
        />
      )}

      {importModalOpen && (
        <ImportLinktreeModal
          onClose={() =>
            setImportModalOpen(false)
          }
        />
      )}
    </div>
  );
}

export default Dashboard;