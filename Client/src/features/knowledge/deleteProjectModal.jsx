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
            border-zinc-800
            bg-zinc-900
            p-8
          "
        >
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">
              {title}
            </h2>

            <p className="mt-3 text-zinc-500">
              {description}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-black/30 p-4 mb-8">
            <h3 className="text-white font-semibold">
              {project.title}
            </h3>

            <p className="text-zinc-500 text-sm mt-2">
              {project.summary}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-2xl
                border
                border-zinc-700
                py-4
                text-white
                font-semibold
                hover:border-zinc-500
                transition-all
                cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              disabled={isPending}
              onClick={handleDelete}
              className="
                flex-1
                rounded-2xl
                bg-red-500
                py-4
                text-white
                font-semibold
                transition-all
                hover:bg-red-400
                hover:scale-[1.01]
                active:scale-[0.98]
                disabled:opacity-50
                cursor-pointer
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