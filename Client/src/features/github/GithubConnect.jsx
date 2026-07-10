import { FaGithub } from "react-icons/fa";
import { motion } from "motion/react";

import {
  useConnectGithub,
  useDisconnectGithub,
  useGithubConnection,
} from "./useGithub";

function GithubConnect({onOpenRepositories,}) {
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
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
        <p className="text-zinc-500">
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
    border-zinc-800
    bg-zinc-900
    p-5 sm:p-8
  "
>
  {!connection ? (
    <>
      <div className="flex flex-col items-start gap-5 sm:flex-row">
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-white
            text-black
            sm:h-16
            sm:w-16
          "
        >
          <FaGithub size={34} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-black text-white sm:text-3xl">
            GitHub Integration
          </h2>

          <p className="mt-2 text-sm text-zinc-400 sm:text-base">
            Connect your GitHub account to import repositories,
            generate AI summaries and build your knowledge base.
          </p>

          <div className="mt-5 space-y-2 text-sm text-zinc-500">
            <p>• Import repositories in one click</p>
            <p>• AI generates summaries automatically</p>
            <p>• Ask AI questions about your projects</p>
          </div>

          <button
            onClick={connect}
            className="
              mt-8
              w-full
              rounded-2xl
              bg-white
              px-6
              py-3
              font-semibold
              text-black
              transition
              hover:scale-105
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
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <img
          src={connection.avatar}
          alt={connection.username}
          className="
            h-16
            w-16
            shrink-0
            rounded-full
            border
            border-zinc-700
            sm:h-20
            sm:w-20
          "
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              GitHub 
            </h2>

            <span
              className="
                rounded-full
                bg-green-500/15
                px-3
                py-1
                text-xs
                font-semibold
                text-green-400
              "
            >
              Connected
            </span>
          </div>

          <p className="mt-2 break-words text-base text-zinc-300 sm:text-lg">
            @{connection.username}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Import repositories, keep projects in sync and use AI
            to answer questions about your work.
          </p>
        </div>

       <div className="flex w-full flex-col gap-3 sm:flex-row lg:mt-0 lg:w-auto">
  <button
    onClick={onOpenRepositories}
    className="
      w-full
      rounded-2xl
      bg-white
      px-6
      py-3
      font-semibold
      text-black
      transition
      hover:scale-105
      sm:w-auto
    "
  >
    Import Repositories
  </button>

  <button
    disabled={isPending}
    onClick={() => disconnect()}
    className="
      w-full
      rounded-2xl
      border
      border-red-500
      px-6
      py-3
      font-medium
      text-red-400
      transition
      hover:bg-red-500
      hover:text-white
      sm:w-auto
    "
  >
    Disconnect
  </button>
</div>
      </div>
    </>
  )}
</motion.div>
  );
}

export default GithubConnect;
