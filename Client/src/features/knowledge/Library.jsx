import { useState } from "react";
import {
  useImportProject,
  useKnowledge,
} from "./knowledge.hooks";
import { toast } from "sonner";
import DeleteProjectModal from "./deleteProjectModal";
import GithubConnect from "../github/GithubConnect";
import GithubRepositories from "../github/GithubRepositories";
import { useGithubConnection } from "../github/useGithub";

import GithubRepositoriesModal from "../github/GithubRepositoriesModal";

const Library = () => {

  const [repositoriesOpen, setRepositoriesOpen] =
  useState(false);


  const { data: github } =
  useGithubConnection();

const githubConnected =
  !!github?.data;

    const [projectToDelete, setProjectToDelete] =
      useState(null);
  const [githubUrl, setGithubUrl] = useState("");

  const { data, isLoading } = useKnowledge();

  const importMutation = useImportProject();

  const projects = data?.data || [];

  const handleImport = (e) => {
    e.preventDefault();

   
    

if (!githubUrl.trim()) {
  toast.error("Please enter a GitHub repository URL.");
  return;
}

    importMutation.mutate(githubUrl, {
      onSuccess: () => {
        toast.success("Repository imported successfully.");
        setGithubUrl("");
      },
    });
  };

  
  return (
    <div className="space-y-6 text-white sm:space-y-8">

<GithubConnect
  onOpenRepositories={() =>
    setRepositoriesOpen(true)
  }
/>

        
      {/* Header */}
{githubConnected && (
  <div className="relative my-10">
    <div className="border-t border-zinc-800" />

    <span
      className="
        absolute
        left-1/2
        top-0
        -translate-x-1/2
        -translate-y-1/2
        bg-black
        px-4
        text-sm
        text-zinc-500
      "
    >
      OR
    </span>
  </div>
)}
      {/* Import Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
       <div className="mb-5 flex flex-wrap items-center gap-3">
  <h2 className="text-xl font-semibold">
    Import GitHub Repository
  </h2>

  {githubConnected && (
    <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">
      Manual
    </span>
  )}
</div>

        <form
          onSubmit={handleImport}
          className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4"
        >
          <input
          disabled={importMutation.isPending}
            type="text"
            placeholder="https://github.com/username/repository"
            value={githubUrl}
            onChange={(e) =>
              setGithubUrl(e.target.value)
            }
            className="
              min-w-0
              w-full
              flex-1
              bg-zinc-950
              border
              border-zinc-700
              rounded-xl
              px-4
              py-3
              text-white
              outline-none
              focus:border-white
            "
          />

          <button
            type="submit"
            disabled={importMutation.isPending}
            className="
              w-full
              bg-white
              text-black
              font-semibold
              rounded-xl
              px-6
              py-3
              hover:bg-zinc-200
              disabled:opacity-60
              transition
              sm:w-auto
            "
          >
            {importMutation.isPending
              ? "Importing..."
              : "Import"}
          </button>
        </form>
      </div>

      {/* Projects */}
      <div>
       <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <h2 className="text-2xl font-bold">
    Imported Projects
  </h2>

  <span className="self-start rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-400 sm:self-auto">
    {projects.length} Project{projects.length !== 1 && "s"}
  </span>
</div>

        {isLoading ? (
         <div className="grid gap-5">
  {[...Array(3)].map((_, i) => (
    <div
      key={i}
      className="h-48 animate-pulse rounded-3xl bg-zinc-900"
    />
  ))}
</div>
        ) : projects.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center sm:p-16">
  <h3 className="text-xl font-bold text-white sm:text-2xl">
    No imported projects
  </h3>

  <p className="mt-3 text-zinc-500">
    Import a GitHub repository to start building
    your AI knowledge base.
  </p>
</div>
        ) : (
          <div className="grid gap-5">
            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="break-words text-xl font-bold sm:text-2xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 break-words text-zinc-400">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="bg-zinc-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<div className="flex flex-wrap gap-4 sm:gap-6">
                       <a
                     href={project.githubUrl}
                     target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    GitHub →
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-400 hover:text-green-300"
                    >
                      Live Demo →
                    </a>
                  )}
</div>

                  <button
  onClick={() =>
    setProjectToDelete(project)
  }
  className="
    self-start
    text-red-400
    hover:text-red-300
    transition
    text-sm
    sm:self-auto
  "
>
  Delete
</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {projectToDelete && (
  <DeleteProjectModal
    project={projectToDelete}
    onClose={() =>
      setProjectToDelete(null)
    }
  />
)}
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
