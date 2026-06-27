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
    isPending:
      isFetching,
  } =
    useImportLinktree();

  const {
    mutate: importLinks,
    isPending:
      isImporting,
  } =
    useBulkCreateLinks();

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

  const toggleLink = (
    index
  ) => {
    if (
      selected.includes(index)
    ) {
      setSelected(
        selected.filter(
          (i) =>
            i !== index
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
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            w-full
            max-w-2xl
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            p-8
          "
        >
          <h2 className="text-3xl font-black text-white">
            Import From Linktree
          </h2>

          <p className="text-zinc-500 mt-2">
            Migrate your links
            instantly.
          </p>

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
                flex-1
                rounded-2xl
                border
                border-zinc-700
                bg-transparent
                p-4
                text-white
                outline-none
              "
            />

            <button
              onClick={
                handleFetch
              }
              disabled={
                isFetching
              }
              className="
                rounded-2xl
                bg-lime-400
                px-6
                text-black
                font-semibold
              "
            >
              {isFetching
                ? "Fetching..."
                : "Fetch"}
            </button>
          </div>

          {links.length >
            0 && (
            <div className="mt-8 space-y-3 max-h-80 overflow-y-auto">
              {links.map(
                (
                  link,
                  index
                ) => (
                  <button
                    key={index}
                    onClick={() =>
                      toggleLink(
                        index
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-zinc-800
                      p-4
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(
                        index
                      )}
                      readOnly
                    />

                    <img
                      src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=64`}
                      className="w-6 h-6"
                    />

                    <div className="text-left overflow-hidden">
                      <p className="text-white  ">
                        {
                          link.title
                        }
                      </p>

                      <p className="text-zinc-500 text-sm truncate">
                        {
                          link.url
                        }
                      </p>
                    </div>
                  </button>
                )
              )}
            </div>
          )}

          {links.length >
            0 && (
            <button
              onClick={
                handleImport
              }
              disabled={
                isImporting
              }
              className="
                mt-8
                w-full
                rounded-2xl
                bg-lime-400
                py-4
                font-semibold
                text-black
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

export default
  ImportLinktreeModal;