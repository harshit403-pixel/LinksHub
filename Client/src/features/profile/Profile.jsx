import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { getLinkIcon } from "./getLinkIcon.jsx";
import { useProfileLinks } from "./useProfileLinks";

import { getLinkColor } from "./getLinkColor";

function Profile() {
  const { username } = useParams();

  const { data, isLoading, isError } =
    useProfileLinks();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">
          Profile not found
        </p>
      </div>
    );
  }

  const links = data?.links || [];

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 mb-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-lime-400 flex items-center justify-center text-black text-3xl font-bold">
              {username?.[0]?.toUpperCase()}
            </div>

            <div>
              <h1 className="text-white text-4xl font-black">
                @{username}
              </h1>

              <p className="text-zinc-400">
                LinksHub Profile
              </p>
            </div>
          </div>
        </motion.div>

        {/* BENTO GRID */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, index) => (
            <motion.a
  key={link._id}
  href={link.url}
  target="_blank"
  rel="noreferrer"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: index * 0.05,
  }}
  className={`
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-zinc-800
    bg-zinc-900
    p-6
    transition-all

    ${
      index === 0
        ? "md:col-span-2 min-h-[220px]"
        : ""
    }
  `}
>
  {/* Hover Color Layer */}
  <div
    className={`
      absolute
      inset-x-0
      bottom-0
      h-0
      transition-all
      duration-500
      ease-out
      group-hover:h-full
      ${getLinkColor(link.url)}
    `}
  />

  {/* Content */}
  <div className="relative z-10 h-full flex flex-col justify-between">
    <div>
      <div
  className="
    w-12
    h-12
    rounded-full
    border
    border-white/10
    bg-black/40
    backdrop-blur-sm
    flex
    items-center
    justify-center

    text-lime-400

    transition-all
    duration-300

    group-hover:text-white
    group-hover:scale-110
  "
>
  {getLinkIcon(link.url)}
</div>
    </div>

    <div>
      <h2 className="text-white text-2xl font-bold">
        {link.title}
      </h2>

      <p className="text-zinc-400 mt-3 font-medium transition-colors duration-300 group-hover:text-white">
        Open Link →
      </p>
    </div>
  </div>
</motion.a>
          ))}
        </div>

        {links.length === 0 && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center mt-6">
            <p className="text-zinc-500">
              No links available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;