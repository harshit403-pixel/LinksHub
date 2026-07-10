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
  <div className="flex h-full flex-col">
    {/* Header */}
    <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold">
          GitHub Repositories
        </h2>

        <p className="mt-2 text-sm text-zinc-500 sm:text-base">
          Import repositories into your AI knowledge base.
        </p>
      </div>

      <button
        onClick={refetch}
        className="
          w-full
          rounded-xl
          border
          border-zinc-700
          px-4
          py-2
          text-sm
          text-white
          hover:border-white
          transition
          sm:w-auto
          sm:text-base
        "
      >
        Refresh
      </button>
    </div>

    {/* Search */}
    <div className="relative mt-5 shrink-0">
      <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 sm:left-4" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search repositories..."
        className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-black
          py-3.5
          pl-11
          pr-4
          text-sm
          text-white
          outline-none
          sm:py-4
          sm:pl-12
          sm:text-base
        "
      />
    </div>

    {/* Scrollable Content */}
    <div className="mt-6 flex-1 overflow-y-auto pr-0 sm:pr-2">
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-zinc-900"
            />
          ))}
        </div>
      ) : filteredRepositories.length === 0 ? (
        <div className="flex h-full items-center justify-center py-10">
          <div className="text-center">
            <FaGithub
              size={48}
              className="mx-auto text-zinc-700"
            />

            <h3 className="mt-6 text-xl font-bold text-white">
              No repositories found
            </h3>

            <p className="mt-2 text-zinc-500">
              Try another search.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRepositories.map((repo) => {
            const url = `https://github.com/${repo.fullName}`;
            const checked = selected.includes(url);

            return (
              <button
                key={repo.id}
                onClick={() =>
                  toggleRepository(url)
                }
                className={`
                  w-full
                  rounded-2xl
                  border
                  p-4
                  text-left
                  transition
                  sm:p-5

                  ${
                    checked
                      ? "border-white bg-zinc-800"
                      : "border-zinc-800 hover:border-zinc-600"
                  }
                `}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <div className="flex min-w-0 items-start gap-3">
                    <FaGithub className="mt-1 shrink-0 text-xl text-white" />

                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-white">
                        {repo.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                        {repo.description ||
                          "No description"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {repo.language && (
                          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                            {repo.language}
                          </span>
                        )}

                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                          ★ {repo.stars}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            repo.private
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {repo.private
                            ? "Private"
                            : "Public"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {checked && (
                    <FaCheck className="shrink-0 self-start text-white sm:self-center" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>

    {/* Sticky Footer */}
    <div className="mt-4 shrink-0 border-t border-zinc-800 pt-4 sm:mt-6 sm:pt-6">
      <button
        disabled={
          !selected.length ||
          isPending
        }
        onClick={handleImport}
        className="
          w-full
          rounded-2xl
          bg-white
          px-4
          py-4
          text-sm
          font-semibold
          text-black
          leading-snug
          transition
          hover:scale-[1.01]
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
