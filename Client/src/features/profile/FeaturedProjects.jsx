import { FaGithub, FaGlobe } from "react-icons/fa";

const FeaturedProjects = ({ projects }) => {
  if (!projects?.length) return null;

  return (
    <section>
      <div className="mb-6">
        <h2 className="font-serif text-2xl text-[var(--foreground)] sm:text-3xl">
          Featured Projects
        </h2>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Things I've built.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project._id}
            className="
              group
              relative
              flex
              h-[220px]
              flex-col
              overflow-hidden
              
              border
              border-[var(--border)]
              bg-[var(--surface-secondary)]
              transition-all
              duration-300
              hover:border-[var(--muted-foreground)]
            "
          >
            {/* PROJECT IMAGE */}


            {/* CONTENT */}

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              {/* TITLE + LIVE */}

              <div className="flex items-start justify-between gap-3">
                <h3 className="line-clamp-2 text-xl font-bold text-[var(--foreground)]">
                  {project.title}
                </h3>

                {project.demoUrl && (
                  <span className="mt-1 flex shrink-0 items-center gap-1.5 text-xs text-[var(--muted)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live
                  </span>
                )}
              </div>

              {/* SUMMARY */}

              {project.summary && (
                <p className="mt-2 line-clamp-2 text-sm font-medium text-[var(--muted)]">
                  {project.summary}
                </p>
              )}

              {/* DESCRIPTION */}

              {project.description && (
                <p
                  className="
                    mt-3
                    line-clamp-3
                    text-sm
                    leading-6
                    text-[var(--muted-foreground)]
                  "
                >
                  {project.description}
                </p>
              )}

              {/* BOTTOM */}

              <div className="mt-auto pt-5">
                {/* TECHNOLOGIES */}

                <div className="flex min-h-[28px] flex-wrap gap-2">
                  {project.technologies
                    ?.slice(0, 4)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="
                          rounded-lg
                          border
                          border-[var(--border)]
                          bg-[var(--surface)]
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-[var(--muted-foreground)]
                        "
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                {/* LINKS */}

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-xs text-[var(--muted)]">
                    View project
                  </span>

                  <div className="flex items-center gap-4 text-[var(--muted)]">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Live demo"
                        className="
                          transition-colors
                          hover:text-[var(--foreground)]
                        "
                      >
                        <FaGlobe size={18} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub repository"
                        className="
                          transition-colors
                          hover:text-[var(--foreground)]
                        "
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;