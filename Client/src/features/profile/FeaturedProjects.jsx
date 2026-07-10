import { FaGithub, FaGlobe } from "react-icons/fa";

const FeaturedProjects = ({ projects }) => {
  if (!projects?.length) return null;

  return (
    <section className="mb-8">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">
            Featured Projects
          </h2>

          <p className="text-zinc-500 mt-1">
            Things I've built.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 sm:p-6"
          >
            <h3 className="break-words text-xl font-bold text-white">
              {project.title}
            </h3>

            <p className="text-zinc-400 mt-3 text-sm line-clamp-4">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {project.technologies
                ?.slice(0, 4)
                .map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white sm:text-base"
              >
                <FaGithub />
                GitHub
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white sm:text-base"
                >
                  <FaGlobe />
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
