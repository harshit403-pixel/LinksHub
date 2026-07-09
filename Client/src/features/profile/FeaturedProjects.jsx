import { FaGithub, FaGlobe } from "react-icons/fa";

const FeaturedProjects = ({ projects }) => {
  if (!projects?.length) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-black text-white">
            Featured Projects
          </h2>

          <p className="text-zinc-500 mt-1">
            Things I've built.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-700"
          >
            <h3 className="text-xl font-bold text-white">
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

            <div className="flex gap-6 mt-6">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-white"
              >
                <FaGithub />
                GitHub
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-zinc-300 hover:text-white"
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