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
            p-8
          "
        >
          <h2 className="text-3xl font-black text-white">
            Share Profile
          </h2>

          <p className="text-zinc-500 mt-2">
            Share your LinksHub profile.
          </p>

          <div className="bg-white p-4 rounded-3xl w-fit mx-auto mt-8">
            <QRCode
              value={profileUrl}
              size={220}
            />
          </div>

          <p className="text-zinc-500 text-sm text-center mt-5 break-all">
            {profileUrl}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={handleCopy}
              className="
                rounded-2xl
                border
                border-zinc-700
                py-4
                text-white
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
                font-semibold
                text-black
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