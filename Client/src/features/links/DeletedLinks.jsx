import { FaTrash, FaUndo } from "react-icons/fa";

import { useDeletedLinks } from "./useDeletedLinks";
import { useRestoreLink } from "./useRestoreLink";
import { usePurgeLink } from "./usePurgeLink";
import { useState } from "react";
import DeleteLinkModal from "./DeleteLinkModal";

function DeletedLinks() {
  const [deletingLink, setDeletingLink] =
    useState(null);

  const { data, isLoading } =
    useDeletedLinks();

  const { mutate: restore } =
    useRestoreLink();

  const { mutate: purge } =
    usePurgeLink();

  const links = data?.links || [];

  return (
    <div
      className="
        min-h-screen
        theme-bg
        theme-text
        p-6
        transition-colors
        duration-250
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <h1
          className="
            mb-2
            text-4xl
            font-black
            theme-text
          "
        >
          Deleted Links
        </h1>

        <p
          className="
            mb-8
            theme-muted
          "
        >
          Restore accidentally deleted links or
          permanently remove them.
        </p>

        {/* LOADING */}

        {isLoading ? (
          <p className="theme-muted">
            Loading...
          </p>
        ) : links.length === 0 ? (

          /* EMPTY STATE */

          <div
            className="
              rounded-3xl
              border
              theme-border
              theme-surface
              p-10
              text-center

              transition-colors
              duration-250
            "
          >
            <p className="theme-muted">
              No deleted links.
            </p>
          </div>

        ) : (

          /* LINKS */

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {links.map((link) => (
              <div
                key={link._id}
                className="
                  rounded-3xl
                  border
                  theme-border
                  theme-surface
                  p-6

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[var(--danger)]
                "
              >
                {/* TITLE */}

                <h3
                  className="
                    text-xl
                    font-semibold
                    theme-text
                  "
                >
                  {link.title}
                </h3>

                {/* URL */}

                <p
                  className="
                    mt-2
                    break-all
                    text-sm
                    theme-muted
                  "
                >
                  {link.url}
                </p>

                {/* DELETED DATE */}

                <p
                  className="
                    mt-4
                    text-xs
                    theme-muted
                    opacity-70
                  "
                >
                  Deleted:{" "}
                  {new Date(
                    link.deletedAt
                  ).toLocaleDateString()}
                </p>

                {/* ACTIONS */}

                <div className="mt-6 flex gap-3">

                  {/* RESTORE */}

                  <button
                    type="button"
                    onClick={() =>
                      restore(link._id)
                    }
                    className="
                      flex-1
                      cursor-pointer
                      rounded-xl

                      bg-[var(--accent)]
                      text-[var(--accent-foreground)]

                      py-3
                      font-medium

                      transition-all
                      duration-200

                      hover:bg-[var(--accent-hover)]
                      hover:scale-[1.01]

                      active:scale-[0.98]
                    "
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FaUndo />
                      Restore
                    </span>
                  </button>

                  {/* DELETE FOREVER */}

                  <button
                    type="button"
                    onClick={() =>
                      setDeletingLink(link)
                    }
                    className="
                      cursor-pointer
                      rounded-xl

                      border
                      border-[var(--danger)]

                      px-4

                      text-[var(--danger)]

                      transition-all
                      duration-200

                      hover:bg-[var(--danger)]
                      hover:text-white

                      active:scale-[0.98]
                    "
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE MODAL */}

      {deletingLink && (
        <DeleteLinkModal
          link={deletingLink}
          onClose={() =>
            setDeletingLink(null)
          }
          onConfirm={() => {
            purge(deletingLink._id);
            setDeletingLink(null);
          }}
          title="Permanently Delete"
          description="This action cannot be undone. The link will be permanently removed from the database."
          confirmText="Delete Forever"
        />
      )}
    </div>
  );
}

export default DeletedLinks;