import { FaGlobe } from "react-icons/fa";

function LinkCard({ link }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 hover:border-lime-400 transition-all">
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

        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="text-lime-400 text-sm font-medium"
        >
          Open →
        </a>
      </div>
    </div>
  );
}

export default LinkCard;