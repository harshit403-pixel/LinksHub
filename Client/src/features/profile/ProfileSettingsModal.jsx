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

  const [theme, setTheme] = useState("lime");
  const [displayName, setDisplayName] =
    useState("");
  const [bio, setBio] = useState("");

  const { mutate, isPending } =
    useUpdateProfile();

  useEffect(() => {
    if (!user) return;

    setDisplayName(user.displayName || "");
    setBio(user.bio || "");
    setTheme(user.theme || "lime");
  }, [user]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

  const themeColors = {
    lime: "bg-lime-400",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    rose: "bg-rose-500",
  };

  return (
    <AnimatePresence>
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
          items-center
          justify-center
          bg-black/75
          p-4
          backdrop-blur-md
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
            relative
            max-h-[90vh]
            w-full
            max-w-lg
            overflow-y-auto
            rounded-[28px]
            border
            border-white/[0.1]
            bg-[#0a0a0a]
            p-6
            shadow-2xl
            sm:p-8
          "
        >
          {/* HEADER */}

          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              Profile
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Profile settings
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Customize how your public profile looks.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >
            {/* PROFILE PICTURE */}

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-zinc-600">
                Profile picture
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

              {isUploading && (
                <p className="mt-2 text-xs text-zinc-600">
                  Uploading picture...
                </p>
              )}
            </div>

            {/* DISPLAY NAME */}

            <Input
              label="Display Name"
              value={displayName}
              onChange={(e) =>
                setDisplayName(e.target.value)
              }
            />

            {/* BIO */}

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-zinc-600">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                rows={5}
                maxLength={150}
                placeholder="Tell people a little about yourself..."
                className="
                  mt-2
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-white/[0.1]
                  bg-white/[0.025]
                  p-4
                  text-sm
                  leading-6
                  text-white
                  outline-none
                  transition
                  placeholder:text-zinc-700
                  focus:border-white/25
                "
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-zinc-700">
                  {bio.length}/150
                </span>
              </div>

              {/* AI BIO */}

              <button
                type="button"
                onClick={() =>
                  setShowAIModal(true)
                }
                className="
                  mt-3
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.1]
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-zinc-400
                  transition
                  hover:border-white/20
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                <span>✦</span>
                Generate with AI
              </button>
            </div>

            {/* THEME */}

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.15em] text-zinc-600">
                Accent
              </p>

              <div className="flex gap-3">
                {Object.entries(themeColors).map(
                  ([color, bg]) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setTheme(color)
                      }
                      aria-label={`Use ${color} accent`}
                      className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition
                        ${bg}

                        ${
                          theme === color
                            ? "border-white"
                            : "border-transparent"
                        }
                      `}
                    >
                      {theme === color && (
                        <span className="h-2 w-2 rounded-full bg-black" />
                      )}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* ACTIONS */}

            <div className="flex gap-3 border-t border-white/[0.08] pt-6">
              <button
                type="button"
                onClick={onClose}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-white/[0.1]
                  py-3.5
                  text-sm
                  font-medium
                  text-zinc-400
                  transition
                  hover:border-white/20
                  hover:bg-white/[0.03]
                  hover:text-white
                "
              >
                Cancel
              </button>

              <Button
                className="flex-1"
                type="submit"
                disabled={
                  isPending || isUploading
                }
              >
                {isPending
                  ? "Saving..."
                  : "Save changes"}
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