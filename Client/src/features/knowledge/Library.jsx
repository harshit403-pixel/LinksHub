import { useState } from "react";

import {
  useImportProject,
  useKnowledge,
} from "./knowledge.hooks";

import { toast } from "sonner";

import DeleteProjectModal from "./deleteProjectModal";

import GithubConnect from "../github/GithubConnect";
import GithubRepositoriesModal from "../github/GithubRepositoriesModal";
import { useGithubConnection } from "../github/useGithub";

const Library = () => {
  const [
    repositoriesOpen,
    setRepositoriesOpen,
  ] = useState(false);

  const { data: github } =
    useGithubConnection();

  const githubConnected =
    !!github?.data;

  const [
    projectToDelete,
    setProjectToDelete,
  ] = useState(null);

  const [githubUrl, setGithubUrl] =
    useState("");

  const {
    data,
    isLoading,
  } = useKnowledge();

  const importMutation =
    useImportProject();

  const projects =
    data?.data || [];

  const handleImport = (e) => {
    e.preventDefault();

    if (!githubUrl.trim()) {
      toast.error(
        "Please enter a GitHub repository URL."
      );

      return;
    }

    importMutation.mutate(
      githubUrl,
      {
        onSuccess: () => {
          toast.success(
            "Repository imported successfully."
          );

          setGithubUrl("");
        },
      }
    );
  };

  return (
    <div
      className="
      mt-8
        space-y-6
        theme-text
        transition-colors
        duration-250
        sm:space-y-8
      "
    >
      {/* ================================= */}
      {/* GITHUB CONNECTION */}
      {/* ================================= */}

      <GithubConnect
        onOpenRepositories={() =>
          setRepositoriesOpen(true)
        }
      />

      {/* ================================= */}
      {/* DIVIDER */}
      {/* ================================= */}

      {githubConnected && (
        <div className="relative my-10">
          <div
            className="
              border-t
              theme-border
            "
          />

          <span
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              -translate-y-1/2

              theme-bg
              px-4
              text-sm
              theme-muted
            "
          >
            OR
          </span>
        </div>
      )}

      {/* ================================= */}
      {/* MANUAL IMPORT */}
      {/* ================================= */}

      <div
        className="
          rounded-2xl
          border
          theme-border
          theme-surface
          p-4

          transition-colors
          duration-250

          sm:p-6
        "
      >
        <div
          className="
            mb-5
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              theme-text
            "
          >
            Import GitHub Repository
          </h2>

          {githubConnected && (
            <span
              className="
                rounded-full
                bg-blue-500/10
                px-3
                py-1
                text-xs
                font-semibold
                text-blue-500
              "
            >
              Manual
            </span>
          )}
        </div>

        <form
          onSubmit={handleImport}
          className="
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:items-stretch
            sm:gap-4
          "
        >
          {/* URL INPUT */}

          <input
            disabled={
              importMutation.isPending
            }
            type="text"
            placeholder="https://github.com/username/repository"
            value={githubUrl}
            onChange={(e) =>
              setGithubUrl(
                e.target.value
              )
            }
            className="
              min-w-0
              w-full
              flex-1

              rounded-xl
              border
              theme-border
              theme-surface-secondary

              px-4
              py-3

              theme-text
              outline-none

              transition-all
              duration-200

              placeholder:opacity-50

              focus:border-[var(--accent)]

              disabled:cursor-not-allowed
              disabled:opacity-60

              sm:w-auto
            "
          />

          {/* IMPORT BUTTON */}

          <button
            type="submit"
            disabled={
              importMutation.isPending
            }
            className="
              w-full
              cursor-pointer
              rounded-xl

              theme-accent-bg

              px-6
              py-3

              font-semibold

              transition-all
              duration-200

              hover:opacity-90
              hover:scale-[1.01]

              active:scale-[0.98]

              disabled:cursor-not-allowed
              disabled:opacity-60

              sm:w-auto
            "
          >
            {importMutation.isPending
              ? "Importing..."
              : "Import"}
          </button>
        </form>
      </div>

      {/* ================================= */}
      {/* PROJECTS */}
      {/* ================================= */}

      <div>
        {/* HEADER */}

        <div
          className="
            mb-5
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              theme-text
            "
          >
            Imported Projects
          </h2>

          <span
            className="
              self-start
              rounded-full
              theme-surface-secondary

              px-4
              py-2

              text-sm
              theme-muted

              sm:self-auto
            "
          >
            {projects.length} Project
            {projects.length !== 1 &&
              "s"}
          </span>
        </div>

        {/* LOADING */}

        {isLoading ? (
          <div className="grid gap-5">
            {[...Array(3)].map(
              (_, i) => (
                <div
                  key={i}
                  className="
                    h-48
                    animate-pulse
                    rounded-3xl
                    theme-surface-secondary
                  "
                />
              )
            )}
          </div>

        ) : projects.length === 0 ? (

          /* EMPTY */

          <div
            className="
              rounded-3xl
              border
              theme-border
              theme-surface

              p-8
              text-center

              transition-colors
              duration-250

              sm:p-16
            "
          >
            <h3
              className="
                text-xl
                font-bold
                theme-text

                sm:text-2xl
              "
            >
              No imported projects
            </h3>

            <p
              className="
                mt-3
                theme-muted
              "
            >
              Import a GitHub repository
              to start building your AI
              knowledge base.
            </p>
          </div>

        ) : (

          /* PROJECT LIST */

          <div className="grid gap-5">
            {projects.map(
              (project) => (
                <div
                  key={project._id}
                  className="
                    rounded-2xl
                    border
                    theme-border
                    theme-surface

                    p-4

                    transition-all
                    duration-300

                    hover:border-[var(--accent)]

                    sm:p-6
                  "
                >
                  {/* PROJECT INFO */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div className="min-w-0">
                      <h3
                        className="
                          break-words
                          text-xl
                          font-bold
                          theme-text

                          sm:text-2xl
                        "
                      >
                        {project.title}
                      </h3>

                      <p
                        className="
                          mt-3
                          break-words
                          theme-muted
                        "
                      >
                        {project.summary}
                      </p>
                    </div>
                  </div>

                  {/* TECHNOLOGIES */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {project.technologies?.map(
                      (tech) => (
                        <span
                          key={tech}
                          className="
                            rounded-full
                            theme-surface-secondary

                            px-3
                            py-1

                            text-sm
                            theme-muted
                          "
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      mt-6
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div
                      className="
                        flex
                        flex-wrap
                        gap-4

                        sm:gap-6
                      "
                    >
                      {/* GITHUB */}

                      <a
                        href={
                          project.githubUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="
                          text-blue-500
                          transition-colors
                          hover:text-blue-600
                        "
                      >
                        GitHub →
                      </a>

                      {/* LIVE DEMO */}

                      {project.demoUrl && (
                        <a
                          href={
                            project.demoUrl
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="
                            text-green-500
                            transition-colors
                            hover:text-green-600
                          "
                        >
                          Live Demo →
                        </a>
                      )}
                    </div>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        setProjectToDelete(
                          project
                        )
                      }
                      className="
                        self-start
                        cursor-pointer
                        text-sm

                        text-[var(--danger)]

                        transition-colors

                        hover:opacity-80

                        sm:self-auto
                      "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* ================================= */}
      {/* DELETE MODAL */}
      {/* ================================= */}

      {projectToDelete && (
        <DeleteProjectModal
          project={projectToDelete}
          onClose={() =>
            setProjectToDelete(null)
          }
        />
      )}

      {/* ================================= */}
      {/* GITHUB REPOSITORIES MODAL */}
      {/* ================================= */}

      <GithubRepositoriesModal
        open={repositoriesOpen}
        onClose={() =>
          setRepositoriesOpen(false)
        }
      />
    </div>
  );
};

export default Library;