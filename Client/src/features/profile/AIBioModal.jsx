import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {useGenerateBio} from '../ai/useGenerateBio.js'

function AIBioModal({
  onClose,
  onSelectBio,
}) {
  const [profession, setProfession] =
    useState("");

  const [skills, setSkills] =
    useState("");

  const [tone, setTone] =
    useState("Professional");

  const [bios, setBios] =
    useState([]);

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
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
            p-8
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

            <div>
              <label className="text-zinc-500 text-sm">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) =>
                  setTone(
                    e.target.value
                  )
                }
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
                "
              >
                <option
                  value="Professional"
                  className="bg-zinc-900"
                >
                  Professional
                </option>

                <option
                  value="Creative"
                  className="bg-zinc-900"
                >
                  Creative
                </option>

                <option
                  value="Minimal"
                  className="bg-zinc-900"
                >
                  Minimal
                </option>

                <option
                  value="Funny"
                  className="bg-zinc-900"
                >
                  Funny
                </option>
              </select>
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
            <div className="mt-8 space-y-4">
              <h3 className="text-white text-xl font-bold">
                Choose a Bio
              </h3>

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
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AIBioModal;