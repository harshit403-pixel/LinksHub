import {
  AnimatePresence,
  motion,
} from "motion/react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

function ProfileShareModal({
  profileUrl,
  onClose,
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      profileUrl
    );

    toast.success(
      "Profile link copied"
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My LinksHub Profile",
          url: profileUrl,
        });
      } catch {}
    } else {
      handleCopy();
    }
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
            max-w-md
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            p-5
            sm:p-8
          "
        >
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Share Profile
          </h2>

          <p className="text-zinc-500 mt-2">
            Share your LinksHub profile.
          </p>

          <div className="mx-auto mt-8 w-fit rounded-3xl bg-white p-3 sm:p-4">
            <QRCode
              value={profileUrl}
              size={180}
            />
          </div>

          <p className="text-zinc-500 text-sm text-center mt-5 break-all">
            {profileUrl}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={handleCopy}
              className="
                rounded-2xl
                border
                border-zinc-700
                py-4
                text-sm
                text-white
                sm:text-base
              "
            >
              Copy Link
            </button>

            <button
              onClick={handleShare}
              className="
                rounded-2xl
                bg-lime-400
                py-4
                text-sm
                font-semibold
                text-black
                sm:text-base
              "
            >
              Share
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProfileShareModal;
