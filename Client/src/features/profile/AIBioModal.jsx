import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
  
  useEffect,
} from "react";
import {useGenerateBio} from '../ai/useGenerateBio.js'



function AIBioModal({
  onClose,
  onSelectBio,
}) {

    useEffect(() => {
  document.body.style.overflow =
    "hidden";

  return () => {
    document.body.style.overflow =
      "auto";
  };
}, []);
  const [profession, setProfession] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [tone, setTone] =
    useState("Professional");

  const [bios, setBios] =
    useState([]);
const [toneOpen, setToneOpen] = useState(false);
  const {
    mutate,
    isPending,
  } = useGenerateBio();

  const handleGenerate = () => {
    mutate(
      {
        profession,
        skills,
        tone,
      },
      {
        onSuccess: (data) => {
          setBios(data.bios);
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
          onClick={(e) =>
            e.stopPropagation()
          }
          className="
  w-full
  max-w-2xl
  max-h-[85vh]
  rounded-3xl
  border
  border-zinc-800
  bg-zinc-900
  p-8
  overflow-y-auto
"
        >
          <h2 className="text-3xl font-black text-white">
            AI Bio Generator
          </h2>

          <p className="text-zinc-500 mt-2 mb-8">
            Let AI write your profile bio.
          </p>

          <div className="space-y-6">
            <Input
              label="Profession (Web Developer)"
              value={profession}
              onChange={(e) =>
                setProfession(
                  e.target.value
                )
              }
             
            />

            <Input
              label="Skills (React, Node.js, UI Design)"
              value={skills}
              onChange={(e) =>
                setSkills(
                  e.target.value
                )
              }
             
            />

 <div className="relative">
  <label className="text-sm theme-muted">
    Tone
  </label>

  <div className="relative mt-2">
    <button
      type="button"
      onClick={() =>
        setToneOpen((prev) => !prev)
      }
      className="
        flex
        w-full
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        theme-border
        theme-surface-secondary
        px-4
        py-4
        text-left
        text-sm
        theme-text
        transition
        hover:border-[var(--border-hover)]
        focus:border-[var(--accent)]
        focus:outline-none
      "
    >
      <span>{tone}</span>

      <svg
        className={`
          h-4
          w-4
          shrink-0
          theme-muted
          transition-transform
          duration-200
          ${toneOpen ? "rotate-180" : ""}
        `}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="m6 9 6 6 6-6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>

    <AnimatePresence>
      {toneOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: -6,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -6,
            scale: 0.98,
          }}
          transition={{
            duration: 0.15,
          }}
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-2
            overflow-hidden
            rounded-2xl
            border
            theme-border
            theme-surface
            p-1.5
            shadow-2xl
            shadow-black/10
            dark:shadow-black/50
          "
        >
          {[
            "Professional",
            "Creative",
            "Minimal",
            "Funny",
          ].map((option) => {
            const isSelected =
              tone === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setTone(option);
                  setToneOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-3
                  text-left
                  text-sm
                  transition

                  ${
                    isSelected
                      ? `
                        bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]
                        text-[var(--accent)]
                      `
                      : `
                        theme-muted
                        hover:bg-[var(--surface-secondary)]
                        hover:text-[var(--foreground)]
                      `
                  }
                `}
              >
                <span>{option}</span>

                {isSelected && (
                  <svg
                    className="
                      h-4
                      w-4
                      shrink-0
                      theme-accent
                    "
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="m5 12 4 4L19 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>

            <Button
              type="button"
              onClick={handleGenerate}
              disabled={
                !profession ||
                !skills ||
                isPending
              }
            >
              {isPending
                ? "Generating..."
                : "✨ Generate Bios"}
            </Button>
          </div>

          {bios.length > 0 && (
  <div className="mt-8">
    <h3 className="text-white text-xl font-bold mb-4">
      Choose a Bio
    </h3>

    <div
      className="
        space-y-4
        max-h-80
        overflow-y-auto
        pr-2
      "
    >
      {bios.map(
        (bio, index) => (
          <button
            key={index}
            onClick={() =>
              onSelectBio(
                bio
              )
            }
            className="
              w-full
              text-left
              rounded-2xl
              border
              border-zinc-800
              p-5
              text-zinc-300
              hover:border-lime-400
              hover:bg-zinc-800
              transition-all
            "
          >
            {bio}
          </button>
        )
      )}
    </div>
  </div>
)}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AIBioModal;