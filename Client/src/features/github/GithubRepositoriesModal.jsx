import { AnimatePresence, motion } from "motion/react";
import GithubRepositories from "./GithubRepositories";

function GithubRepositoriesModal({
  open,
  onClose,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-stretch
            justify-stretch
            bg-black/70
            backdrop-blur-sm
            p-0
            sm:items-center
            sm:justify-center
            sm:p-4
          "
        >
          <motion.div
  initial={{
    opacity: 0,
    scale: 0.96,
    y: 20,
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  exit={{
    opacity: 0,
    scale: 0.96,
    y: 20,
  }}
  transition={{
    duration: 0.2,
  }}
  onClick={(e) => e.stopPropagation()}
  className="
    flex
    h-full
    w-full
    flex-col
    overflow-hidden
    bg-black
    sm:h-[92vh]
    sm:max-h-[92vh]

    sm:max-w-4xl
    sm:rounded-3xl
    sm:border
    sm:border-zinc-800

    lg:max-w-6xl
  "
>


<div className="flex min-h-0 flex-1 flex-col overflow-hidden p-4 sm:p-6 lg:p-8">
  <GithubRepositories />
</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GithubRepositoriesModal;
