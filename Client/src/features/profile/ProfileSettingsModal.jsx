import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { useUpdateProfile } from "../auth/useUpdateProfile";

function ProfileSettingsModal({
  user,
  onClose,
}) {

  const [theme, setTheme] =
  useState("lime");
  const [displayName, setDisplayName] =
    useState("");

  const [bio, setBio] =
    useState("");

  const { mutate, isPending } =
    useUpdateProfile();

  useEffect(() => {
    if (user) {
      setDisplayName(
        user.displayName || ""
      );

      setBio(user.bio || "");
      setTheme(
  user.theme || "lime"
);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

   mutate(
  {
    displayName,
    bio,
    theme,
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
            max-w-lg
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            p-8
          "
        >
          <h2 className="text-3xl font-black text-white mb-2">
            Profile Settings
          </h2>

          <p className="text-zinc-500 mb-8">
            Customize your public profile.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <Input
              label="Display Name"
              value={displayName}
              onChange={(e) =>
                setDisplayName(
                  e.target.value
                )
              }
            />

            <div>
              <label className="text-zinc-500 text-sm">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(
                    e.target.value
                  )
                }
                rows={4}
                maxLength={150}
                className="
                  mt-2
                  w-full
                  rounded-2xl
                  border
                  border-zinc-700
                  bg-transparent
                  p-4
                  text-white
                  outline-none
                  focus:border-lime-400
                  resize-none
                "
              />
            </div>
            <div>
  <p className="text-zinc-500 mb-3">
    Theme
  </p>

  <div className="flex gap-3">
    {[
      "lime",
      "blue",
      "purple",
      "rose",
    ].map((color) => (
      <button
        key={color}
        type="button"
        onClick={() =>
          setTheme(color)
        }
        className={`
          w-10
          h-10
          rounded-full
          border-2
          ${
            theme === color
              ? "border-white"
              : "border-transparent"
          }

          ${
            color === "lime"
              ? "bg-lime-400"
              : color === "blue"
              ? "bg-blue-500"
              : color === "purple"
              ? "bg-purple-500"
              : "bg-rose-500"
          }
        `}
      />
    ))}
  </div>
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
                "
              >
                Cancel
              </button>

              <Button
                type="submit"
                disabled={isPending}
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

export default ProfileSettingsModal;