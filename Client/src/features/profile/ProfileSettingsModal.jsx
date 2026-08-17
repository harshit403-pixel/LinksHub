import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useUploadProfilePicture } from "../auth/useUploadProfilePicture";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import AIBioModal from "./AIBioModal";

import { useUpdateProfile } from "../auth/useUpdateProfile";

function ProfileSettingsModal({
  user,
  onClose,
}) {
  const [showAIModal, setShowAIModal] =
    useState(false);

  const {
    mutate: uploadMutate,
    isPending: isUploading,
  } = useUploadProfilePicture();

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
          flex
          items-center
          justify-center
          bg-black/70
          p-3
          backdrop-blur-sm
          sm:p-4
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

            max-h-[90vh]
            overflow-y-auto

            rounded-3xl
            border
            border-zinc-200
            bg-white

            p-5
            sm:p-8

            dark:border-zinc-800
            dark:bg-zinc-900

            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-zinc-700
          "
        >
          {/* HEADER */}

          <div className="mb-6 sm:mb-8">
            <h2
              className="
                text-2xl
                font-black
                text-zinc-900

                dark:text-white

                sm:text-3xl
              "
            >
              Profile Settings
            </h2>

            <p className="mt-2 text-sm text-zinc-500 sm:text-base">
              Customize your public profile.
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 sm:space-y-8"
          >
            {/* PROFILE PICTURE */}

            <div>
              <label className="mb-2 block text-sm text-zinc-500">
                Profile Picture
              </label>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (file) {
                    uploadMutate(file);
                  }
                }}
              />
            </div>

            {/* DISPLAY NAME */}

            <Input
              label="Display Name"
              value={displayName}
              onChange={(e) =>
                setDisplayName(
                  e.target.value
                )
              }
            />

            {/* BIO */}

            <div>
              <label className="text-sm text-zinc-500">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                rows={4}
                maxLength={150}
                className="
                  mt-2
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-zinc-300
                  bg-transparent
                  p-4
                  text-zinc-900
                  outline-none
                  transition

                  focus:border-black

                  dark:border-zinc-700
                  dark:text-white
                  dark:focus:border-white
                "
              />

           <button
  type="button"
  onClick={() => setShowAIModal(true)}
  className="
    mt-3
    inline-flex
    items-center
    gap-2
    rounded-xl
    border
    border-zinc-300
    bg-zinc-50
    px-4
    py-2
    text-sm
    font-semibold
    text-zinc-900
    transition-all
    duration-200

    hover:border-zinc-900
    hover:bg-zinc-900
    hover:text-white
    hover:scale-[1.02]

    active:scale-[0.98]

    dark:border-zinc-700
    dark:bg-zinc-800
    dark:text-white

    dark:hover:border-white
    dark:hover:bg-white
    dark:hover:text-black
  "
>
  <span className="text-base">✦</span>
  Generate with AI
</button>
            </div>

            {/* THEME */}

            <div>
              <p className="mb-3 text-sm text-zinc-500">
                Theme
              </p>

              <div className="flex flex-wrap gap-3">
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
                      h-10
                      w-10
                      rounded-full
                      border-2
                      transition

                      ${
                        theme === color
                          ? "border-black dark:border-white"
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

            {/* ACTIONS */}

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  rounded-2xl
                  border
                  border-zinc-300
                  py-3.5
                  font-semibold
                  text-zinc-700
                  transition-all

                  hover:border-zinc-400
                  hover:bg-zinc-50

                  dark:border-zinc-700
                  dark:text-white
                  dark:hover:border-zinc-500
                  dark:hover:bg-zinc-800
                "
              >
                Cancel
              </button>

              <Button
                className="flex-1"
                type="submit"
                disabled={
                  isPending ||
                  isUploading
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

      {showAIModal && (
        <AIBioModal
          onClose={() =>
            setShowAIModal(false)
          }
          onSelectBio={(selectedBio) => {
            setBio(selectedBio);
            setShowAIModal(false);
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default ProfileSettingsModal;