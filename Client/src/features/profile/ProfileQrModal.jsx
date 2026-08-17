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
          fixed
          inset-0
          z-[999]
          flex
          items-center
          justify-center
          bg-black/70
          p-4
          backdrop-blur-sm
        "
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
            max-w-md
            rounded-3xl
            border
            border-zinc-200
            bg-white
            p-8
            text-center
            text-zinc-900
            transition-colors
            duration-250

            dark:border-zinc-800
            dark:bg-zinc-900
            dark:text-white
          "
        >
          {/* TITLE */}

          <h2
            className="
              mb-2
              text-3xl
              font-black
              text-zinc-900

              dark:text-white
            "
          >
            Profile QR
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mb-6
              text-zinc-500
            "
          >
            Scan to open profile
          </p>

          {/* QR CODE */}

          <div
            className="
              inline-block
              rounded-2xl
              bg-white
              p-4
              shadow-sm
            "
          >
            <QRCodeCanvas
              value={profileUrl}
              size={240}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          {/* PROFILE URL */}

          <p
            className="
              mt-6
              break-all
              text-sm
              text-zinc-500
            "
          >
            {profileUrl}
          </p>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              mt-6
              w-full
              cursor-pointer
              rounded-2xl
              bg-red-500
              py-3
              font-semibold
              text-white
              transition-all

              hover:bg-red-600
              hover:scale-[1.01]

              active:scale-[0.98]

              dark:bg-lime-400
              dark:text-black
              dark:hover:bg-lime-300
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