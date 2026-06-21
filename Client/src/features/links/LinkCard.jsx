import { FaGlobe, FaTrash, FaEdit } from "react-icons/fa";
import { useDeleteLink } from "./useDeleteLink";
import { FaGripVertical } from "react-icons/fa";


function LinkCard({ link, onEdit, onDelete }) {
  const { mutate: deleteLink, isPending } =
    useDeleteLink();

  
const handleDelete = () => {
  onDelete(link);
};

const handleEdit = () => {
  onEdit(link);
};
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 hover:border-lime-400 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">
            {link.title}
          </h3>


        </div>

       
        <div className="flex text-zinc-500 justify-center items-center gap-1   " >
            Drag to Reorder
            <FaGripVertical
  className="
    text-zinc-500
    cursor-grab
  "
/>
        </div>
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