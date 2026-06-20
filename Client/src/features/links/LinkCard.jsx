import { FaGlobe, FaTrash, FaEdit } from "react-icons/fa";
import { useDeleteLink } from "./useDeleteLink";

function LinkCard({ link }) {
  const { mutate: deleteLink, isPending } =
    useDeleteLink();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${link.title}"?`
    );

    if (!confirmed) return;

    deleteLink(link._id);
  };

  const handleEdit = () => {
    alert(
      "Edit feature coming next. Backend is ready."
    );
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 hover:border-lime-400 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">
            {link.title}
          </h3>

          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 text-sm break-all"
          >
            {link.url}
          </a>
        </div>

        <FaGlobe className="text-lime-400" />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-zinc-500 text-sm">
          {link.clicks} Clicks
        </span>

        <div className="flex gap-2">
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-lime-400 px-3 py-2 text-black text-sm font-medium"
          >
            Open
          </a>

          <button
            onClick={handleEdit}
            className="rounded-xl border cursor-pointer border-zinc-700 px-3 py-2 text-white hover:border-lime-400 transition"
          >
            <FaEdit />
          </button>

          <button
            disabled={isPending}
            onClick={handleDelete}
            className="rounded-xl border cursor-pointer border-red-500 px-3 py-2 text-red-500 hover:bg-red-500 hover:text-white transition"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;