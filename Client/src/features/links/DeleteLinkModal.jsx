import { motion, AnimatePresence } from "motion/react";

import { useDeleteLink } from "./useDeleteLink";
import { FaTimesCircle } from "react-icons/fa";

function DeleteLinkModal({
  link,
  onClose,
  onConfirm,
  title = "Delete Link",
  description = "This link will be moved to deleted links and can be restored later.",
  confirmText = "Delete",
}) {
  const { mutate, isPending } =
    useDeleteLink();

  const handleDelete = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    mutate(link._id, {
      onSuccess: () => {
        onClose();
      },
    });
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
            max-w-md
            rounded-3xl

            border
            theme-border
            theme-surface

            p-8

            shadow-2xl
            shadow-black/10

            dark:shadow-black/40

            transition-colors
            duration-250
          "
        >
          {/* HEADER */}

          <div className="mb-8">
            <div className="mb-5 flex items-center gap-3">
              {/* DELETE ICON */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full

                  bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]
                  text-[var(--danger)]
                "
              >
                <FaTimesCircle size={20} />
              </div>

              <h2
                className="
                  text-3xl
                  font-black
                  theme-text
                "
              >
                {title}
              </h2>
            </div>

            <p
              className="
                mt-3
                theme-muted
              "
            >
              {description}
            </p>
          </div>

          {/* LINK PREVIEW */}

          <div
            className="
              mb-8
              rounded-2xl

              border
              theme-border
              theme-surface-secondary

              p-4

              transition-colors
              duration-250
            "
          >
            <h3
              className="
                font-semibold
                theme-text
              "
            >
              {link.title}
            </h3>

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
          </div>

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
                hover:bg-[var(--surface-secondary)]

                active:scale-[0.98]
              "
            >
              Cancel
            </button>

            {/* DELETE */}

            <button
              type="button"
              disabled={isPending}
              onClick={handleDelete}
              className="
                flex-4
                cursor-pointer
                rounded-2xl

                bg-[var(--danger)]

                py-4

                font-semibold
                text-white

                transition-all
                duration-200

                hover:opacity-90
                hover:scale-[1.01]

                active:scale-[0.98]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isPending
                ? "Processing..."
                : confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DeleteLinkModal;