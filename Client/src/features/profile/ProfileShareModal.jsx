import {
  AnimatePresence,
  motion,
} from "motion/react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import {
  FaXmark,
  FaLink,
  FaShareNodes,
} from "react-icons/fa6";

function ProfileShareModal({
  profileUrl,
  onClose,
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        profileUrl
      );

      toast.success("Profile link copied");
    } catch {
      toast.error("Unable to copy profile link");
    }
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
            w-full
            max-w-md
            overflow-hidden
            
            border
            border-white/[0.1]
            bg-[#0a0a0a]
            p-6
            shadow-2xl
            sm:p-8
          "
        >
          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              absolute
              right-5
              top-5
              flex
              h-9
              w-9
              items-center
              justify-center
              
              border
              border-white/[0.08]
              text-zinc-500
              transition
              hover:border-white/20
              hover:text-white
            "
            aria-label="Close"
          >
            <FaXmark size={14} />
          </button>

          {/* HEADER */}

          <div className="pr-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
              Share
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Share your profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Anyone with this link can view your
              LinksHub profile.
            </p>
          </div>

          {/* QR */}

          <div className="mt-7 flex justify-center">
            <div className=" bg-white p-4">
              <QRCode
                value={profileUrl}
                size={190}
              />
            </div>
          </div>

          {/* URL */}

          <div className="mt-6 flex items-center gap-3  border border-white/[0.08] bg-white/[0.025] px-4 py-3">
            <FaLink
              className="shrink-0 text-zinc-600"
              size={13}
            />

            <p className="min-w-0 flex-1 truncate text-xs text-zinc-500">
              {profileUrl}
            </p>
          </div>

          {/* ACTIONS */}

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="
                flex
                items-center
                justify-center
                gap-2
                
                border
                border-white/[0.1]
                py-3.5
                text-sm
                font-medium
                text-zinc-300
                transition
                hover:border-white/20
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              <FaLink size={13} />
              Copy
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="
                flex
                items-center
                justify-center
                gap-2
                
                bg-white
                py-3.5
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-zinc-200
                hover:scale-[1.01]
                active:scale-[0.99]
              "
            >
              <FaShareNodes size={13} />
              Share
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProfileShareModal;