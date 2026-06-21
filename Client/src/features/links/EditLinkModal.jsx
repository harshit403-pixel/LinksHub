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
        className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
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
          className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
        >
          <h2 className="text-3xl font-black text-white mb-2">
            Edit Link
          </h2>

          <p className="text-zinc-500 mb-8">
            Update your link details.
          </p>

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
  "
>
  Cancel
</button>

              <Button
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