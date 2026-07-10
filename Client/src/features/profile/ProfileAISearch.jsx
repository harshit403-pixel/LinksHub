import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch } from "react-icons/fi";
import { FaGithub, FaGlobe } from "react-icons/fa";
import { useProfileAISearch } from "./useProfileAIsearch";

function ProfileAISearch({
  username,
  suggestions = [],
}) {
  const [query, setQuery] = useState("");
  const [lastQuestion, setLastQuestion] =
    useState("");

  const answerRef = useRef(null);

  const {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    reset,
  } = useProfileAISearch();

  useEffect(() => {
    if (isSuccess && answerRef.current) {
      answerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalQuery =
      query.trim() ||
      suggestions[0] ||
      "Tell me about your projects.";

    setLastQuestion(finalQuery);

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
    setLastQuestion(question);

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
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-5"
      >
        <div className="rounded-2xl border border-zinc-800 bg-black/40 backdrop-blur">
          <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center">
              <FiSearch
                size={20}
                className="shrink-0 text-zinc-500"
              />

              <input
                value={query}
                disabled={isPending}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Ask anything about my projects, experience or skills..."
                className="
                  min-w-0
                  flex-1
                  h-12
                  bg-transparent
                  px-3
                  text-sm
                  text-white
                  placeholder:text-zinc-500
                  outline-none
                  disabled:opacity-60
                  sm:h-14
                  sm:px-4
                  sm:text-base
                "
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="
                w-full
                shrink-0
                rounded-xl
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:scale-105
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
                sm:py-2.5
              "
            >
              {isPending
                ? "Thinking..."
                : "Ask AI"}
            </button>
          </div>
        </div>

        {!data &&
          suggestions.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <p className="mb-3 text-sm font-medium text-zinc-500">
                Suggested Questions
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
                        w-full
                        rounded-full
                        border
                        border-zinc-800
                        bg-zinc-900
                        px-4
                        py-2
                        text-sm
                        text-zinc-300
                        transition
                        hover:border-white
                        hover:bg-zinc-800
                        hover:text-white
                        sm:w-auto
                      "
                    >
                      {question}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
                <AnimatePresence mode="wait">
        {isPending && (
          <motion.div
            key="loading"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
          >
            <h3 className="text-xl font-bold text-white">
              Answer
            </h3>

            <div className="mt-6 space-y-3 animate-pulse">
              <div className="h-4 w-full rounded bg-zinc-800" />
              <div className="h-4 w-11/12 rounded bg-zinc-800" />
              <div className="h-4 w-9/12 rounded bg-zinc-800" />
              <div className="h-4 w-10/12 rounded bg-zinc-800" />
            </div>

            <p className="mt-6 text-sm text-zinc-500">
              Searching through projects...
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="rounded-3xl border border-red-900 bg-zinc-900 p-5 sm:p-6"
          >
            <h3 className="text-xl font-bold text-white">
              Something went wrong
            </h3>

            <p className="mt-3 text-zinc-400">
              Please try asking your question
              again.
            </p>

            <button
              onClick={() => reset()}
              className="
                mt-6
                rounded-xl
                border
                border-zinc-700
                px-5
                py-2
                text-white
                transition
                hover:border-white
              "
            >
              Try Again
            </button>
          </motion.div>
        )}

        {data && (
          <motion.div
            key="answer"
            ref={answerRef}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
          >
            <div className="mb-8">
              <p className="text-sm uppercase tracking-wider text-zinc-500">
                Question
              </p>

              <h2 className="mt-2 break-words text-xl font-semibold text-white">
                {lastQuestion}
              </h2>
            </div>

            <div>
              <p className="text-sm uppercase tracking-wider text-zinc-500">
                Answer
              </p>

              <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-zinc-300 sm:leading-8">
                {data.data.answer}
              </p>
            </div>

            {data.data.projects.length === 0 && (
              <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/30 p-5">
                <h4 className="text-lg font-semibold text-white">
                  No matching projects
                </h4>

                <p className="mt-2 text-zinc-400">
                  I couldn't find a project
                  related to this question.
                  Try asking about React,
                  Node.js, authentication,
                  APIs, or a specific project.
                </p>
              </div>
            )}

            {data.data.projects.length > 0 && (
              <>
                <h3 className="mt-10 mb-5 text-lg font-semibold text-white">
                  Sources
                </h3>

                <div className="grid gap-4 md:grid-cols-2">
                  {data.data.projects.map(
                    (project) => (                    <motion.div
                      key={project._id}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                       className="
                         rounded-2xl
                         border
                         border-zinc-800
                         bg-black/30
                         p-4
                         transition-all
                         hover:border-zinc-700
                         hover:bg-black/50
                         sm:p-5
                       "
                     >
                       <h4 className="break-words text-lg font-bold text-white">
                         {project.title}
                       </h4>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">
                        {project.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies
                          ?.slice(0, 5)
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

                       <div className="mt-6 flex flex-wrap gap-4 sm:gap-5">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            flex
                            items-center
                            gap-2
                            text-zinc-300
                            transition
                            hover:text-white
                          "
                        >
                          <FaGithub />
                          GitHub
                        </a>

                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              flex
                              items-center
                              gap-2
                              text-zinc-300
                              transition
                              hover:text-white
                            "
                          >
                            <FaGlobe />
                            Demo
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </form> 

      {!isPending &&
        !data &&
        !error &&
        suggestions.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              mt-8
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              text-center
              sm:p-10
            "
          >
            <h3 className="text-xl font-semibold text-white">
              No Projects Available
            </h3>

            <p className="mt-3 text-zinc-500">
              This developer hasn't added any
              projects yet. Once projects are
              available, you'll be able to ask
              questions about them here.
            </p>
          </motion.div>
        )}
    </div>
  );
}

export default ProfileAISearch;
