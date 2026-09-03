import { AnimatePresence, motion } from "motion/react";

import { useDeleteProject } from "./knowledge.hooks";

function DeleteProjectModal({
  project,
  onClose,
  onConfirm,
  title = "Delete Project",
  description = "This project will be permanently removed from your library.",
  confirmText = "Delete",
}) {
  const { mutate, isPending } =
    useDeleteProject();

  const handleDelete = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }

    mutate(project._id, {
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
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-4
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
            transition-colors
            duration-250
          "
        >
          <div className="mb-8">
            <h2
              className="
                text-3xl
                font-black
                theme-text
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-3
                theme-muted
              "
            >
              {description}
            </p>
          </div>

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
              {project.title}
            </h3>

            <p
              className="
                mt-2
                text-sm
                theme-muted
              "
            >
              {project.summary}
            </p>
          </div>

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
                flex-1
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
                ? "Deleting..."
                : confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DeleteProjectModal;