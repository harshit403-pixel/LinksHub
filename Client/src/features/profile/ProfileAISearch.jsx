import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSearch } from "react-icons/fi";
import {
  FaGithub,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

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
      "Tell me about my projects.";

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

  const handleSuggestionClick = (question) => {
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
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* SEARCH */}

        <div
          className="
            overflow-hidden
            
            border
            border-[var(--border)]
            bg-[var(--surface-secondary)]
            transition
            focus-within:border-[var(--muted-foreground)]
          "
        >
          <div className="flex flex-col gap-3 p-2.5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--muted)]">
                <FiSearch size={18} />
              </div>

              <input
                value={query}
                disabled={isPending}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Ask anything about my work..."
                className="
                  h-12
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2
                  text-sm
                  text-[var(--foreground)]
                  caret-[var(--foreground)]
                  outline-none
                  placeholder:text-[var(--muted)]
                  disabled:opacity-50
                  sm:h-14
                  sm:px-3
                  sm:text-base
                "
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="
                flex
                h-12
                w-full
                shrink-0
                items-center
                justify-center
                bg-[var(--foreground)]
                px-6
                text-sm
                font-semibold
                text-[var(--background)]
                transition
                hover:opacity-80
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:h-11
                sm:w-auto
              "
            >
              {isPending
                ? "Thinking..."
                : "Ask AI"}
            </button>
          </div>
        </div>

        {/* SUGGESTIONS */}

        {!data &&
          !isPending &&
          suggestions.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <p className="mb-3 text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                Try asking
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
                        
                        border
                        border-[var(--border)]
                        bg-[var(--surface-secondary)]
                        px-4
                        py-2.5
                        text-left
                        text-xs
                        text-[var(--muted-foreground)]
                        transition-all
                        hover:border-[var(--muted-foreground)]
                        hover:bg-[var(--surface)]
                        hover:text-[var(--foreground)]
                        sm:text-sm
                      "
                    >
                      {question}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}

        <AnimatePresence mode="wait">
          {/* LOADING */}

          {isPending && (
            <motion.div
              key="loading"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                
                border
                border-[var(--border)]
                bg-[var(--surface-secondary)]
                p-5
                sm:p-6
              "
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted-foreground)]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted-foreground)] [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted-foreground)] [animation-delay:300ms]" />
                </div>

                <p className="text-sm text-[var(--muted)]">
                  Searching through projects...
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="h-3 w-full animate-pulse rounded bg-[var(--border)]" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-[var(--border)]" />
                <div className="h-3 w-8/12 animate-pulse rounded bg-[var(--border)]" />
              </div>
            </motion.div>
          )}

          {/* ERROR */}

          {error && (
            <motion.div
              key="error"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                
                border
                border-red-500/20
                bg-red-500/[0.03]
                p-5
                sm:p-6
              "
            >
              <p className="text-xs uppercase tracking-[0.15em] text-red-400/60">
                AI unavailable
              </p>

              <h3 className="mt-2 text-lg font-medium text-[var(--foreground)]">
                Something went wrong
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                I couldn't answer that question
                right now. Please try again.
              </p>

              <button
                type="button"
                onClick={() => reset()}
                className="
                  mt-5
                  
                  border
                  border-[var(--border)]
                  px-4
                  py-2
                  text-sm
                  text-[var(--muted-foreground)]
                  transition
                  hover:border-[var(--muted-foreground)]
                  hover:text-[var(--foreground)]
                "
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* ANSWER */}

          {data && (
            <motion.div
              key="answer"
              ref={answerRef}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                
                border
                border-[var(--border)]
                bg-[var(--surface-secondary)]
                p-5
                sm:p-7
              "
            >
              {/* QUESTION */}

              <div className="border-b border-[var(--border)] pb-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  Question
                </p>

                <h2 className="mt-2 text-lg font-medium leading-7 text-[var(--foreground)] sm:text-xl">
                  {lastQuestion}
                </h2>
              </div>

              {/* ANSWER */}

              <div className="pt-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  Answer
                </p>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[var(--muted-foreground)] sm:text-base sm:leading-8">
                  {data.data.answer}
                </p>
              </div>

              {/* SOURCES */}

              {data.data.projects?.length > 0 && (
                <div className="mt-8 border-t border-[var(--border)] pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                      Sources
                    </p>

                    <span className="text-xs text-[var(--muted)]">
                      {data.data.projects.length}{" "}
                      {data.data.projects.length ===
                      1
                        ? "project"
                        : "projects"}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.data.projects.map(
                      (project) => (
                        <motion.div
                          key={project._id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="
                            group
                            
                            border
                            border-[var(--border)]
                            bg-[var(--surface)]
                            p-4
                            transition
                            hover:border-[var(--muted-foreground)]
                            hover:bg-[var(--surface-secondary)]
                          "
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="min-w-0 break-words text-sm font-medium text-[var(--foreground)]">
                              {project.title}
                            </h4>

                            {project.githubUrl && (
                              <a
                                href={
                                  project.githubUrl
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="
                                  shrink-0
                                  text-[var(--muted)]
                                  transition
                                  hover:text-[var(--foreground)]
                                "
                                aria-label={`View ${project.title} on GitHub`}
                              >
                                <FaGithub size={14} />
                              </a>
                            )}
                          </div>

                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--muted)]">
                            {project.summary}
                          </p>

                          {project.technologies
                            ?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {project.technologies
                                .slice(0, 4)
                                .map(
                                  (
                                    technology
                                  ) => (
                                    <span
                                      key={
                                        technology
                                      }
                                      className="
                                        rounded-md
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface-secondary)]
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        text-[var(--muted)]
                                      "
                                    >
                                      {technology}
                                    </span>
                                  )
                                )}
                            </div>
                          )}

                          {project.demoUrl && (
                            <a
                              href={
                                project.demoUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="
                                mt-4
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                text-[var(--muted)]
                                transition
                                hover:text-[var(--foreground)]
                              "
                            >
                              View project
                              <FaArrowUpRightFromSquare
                                size={9}
                              />
                            </a>
                          )}
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* NO MATCHES */}

              {data.data.projects?.length ===
                0 && (
                <div
                  className="
                    mt-8
                    
                    border
                    border-[var(--border)]
                    bg-[var(--surface)]
                    p-5
                  "
                >
                  <h4 className="text-sm font-medium text-[var(--foreground)]">
                    No matching projects
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                    I couldn't find a project
                    related to this question. Try
                    asking about a specific
                    technology or project.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* EMPTY STATE */}

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
              mt-5
              
              border
              border-[var(--border)]
              bg-[var(--surface-secondary)]
              p-6
              text-center
            "
          >
            <h3 className="text-base font-medium text-[var(--foreground)]">
              No projects available
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              This developer hasn't added any
              projects yet.
            </p>
          </motion.div>
        )}
    </div>
  );
}

export default ProfileAISearch;