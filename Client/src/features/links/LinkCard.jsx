import {
  FaGlobe,
  FaTrash,
  FaEdit,
  FaGripVertical,
} from "react-icons/fa";

function LinkCard({
  link,
  onEdit,
  onDelete,
}) {
  const handleDelete = () => {
    onDelete(link);
  };

  const handleEdit = () => {
    onEdit(link);
  };

  return (
    <div
      className="
        rounded-3xl
        border
        theme-border
        theme-surface
        p-5

        hover:-translate-y-1
        hover:border-[var(--accent)]

        transition-all
        duration-300
      "
    >
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            className="
              truncate
              text-lg
              font-semibold
              theme-text
            "
          >
            {link.title}
          </h3>
        </div>

        {/* DRAG */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-center
            gap-1
            text-sm
            theme-muted
          "
        >
          <span className="hidden sm:inline">
            Drag to Reorder
          </span>

          <FaGripVertical
            className="
              cursor-grab
              opacity-70
              active:cursor-grabbing
            "
          />
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <span
          className="
            text-sm
            theme-muted
          "
        >
          {link.clicks} Clicks
        </span>

        <div className="flex gap-2">
          {/* OPEN */}

          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              gap-2
              rounded-xl

              theme-accent-bg

              px-3
              py-2

              text-sm
              font-medium

              transition-all

              hover:opacity-90
              hover:scale-[1.02]
            "
          >
            <FaGlobe size={12} />
            Open
          </a>

          {/* EDIT */}

          <button
            type="button"
            onClick={handleEdit}
            className="
              cursor-pointer
              rounded-xl
              border
              theme-border

              px-3
              py-2

              theme-text

              transition-all

              hover:border-[var(--accent)]
              hover:text-[var(--accent)]
            "
          >
            <FaEdit />
          </button>

          {/* DELETE */}

          <button
            type="button"
            onClick={handleDelete}
            className="
              cursor-pointer
              rounded-xl
              border
              border-[var(--danger)]

              px-3
              py-2

              text-[var(--danger)]

              transition-all

              hover:bg-[var(--danger)]
              hover:text-white
            "
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;