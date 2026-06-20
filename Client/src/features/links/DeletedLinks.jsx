import { FaTrash, FaUndo } from "react-icons/fa";

import { useDeletedLinks } from "./useDeletedLinks";
import { useRestoreLink } from "./useRestoreLink";
import { usePurgeLink } from "./usePurgeLink";

function DeletedLinks() {
  const { data, isLoading } = useDeletedLinks();

  const { mutate: restore } = useRestoreLink();
  const { mutate: purge } = usePurgeLink();

  const links = data?.links || [];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2">
          Deleted Links
        </h1>

        <p className="text-zinc-500 mb-8">
          Restore accidentally deleted links or
          permanently remove them.
        </p>

        {isLoading ? (
          <p className="text-zinc-500">
            Loading...
          </p>
        ) : links.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <p className="text-zinc-500">
              No deleted links.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {links.map((link) => (
              <div
                key={link._id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <h3 className="text-white text-xl font-semibold">
                  {link.title}
                </h3>

                <p className="text-zinc-500 text-sm mt-2 break-all">
                  {link.url}
                </p>

                <p className="text-zinc-600 text-xs mt-4">
                  Deleted:
                  {" "}
                  {new Date(
                    link.deletedAt
                  ).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() =>
                      restore(link._id)
                    }
                    className="flex-1 rounded-xl bg-lime-400 text-black py-3 font-medium flex items-center justify-center gap-2"
                  >
                    <FaUndo />
                    Restore
                  </button>

                  <button
                    onClick={() => {
                      const ok =
                        window.confirm(
                          "Permanently delete this link?"
                        );

                      if (ok) {
                        purge(link._id);
                      }
                    }}
                    className="rounded-xl border border-red-500 text-red-500 px-4"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeletedLinks;