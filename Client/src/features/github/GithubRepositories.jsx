import { useMemo, useState } from "react";
import { FaGithub, FaCheck } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import {
  useGithubRepositories,
  useImportGithubRepositories,
} from "./useGithub";

function GithubRepositories() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);

  const {
    data,
    isLoading,
    refetch,
  } = useGithubRepositories();

  const {
    mutate,
    isPending,
  } = useImportGithubRepositories();

  const repositories =
    data?.data || [];

  const filteredRepositories =
    useMemo(() => {
      return repositories.filter((repo) =>
        repo.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [repositories, search]);

  const toggleRepository = (
    repository
  ) => {
    setSelected((prev) => {
      if (prev.includes(repository)) {
        return prev.filter(
          (r) => r !== repository
        );
      }

      return [...prev, repository];
    });
  };

  const handleImport = () => {
    mutate(selected, {
      onSuccess: () => {
        setSelected([]);
      },
    });
  };

  return (
    <div
      className="
        flex
        h-full
        flex-col
        theme-text
        transition-colors
        duration-250
      "
    >
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div
        className="
          flex
          shrink-0
          flex-col
          gap-4
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <h2
            className="
              text-xl
              font-bold
              theme-text
              sm:text-2xl
            "
          >
            GitHub Repositories
          </h2>

          <p
            className="
              mt-2
              text-sm
              theme-muted
              sm:text-base
            "
          >
            Import repositories into your AI
            knowledge base.
          </p>
        </div>

        {/* REFRESH */}

        <button
          type="button"
          onClick={refetch}
          className="
            w-full
            cursor-pointer
            rounded-xl
            border
            theme-border
            px-4
            py-2
            text-sm
            font-medium
            theme-text
            transition-all
            duration-200

            hover:border-[var(--accent)]
            hover:text-[var(--accent)]

            sm:w-auto
            sm:text-base
          "
        >
          Refresh
        </button>
      </div>

      {/* ================================= */}
      {/* SEARCH */}
      {/* ================================= */}

      <div
        className="
          relative
          mt-5
          shrink-0
        "
      >
        <FiSearch
          className="
            absolute
            left-3.5
            top-1/2
            -translate-y-1/2
            theme-muted
            sm:left-4
          "
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search repositories..."
          className="
            w-full
            rounded-2xl
            border
            theme-border
            theme-surface-secondary
            py-3.5
            pl-11
            pr-4
            text-sm
            theme-text
            outline-none
            transition-all
            duration-200

            placeholder:opacity-50

            focus:border-[var(--accent)]
            focus:ring-1
            focus:ring-[var(--accent)]

            sm:py-4
            sm:pl-12
            sm:text-base
          "
        />
      </div>

      {/* ================================= */}
      {/* SCROLLABLE CONTENT */}
      {/* ================================= */}

      <div
        className="
          mt-6
          flex-1
          overflow-y-auto
          pr-0
          sm:pr-2
        "
      >
        {/* LOADING */}

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="
                  h-24
                  animate-pulse
                  rounded-2xl
                  theme-surface
                "
              />
            ))}
          </div>
        ) : filteredRepositories.length === 0 ? (

          /* EMPTY */

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              py-10
            "
          >
            <div className="text-center">
              <FaGithub
                size={48}
                className="
                  mx-auto
                  opacity-20
                  theme-text
                "
              />

              <h3
                className="
                  mt-6
                  text-xl
                  font-bold
                  theme-text
                "
              >
                No repositories found
              </h3>

              <p
                className="
                  mt-2
                  theme-muted
                "
              >
                Try another search.
              </p>
            </div>
          </div>

        ) : (

          /* REPOSITORIES */

          <div className="space-y-3">
            {filteredRepositories.map(
              (repo) => {
                const url =
                  `https://github.com/${repo.fullName}`;

                const checked =
                  selected.includes(url);

                return (
                  <button
                    key={repo.id}
                    type="button"
                    onClick={() =>
                      toggleRepository(url)
                    }
                    className={`
                      w-full
                      cursor-pointer
                      rounded-2xl
                      border
                      p-4
                      text-left
                      transition-all
                      duration-200

                      hover:-translate-y-[1px]

                      sm:p-5

                      ${
                        checked
                          ? `
                            border-[var(--accent)]
                            bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]
                          `
                          : `
                            theme-border
                            theme-surface
                            hover:border-[var(--border-hover)]
                          `
                      }
                    `}
                  >
                    <div
                      className="
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
                          min-w-0
                          items-start
                          gap-3
                        "
                      >
                        <FaGithub
                          className="
                            mt-1
                            shrink-0
                            text-xl
                            theme-text
                          "
                        />

                        <div className="min-w-0">

                          {/* NAME */}

                          <h3
                            className="
                              break-words
                              font-semibold
                              theme-text
                            "
                          >
                            {repo.name}
                          </h3>

                          {/* DESCRIPTION */}

                          <p
                            className="
                              mt-1
                              line-clamp-2
                              text-sm
                              theme-muted
                            "
                          >
                            {repo.description ||
                              "No description"}
                          </p>

                          {/* TAGS */}

                          <div
                            className="
                              mt-3
                              flex
                              flex-wrap
                              gap-2
                            "
                          >
                            {/* LANGUAGE */}

                            {repo.language && (
                              <span
                                className="
                                  rounded-full
                                  theme-surface-secondary
                                  px-3
                                  py-1
                                  text-xs
                                  theme-muted
                                "
                              >
                                {repo.language}
                              </span>
                            )}

                            {/* STARS */}

                            <span
                              className="
                                rounded-full
                                theme-surface-secondary
                                px-3
                                py-1
                                text-xs
                                theme-muted
                              "
                            >
                              ★ {repo.stars}
                            </span>

                            {/* VISIBILITY */}

                            <span
                              className={`
                                rounded-full
                                px-3
                                py-1
                                text-xs

                                ${
                                  repo.private
                                    ? `
                                      bg-yellow-500/10
                                      text-yellow-600
                                      dark:text-yellow-400
                                    `
                                    : `
                                      bg-green-500/10
                                      text-green-600
                                      dark:text-green-400
                                    `
                                }
                              `}
                            >
                              {repo.private
                                ? "Private"
                                : "Public"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CHECK */}

                      {checked && (
                        <FaCheck
                          className="
                            shrink-0
                            self-start
                            theme-accent
                            sm:self-center
                          "
                        />
                      )}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <div
        className="
          mt-4
          shrink-0
          border-t
          theme-border
          pt-4
          sm:mt-6
          sm:pt-6
        "
      >
        <button
          type="button"
          disabled={
            !selected.length ||
            isPending
          }
          onClick={handleImport}
          className="
            w-full
            cursor-pointer
            rounded-2xl
            theme-accent-bg
            px-4
            py-4
            text-sm
            font-semibold
            leading-snug
            transition-all
            duration-200

            hover:scale-[1.01]
            hover:opacity-90

            active:scale-[0.99]

            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:text-base
          "
        >
          {isPending
            ? "Importing..."
            : `Import Selected (${selected.length})`}
        </button>
      </div>
    </div>
  );
}

export default GithubRepositories;