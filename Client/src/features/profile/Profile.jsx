import { motion, AnimatePresence } from "motion/react";
import { useParams } from "react-router-dom";
import { getLinkIcon } from "./getLinkIcon";
import { useProfileLinks } from "./useProfileLinks";
import {
  FaShareAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import ProfileShareModal from "./ProfileShareModal";
import { getLinkColor } from "./getLinkColor";
import { useState } from "react";
import FeaturedProjects from "./FeaturedProjects";
import ProfileAISearch from "./ProfileAISearch";

const Divider = () => (
  <div className="border-t border-dashed border-[var(--border)]" />
);

const Column = ({
  className = "",
  children,
}) => (
  <div
    className={`mx-auto max-w-3xl px-5 sm:px-8 ${className}`}
  >
    {children}
  </div>
);

function Profile() {
  const { username } = useParams();

  const { data, isLoading, isError } =
    useProfileLinks();

  const [shareOpen, setShareOpen] =
    useState(false);

  const [isDark, setIsDark] = useState(true);

  const toggleTheme = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    document.documentElement.style.setProperty(
      "--theme-x",
      `${x}px`
    );

    document.documentElement.style.setProperty(
      "--theme-y",
      `${y}px`
    );

    const changeTheme = () => {
      setIsDark((prev) => !prev);
    };

    if (
      document.startViewTransition
    ) {
      document.startViewTransition(
        changeTheme
      );
    } else {
      changeTheme();
    }
  };

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
  const projects = data?.projects || [];

  const aiSuggestions = [
    ...new Set(
      projects.flatMap(
        (project) =>
          project.questions || []
      )
    ),
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const profile = data?.profile;

  const currentTheme =
    profile?.theme || "lime";

  const themeText =
    currentTheme === "blue"
      ? "text-blue-500"
      : currentTheme === "purple"
      ? "text-purple-500"
      : currentTheme === "rose"
      ? "text-rose-500"
      : "text-lime-400";

  const aboutPoints = profile?.bio
    ? profile.bio
        .split(/(?<=[.!?])\s+/)
        .map((sentence) =>
          sentence.trim()
        )
        .filter(Boolean)
    : [];

  return (
    <div className={isDark ? "dark" : ""}>
      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
        }

        ::view-transition-old(root) {
          z-index: 1;
        }

        ::view-transition-new(root) {
          z-index: 2;
          animation: theme-reveal 1600ms
            cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes theme-reveal {
          from {
            clip-path: circle(
              0px at var(--theme-x) var(--theme-y)
            );
          }

          to {
            clip-path: circle(
              150vmax at var(--theme-x) var(--theme-y)
            );
          }
        }

        ::view-transition-group(root) {
          animation-duration: 650ms;
        }
      `}</style>

      <div
        className="
          relative
          min-h-screen
          bg-[var(--background)]
          text-[var(--foreground)]
          transition-colors
          duration-300
        "
      >
        {/* Vertical guide lines */}

        <div className="pointer-events-none absolute inset-y-0 left-[calc(50%-24rem)] hidden w-px bg-[var(--border)] sm:block" />

        <div className="pointer-events-none absolute inset-y-0 left-[calc(50%+24rem)] hidden w-px bg-[var(--border)] sm:block" />

        {/* NAV */}

        <Column className="flex items-center justify-between py-4">
          <span className="font-serif text-xl text-[var(--foreground)]">
            {profile?.displayName ||
              `@${username}`}
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="
              relative
              z-10
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[var(--border)]
              text-[var(--muted)]
              transition-all
              duration-300
              hover:border-[var(--muted-foreground)]
              hover:text-[var(--foreground)]
              hover:scale-105
              active:scale-95
            "
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={
                  isDark
                    ? "moon"
                    : "sun"
                }
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.5,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                {isDark ? (
                  <FaMoon size={14} />
                ) : (
                  <FaSun size={14} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </Column>

        <Divider />

        {/* HEADER */}

        <Column>
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="py-8 sm:py-10"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center">
                {profile?.profilePicture ? (
                  <img
                    src={
                      profile.profilePicture
                    }
                    alt={
                      profile?.displayName
                    }
                    className="
                      h-20
                      w-20
                      shrink-0
                      rounded-2xl
                      border
                      border-[var(--border)]
                      object-cover
                      sm:h-24
                      sm:w-24
                    "
                  />
                ) : (
                  <div
                    className={`
                      flex
                      h-20
                      w-20
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      text-2xl
                      font-bold
                      text-black
                      sm:h-24
                      sm:w-24
                      sm:text-3xl
                      ${
                        currentTheme ===
                        "blue"
                          ? "bg-blue-500"
                          : currentTheme ===
                            "purple"
                          ? "bg-purple-500"
                          : currentTheme ===
                            "rose"
                          ? "bg-rose-500"
                          : "bg-lime-400"
                      }
                    `}
                  >
                    {(
                      profile?.displayName ||
                      username
                    )?.[0]?.toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h1 className="break-words font-serif text-3xl text-[var(--foreground)] sm:text-4xl">
                    {profile?.displayName ||
                      `@${username}`}
                  </h1>

                  <p
                    className={`${themeText} mt-1.5 break-all text-sm font-semibold sm:text-base`}
                  >
                    @{profile?.username}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setShareOpen(true)
                }
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  self-start
            
                  border
                  border-[var(--border)]
                  text-[var(--muted)]
                  transition-colors
                  duration-300
                  hover:border-[var(--muted-foreground)]
                  hover:text-[var(--foreground)]
                  sm:h-11
                  sm:w-11
                  sm:self-auto
                "
              >
                <FaShareAlt className="text-sm sm:text-base" />
              </button>
            </div>
          </motion.div>
        </Column>

        {/* ABOUT */}

        {aboutPoints.length > 0 && (
          <>
            <Divider />

            <Column>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="py-8 sm:py-10"
              >
                <h2 className="mb-5 font-serif text-2xl text-[var(--foreground)] sm:mb-6 sm:text-3xl">
                  About
                </h2>

                <ul className="space-y-3">
                  {aboutPoints.map(
                    (point, i) => (
                      <li
                        key={i}
                        className="
                          flex
                          gap-3
                          text-sm
                          leading-relaxed
                          text-[var(--muted-foreground)]
                          sm:text-base
                        "
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />

                        <span className="break-words">
                          {point}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            </Column>
          </>
        )}

       <div className={isDark ? "flex flex-col gap-4 bg-white/6" : "flex flex-col gap-4 bg-black/6"} >
         <Divider />
        <Divider />
       </div>

        {/* AI ASSISTANT */}

        <Column>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className="py-8 sm:py-10"
          >
            <h2 className="mb-5 font-serif text-2xl text-[var(--foreground)] sm:mb-6 sm:text-3xl">
              AI Assistant
            </h2>

            <ProfileAISearch
              username={
                profile.username
              }
              suggestions={
                aiSuggestions
              }
            />
          </motion.div>
        </Column>

                  <div className={isDark ? "flex flex-col gap-4 bg-white/6" : "flex flex-col gap-4 bg-black/6"} >

         <Divider />
        <Divider />
       </div>

        {/* LINKS */}

       <Column>
  <div className="py-8 sm:py-10">
    <div className="mb-6">
      <h2 className="font-serif text-2xl text-[var(--foreground)] sm:text-3xl">
        Links
      </h2>

      <p className="mt-1 text-sm text-[var(--muted)]">
        Where to find me.
      </p>
    </div>

    <div className="flex flex-wrap border-l-2 border-t border-dashed border-[var(--border)]">
      {links.map((link, index) => (
        <motion.a
          key={link._id}
          href={`/api/links/go/${link._id}`}
          target="_blank"
          rel="noreferrer"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.05,
          }}
          className="
            group
            flex
            min-h-[76px]
            flex-1
            basis-[220px]
            items-center
            justify-between
            gap-4
            border-b
            border-r-2
            border-dashed
            border-[var(--border)]
            px-5
            py-3
            transition-colors
            hover:bg-[var(--surface-secondary)]
            sm:px-6
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                text-[var(--foreground)]
                transition-all
                duration-300
                group-hover:scale-105
              "
            >
              {getLinkIcon(link.url)}
            </div>

            <span
              className="
                min-w-0
                truncate
                text-base
                font-medium
                text-[var(--foreground)]
                sm:text-lg
              "
            >
              {link.title}
            </span>
          </div>

          <span
            className="
              shrink-0
              text-lg
              text-[var(--muted)]
              transition-transform
              duration-300
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          >
            ↗
          </span>
        </motion.a>
      ))}
    </div>

    {links.length === 0 && (
      <div className="border border-dashed border-[var(--border)] p-6 text-center sm:p-10">
        <p className="text-[var(--muted)]">
          No links available
        </p>
      </div>
    )}
  </div>
</Column>
        {/* PROJECTS */}

        {projects.length > 0 && (
          <>
                              <div className={isDark ? "flex flex-col gap-4 bg-white/6" : "flex flex-col gap-4 bg-black/6"} >

         <Divider />
        <Divider />
       </div>

            <Column>
              <div className="py-8 sm:py-10">
                <FeaturedProjects
                  projects={projects}
                />
              </div>
            </Column>
          </>
        )}

        {/* SHARE */}

        {shareOpen && (
          <ProfileShareModal
            profileUrl={
              window.location.href
            }
            onClose={() =>
              setShareOpen(false)
            }
          />
        )}
      </div>
    </div>
  );
}

export default Profile;