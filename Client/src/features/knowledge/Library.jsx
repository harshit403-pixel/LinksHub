import { useState } from "react";
import {
  useImportProject,
  useKnowledge,
} from "./knowledge.hooks";
import { toast } from "sonner";
import DeleteProjectModal from "./deleteProjectModal";


const Library = () => {
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
    <div className="space-y-8 text-white">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black">Library</h1>
        <p className="text-zinc-400 mt-2">
          Import your GitHub repositories and build your AI knowledge base.
        </p>
      </div>

      {/* Import Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-5">
          Import GitHub Repository
        </h2>

        <form
          onSubmit={handleImport}
          className="flex flex-col md:flex-row gap-4"
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
              bg-white
              text-black
              font-semibold
              rounded-xl
              px-6
              py-3
              hover:bg-zinc-200
              disabled:opacity-60
              transition
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
        <h2 className="text-2xl font-bold mb-5">
          Imported Projects
        </h2>

        {isLoading ? (
          <div className="text-zinc-400">
            Loading...
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center text-zinc-500">
            No projects imported yet.
          </div>
        ) : (
          <div className="grid gap-5">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 mt-3">
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

                <div className="flex items-center justify-between mt-6">
<div className="flex gap-6 mt-6">
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
    text-red-400
    hover:text-red-300
    transition
    text-sm
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
    </div>
  );
};

export default Library;