import { useState } from "react";
import { motion } from "motion/react";
import { FiSearch } from "react-icons/fi";
import { FaGithub, FaGlobe } from "react-icons/fa";

import { useProfileAISearch } from "./useProfileAISearch";

function ProfileAISearch({
  username,
  suggestions = [],
}) {
  const [query, setQuery] = useState("");

  const {
    mutate,
    data,
    isPending,
  } = useProfileAISearch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalQuery =
      query.trim() ||
      suggestions[0] ||
      "Tell me about your projects.";

    mutate(
      {
        username,
        query: finalQuery,
      },
      {
        onSuccess: () => {
          setQuery("");
        },
      }
    );
  };

  const handleSuggestionClick = (
    question
  ) => {
    mutate(
      {
        username,
        query: question,
      },
      {
        onSuccess: () => {
          setQuery("");
        },
      }
    );
  };

  return (
    <div className="mt-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="rounded-2xl border border-zinc-800 bg-black/40 backdrop-blur">
          <div className="flex items-center px-2">
            <div className="px-4 text-zinc-500">
              <FiSearch size={20} />
            </div>

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Ask anything about my projects, experience or skills..."
              className="
                flex-1
                h-14
                bg-transparent
                text-white
                placeholder:text-zinc-500
                outline-none
              "
            />

            <button
              type="submit"
              disabled={isPending}
              className="
                rounded-xl
                bg-white
                px-5
                py-2.5
                text-black
                font-semibold
                transition-all
                duration-200
                hover:scale-105
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {isPending
                ? "Thinking..."
                : "Ask"}
            </button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-medium text-zinc-500">
              Popular Questions
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestions
                .slice(0, 4)
                .map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() =>
                      handleSuggestionClick(
                        question
                      )
                    }
                    className="
                      rounded-full
                      border
                      border-zinc-800
                      bg-zinc-900
                      px-4
                      py-2
                      text-sm
                      text-zinc-300
                      transition-all
                      duration-200
                      hover:border-white
                      hover:bg-zinc-800
                      hover:text-white
                    "
                  >
                    {question}
                  </button>
                ))}
            </div>
          </div>
        )}
      </form>

      {data && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <h3 className="text-xl font-bold text-white">
            AI Answer
          </h3>

          <p className="mt-4 whitespace-pre-wrap leading-7 text-zinc-300">
            {data.data.answer}
          </p>

          {data.data.projects?.length >
            0 && (
            <>
              <h4 className="mt-8 mb-4 text-lg font-semibold text-white">
                Related Projects
              </h4>

              <div className="grid gap-4 md:grid-cols-2">
                {data.data.projects.map(
                  (project) => (
                    <div
                      key={project._id}
                      className="
                        rounded-2xl
                        border
                        border-zinc-800
                        bg-black/30
                        p-5
                      "
                    >
                      <h5 className="text-lg font-bold text-white">
                        {project.title}
                      </h5>

                      <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                        {project.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies
                          ?.slice(0, 4)
                          .map((tech) => (
                            <span
                              key={tech}
                              className="
                                rounded-full
                                bg-zinc-800
                                px-3
                                py-1
                                text-xs
                                text-zinc-300
                              "
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      <div className="mt-5 flex gap-5">
                        <a
                          href={
                            project.githubUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-zinc-300 transition hover:text-white"
                        >
                          <FaGithub />
                          GitHub
                        </a>

                        {project.demoUrl && (
                          <a
                            href={
                              project.demoUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-zinc-300 transition hover:text-white"
                          >
                            <FaGlobe />
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ProfileAISearch;