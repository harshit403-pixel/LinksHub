import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";

import {
  useConnectGithub,
  useDisconnectGithub,
  useGithubConnection,
} from "./useGithub";

function GithubConnect({
  onOpenRepositories,
}) {
  const { data, isLoading } =
    useGithubConnection();

  const { connect } =
    useConnectGithub();

  const {
    mutate: disconnect,
    isPending,
  } = useDisconnectGithub();

  if (isLoading) {
    return (
      <div
        className="
          rounded-3xl
          border
          theme-border
          theme-surface
          p-5
          transition-colors
          duration-250
          sm:p-8
        "
      >
        <p className="theme-muted">
          Loading GitHub...
        </p>
      </div>
    );
  }

  const connection = data?.data;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-3xl
        border
        theme-border
        theme-surface
        p-5
        theme-text
        transition-colors
        duration-250
        sm:p-8
      "
    >
      {!connection ? (
        <>
          {/* NOT CONNECTED */}

          <div
            className="
              flex
              flex-col
              items-start
              gap-5
              sm:flex-row
            "
          >
            {/* GITHUB ICON */}

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                theme-surface-secondary
                theme-text
                transition-colors
                duration-250
                sm:h-16
                sm:w-16
              "
            >
              <FaGithub size={34} />
            </div>

            <div className="min-w-0 flex-1">

              {/* TITLE */}

              <h2
                className="
                  text-2xl
                  font-black
                  theme-text
                  sm:text-3xl
                "
              >
                GitHub Integration
              </h2>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-2
                  text-sm
                  theme-muted
                  sm:text-base
                "
              >
                Connect your GitHub account to
                import repositories, generate AI
                summaries and build your knowledge
                base.
              </p>

              {/* FEATURES */}

              <div
                className="
                  mt-5
                  space-y-2
                  text-sm
                  theme-muted
                "
              >
                <p>
                  • Import repositories in one click
                </p>

                <p>
                  • AI generates summaries automatically
                </p>

                <p>
                  • Ask AI questions about your projects
                </p>
              </div>

              {/* CONNECT */}

              <button
                type="button"
                onClick={connect}
                className="
                  mt-8
                  w-full
                  cursor-pointer
                  rounded-2xl
                  theme-accent-bg
                  px-6
                  py-3
                  font-semibold
                  transition-all
                  duration-200

                  hover:opacity-90
                  hover:scale-[1.03]

                  active:scale-[0.98]

                  sm:w-auto
                "
              >
                Connect GitHub
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* CONNECTED */}

          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
            "
          >

            {/* AVATAR */}

            <img
              src={connection.avatar}
              alt={connection.username}
              className="
                h-16
                w-16
                shrink-0
                rounded-full
                border
                theme-border
                sm:h-20
                sm:w-20
              "
            />

            <div className="min-w-0 flex-1">

              {/* TITLE + STATUS */}

              <div
                className="
                  flex
                  flex-col
                  items-start
                  gap-3
                  sm:flex-row
                  sm:items-center
                "
              >
                <h2
                  className="
                    text-2xl
                    font-black
                    theme-text
                    sm:text-3xl
                  "
                >
                  GitHub
                </h2>

                <span
                  className="
                    rounded-full
                    bg-green-500/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-green-600
                    dark:bg-green-500/15
                    dark:text-green-400
                  "
                >
                  Connected
                </span>
              </div>

              {/* USERNAME */}

              <p
                className="
                  mt-2
                  break-words
                  text-base
                  theme-text
                  sm:text-lg
                "
              >
                @{connection.username}
              </p>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-1
                  text-sm
                  theme-muted
                "
              >
                Import repositories, keep projects
                in sync and use AI to answer
                questions about your work.
              </p>
            </div>

            {/* ACTIONS */}

            <div
              className="
                flex
                w-full
                flex-col
                gap-3
                sm:flex-row
                lg:mt-0
                lg:w-auto
              "
            >
              {/* IMPORT */}

              <button
                type="button"
                onClick={onOpenRepositories}
                className="
                  w-full
                  cursor-pointer
                  rounded-2xl
                  theme-accent-bg
                  px-6
                  py-3
                  font-semibold
                  transition-all
                  duration-200

                  hover:opacity-90
                  hover:scale-[1.03]

                  active:scale-[0.98]

                  sm:w-auto
                "
              >
                Import Repositories
              </button>

              {/* DISCONNECT */}

              <button
                type="button"
                disabled={isPending}
                onClick={() => disconnect()}
                className="
                  w-full
                  cursor-pointer
                  rounded-2xl
                  border
                  border-[var(--danger)]
                  px-6
                  py-3
                  font-medium
                  text-[var(--danger)]
                  transition-all
                  duration-200

                  hover:bg-[var(--danger)]
                  hover:text-white

                  disabled:cursor-not-allowed
                  disabled:opacity-50

                  sm:w-auto
                "
              >
                {isPending
                  ? "Disconnecting..."
                  : "Disconnect"}
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default GithubConnect;