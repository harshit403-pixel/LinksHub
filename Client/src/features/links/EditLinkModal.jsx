import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { useUpdateLink } from "./useUpdateLink";

function EditLinkModal({
  link,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const { mutate, isPending } =
    useUpdateLink();

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url);
    }
  }, [link]);

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        id: link._id,
        payload: {
          title,
          url,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed
          inset-0
          z-[999]
          flex
          items-center
          justify-center

          bg-black/30
          p-4
          backdrop-blur-sm

          dark:bg-black/70
        "
        onClick={onClose}
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
            max-w-lg
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

          <div className="mb-8">
            <h2
              className="
                mb-2
                text-3xl
                font-black
                theme-text
              "
            >
              Edit Link
            </h2>

            <p
              className="
                theme-muted
              "
            >
              Update your link details.
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <Input
              label="Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <Input
              label="URL"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
            />

            {/* ACTIONS */}

            <div className="flex gap-3">
              {/* CANCEL */}

              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  cursor-pointer
                  rounded-2xl

                  border
                  theme-border

                  py-4

                  font-semibold
                  theme-text

                  transition-all
                  duration-200

                  hover:border-[var(--border-hover)]
                  hover:theme-surface-secondary

                  active:scale-[0.98]
                "
              >
                Cancel
              </button>

              {/* SAVE */}

              <Button
                className="flex-4"
                type="submit"
                disabled={
                  isPending ||
                  !title.trim() ||
                  !url.trim()
                }
              >
                {isPending
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EditLinkModal;