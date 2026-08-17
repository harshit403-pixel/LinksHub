import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "motion/react";

import { toast } from "sonner";

import {
  useImportLinktree,
} from "./useImportLinktree";

import {
  useBulkCreateLinks,
} from "./useBulkCreateLinks";

function ImportLinktreeModal({
  onClose,
}) {
  const [url, setUrl] =
    useState("");

  const [links, setLinks] =
    useState([]);

  const [selected, setSelected] =
    useState([]);

  const {
    mutate: fetchLinks,
    isPending: isFetching,
  } = useImportLinktree();

  const {
    mutate: importLinks,
    isPending: isImporting,
  } = useBulkCreateLinks();

  const handleFetch = () => {
    fetchLinks(url, {
      onSuccess: (data) => {
        setLinks(data.links);

        setSelected(
          data.links.map(
            (_, i) => i
          )
        );
      },
    });
  };

  const toggleLink = (index) => {
    if (selected.includes(index)) {
      setSelected(
        selected.filter(
          (i) => i !== index
        )
      );
    } else {
      setSelected([
        ...selected,
        index,
      ]);
    }
  };

  const handleImport = () => {
    const selectedLinks =
      links.filter((_, index) =>
        selected.includes(index)
      );

    if (
      selectedLinks.length === 0
    ) {
      toast.error(
        "Please select at least one link."
      );

      return;
    }

    importLinks(
      selectedLinks,
      {
        onSuccess: (data) => {
          const {
            imported,
            skipped,
          } = data;

          if (
            imported === 0 &&
            skipped > 0
          ) {
            toast.info(
              "Nothing to import. All selected links already exist."
            );

            return;
          }

          if (
            imported > 0 &&
            skipped > 0
          ) {
            toast.success(
              `Imported ${imported} links • Skipped ${skipped} duplicates`
            );

            onClose();
            return;
          }

          if (imported > 0) {
            toast.success(
              `Imported ${imported} links successfully`
            );

            onClose();
          }
        },
      }
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[1000]

          flex
          items-center
          justify-center

          bg-black/30
          p-4
          backdrop-blur-sm

          dark:bg-black/70
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            w-full
            max-w-2xl
            rounded-3xl

            border
            theme-border
            theme-surface

            p-8

            shadow-2xl
            shadow-black/10

            transition-colors
            duration-250

            dark:shadow-black/40
          "
        >
          {/* HEADER */}

          <h2
            className="
              text-3xl
              font-black
              theme-text
            "
          >
            Import From Linktree
          </h2>

          <p
            className="
              mt-2
              theme-muted
            "
          >
            Migrate your links
            instantly.
          </p>

          {/* URL INPUT */}

          <div className="mt-8 flex gap-3">
            <input
              value={url}
              onChange={(e) =>
                setUrl(
                  e.target.value
                )
              }
              placeholder="https://linktr.ee/username"
              className="
                min-w-0
                flex-1

                rounded-2xl
                border
                theme-border
                theme-surface-secondary

                p-4

                theme-text
                outline-none

                transition-all

                placeholder:opacity-50

                focus:border-[var(--accent)]
              "
            />

            <button
              type="button"
              onClick={handleFetch}
              disabled={
                isFetching ||
                !url.trim()
              }
              className="
                shrink-0
                cursor-pointer

                rounded-2xl
                theme-accent-bg

                px-6

                font-semibold

                transition-all

                hover:opacity-90
                hover:scale-[1.01]

                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isFetching
                ? "Fetching..."
                : "Fetch"}
            </button>
          </div>

          {/* LINKS */}

          {links.length > 0 && (
            <div
              className="
                mt-8
                max-h-80
                space-y-3
                overflow-y-auto
                pr-1
              "
            >
              {links.map(
                (
                  link,
                  index
                ) => {
                  const isSelected =
                    selected.includes(
                      index
                    );

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        toggleLink(
                          index
                        )
                      }
                      className={`
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        gap-4

                        rounded-2xl
                        border

                        p-4

                        text-left
                        transition-all

                        ${
                          isSelected
                            ? `
                              border-[var(--accent)]
                              bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]
                            `
                            : `
                              theme-border
                              theme-surface-secondary

                              hover:border-[var(--border-hover)]
                            `
                        }
                      `}
                    >
                      {/* CHECKBOX */}

                      <input
                        type="checkbox"
                        checked={
                          isSelected
                        }
                        readOnly
                        className="
                          h-4
                          w-4
                          shrink-0

                          accent-[var(--accent)]
                        "
                      />

                      {/* FAVICON */}

                      <img
                        src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
                        alt=""
                        className="
                          h-6
                          w-6
                          shrink-0
                          rounded-md
                        "
                      />

                      {/* LINK INFO */}

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            font-semibold
                            theme-text
                          "
                        >
                          {link.title}
                        </p>

                        <p
                          className="
                            mt-1
                            truncate
                            text-sm
                            theme-muted
                          "
                        >
                          {link.url}
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          )}

          {/* IMPORT BUTTON */}

          {links.length > 0 && (
            <button
              type="button"
              onClick={handleImport}
              disabled={
                isImporting ||
                selected.length === 0
              }
              className="
                mt-8
                w-full
                cursor-pointer

                rounded-2xl
                theme-accent-bg

                py-4

                font-semibold

                transition-all

                hover:opacity-90
                hover:scale-[1.01]

                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isImporting
                ? "Importing..."
                : `Import ${selected.length} Links`}
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ImportLinktreeModal;