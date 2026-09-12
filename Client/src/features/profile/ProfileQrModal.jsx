import { AnimatePresence, motion } from "motion/react";
import QRCode from "react-qr-code";
import { FaXmark, FaDownload } from "react-icons/fa6";

function ProfileQrModal({ profileUrl, onClose }) {
  const handleDownload = () => {
    const svg = document.getElementById("profile-qr");

    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "linkshub-profile-qr.svg";
    link.click();

    URL.revokeObjectURL(url);
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
          bg-black/80
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
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-full
            max-w-sm
            rounded-[28px]
            border
            border-white/[0.1]
            bg-[#0a0a0a]
            p-6
            text-center
            shadow-2xl
            sm:p-8
          "
        >
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
              rounded-full
              border
              border-white/[0.08]
              text-zinc-600
              transition
              hover:border-white/20
              hover:text-white
            "
            aria-label="Close"
          >
            <FaXmark size={14} />
          </button>

          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
            LinksHub
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Scan my profile
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Open this profile on your phone.
          </p>

          <div className="mx-auto mt-7 flex w-fit rounded-3xl bg-white p-5">
            <QRCode
              id="profile-qr"
              value={profileUrl}
              size={190}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>

          <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3">
            <p className="truncate text-xs text-zinc-500">
              {profileUrl}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="
              mt-4
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              py-3.5
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-zinc-200
            "
          >
            <FaDownload size={13} />
            Download QR
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProfileQrModal;