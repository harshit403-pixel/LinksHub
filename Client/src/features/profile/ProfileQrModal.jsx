import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "motion/react";

function ProfileQrModal({
  profileUrl,
  onClose,
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="
          fixed inset-0 z-[999]
          bg-black/70
          backdrop-blur-sm
          flex items-center justify-center
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
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-8
            text-center
          "
        >
          <h2 className="text-3xl font-black text-white mb-2">
            Profile QR
          </h2>

          <p className="text-zinc-500 mb-6">
            Scan to open profile
          </p>

          <div className="bg-white rounded-2xl p-4 inline-block">
            <QRCodeCanvas
              value={profileUrl}
              size={240}
            />
          </div>

          <p className="text-zinc-500 mt-6 text-sm break-all">
            {profileUrl}
          </p>

          <button
            onClick={onClose}
            className="
              mt-6
              w-full
              rounded-2xl
              bg-lime-400
              py-3
              text-black
              font-semibold
            "
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProfileQrModal;