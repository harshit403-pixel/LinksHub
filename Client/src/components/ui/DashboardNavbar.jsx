import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaChartBar,
  FaHome,
  FaLink,
  FaSignOutAlt,
  FaTrash,
  FaUser,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import { useAuth } from "../../features/auth/useAuth";
import { useLogout } from "../../features/auth/useLogout";

function DashboardNavbar() {
  const { data: authData } = useAuth();
  const { mutate: logout } = useLogout();

  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [visible, setVisible] =
    useState(true);

  const [isAtTop, setIsAtTop] =
    useState(true);

  /* ================================= */
  /* THEME */
  /* ================================= */

  const [isDark, setIsDark] = useState(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return true;
  });

  /* ================================= */
  /* APPLY THEME */
  /* ================================= */

  useEffect(() => {
    const root =
      document.documentElement;

    if (isDark) {
      root.classList.add("dark");

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      root.classList.remove("dark");

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [isDark]);

  /* ================================= */
  /* TOGGLE THEME */
  /* ================================= */

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const profileUrl =
    `/${authData?.user?.username}`;

  const profilePicture =
    authData?.user?.profilePicture;

  const username =
    authData?.user?.username || "User";

  /* ================================= */
  /* SCROLL */
  /* ================================= */

  useEffect(() => {
    let lastScrollY =
      window.scrollY;

    const handleScroll = () => {
      const currentScrollY =
        window.scrollY;

      setIsAtTop(
        currentScrollY <= 20
      );

      if (currentScrollY <= 20) {
        setVisible(true);
      } else if (
        currentScrollY > lastScrollY
      ) {
        setVisible(false);
        setIsProfileOpen(false);
      } else if (
        currentScrollY < lastScrollY
      ) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ================================= */
  /* CLOSE PROFILE ON ROUTE CHANGE */
  /* ================================= */

  useEffect(() => {
    setIsProfileOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: visible ? 0 : -120,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 30,
        mass: 0.8,
      }}
      className="
        fixed
        top-4
        left-0
        right-0
        z-50
        flex
        justify-center
        px-4
        pointer-events-none
      "
    >
      <div
        className="
          relative
          w-full
          max-w-7xl
          pointer-events-auto
        "
        onMouseLeave={() =>
          setIsProfileOpen(false)
        }
      >
        <motion.nav
          layout
          className="
            relative
            flex
            items-center
            justify-between
            rounded-full
            border
            theme-border
            theme-bg/20
            px-4
            py-2.5
            shadow-2xl
            shadow-black/10
            backdrop-blur-xl
            transition-colors
            duration-250
          "
        >
          {/* ================================= */}
          {/* LOGO */}
          {/* ================================= */}

          <Link
            to="/dashboard"
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              px-3
              py-2
            "
          >
            <motion.div
              whileHover={{
                rotate: -8,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                theme-accent-bg
              "
            >
              L
            </motion.div>
          </Link>

          {/* ================================= */}
          {/* NAVIGATION */}
          {/* ================================= */}

          <div
            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-[var(--surface-secondary)]
              p-1
              transition-colors
              duration-250
            "
          >
            <NavItem
              to="/dashboard"
              icon={<FaHome />}
              label="Dashboard"
              active={
                location.pathname ===
                "/dashboard"
              }
            />

            <NavItem
              to="/dashboard/library"
              icon={<FaLink />}
              label="Library"
              active={location.pathname.startsWith(
                "/dashboard/library"
              )}
            />

            <NavItem
              to="/dashboard/analytics"
              icon={<FaChartBar />}
              label="Analytics"
              active={
                location.pathname ===
                "/dashboard/analytics"
              }
            />

            <NavItem
              to="/dashboard/deleted"
              icon={<FaTrash />}
              label="Deleted"
              active={
                location.pathname ===
                "/dashboard/deleted"
              }
            />
          </div>

          {/* ================================= */}
          {/* PROFILE */}
          {/* ================================= */}

          <div
            className="
              relative
              flex
              shrink-0
              items-center
            "
            onMouseEnter={() =>
              setIsProfileOpen(true)
            }
          >
            <motion.button
              type="button"
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.94,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              onClick={() =>
                setIsProfileOpen(
                  (prev) => !prev
                )
              }
              className="
                relative
                h-10
                w-10
                cursor-pointer
                overflow-hidden
                rounded-full
                border
                theme-border
                theme-surface-secondary
                transition-colors
                duration-250
              "
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={username}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    theme-accent-bg
                  "
                >
                  <FaUser size={15} />
                </div>
              )}

              <span
                className="
                  absolute
                  bottom-0.5
                  right-0.5
                  h-2.5
                  w-2.5
                  rounded-full
                  border-2
                  border-[var(--surface)]
                  theme-accent-bg
                "
              />
            </motion.button>

            {/* ================================= */}
            {/* PROFILE DROPDOWN */}
            {/* ================================= */}

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.7,
                  }}
                  className="
                    absolute
                    right-0
                    top-[calc(100%+12px)]
                    w-64
                    overflow-hidden
                    rounded-3xl
                    border
                    theme-border
                    theme-surface
                    p-2
                    shadow-2xl
                    shadow-black/15
                    backdrop-blur-2xl
                    transition-colors
                    duration-250
                  "
                  onMouseEnter={() =>
                    setIsProfileOpen(true)
                  }
                >
                  {/* ================================= */}
                  {/* USER INFO */}
                  {/* ================================= */}

                  <div
                    className="
                      mb-1
                      rounded-2xl
                      bg-[var(--surface-secondary)]
                      p-4
                      transition-colors
                      duration-250
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          h-11
                          w-11
                          overflow-hidden
                          rounded-full
                          border
                          theme-border
                          theme-accent-bg
                        "
                      >
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            alt={username}
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                            "
                          >
                            <FaUser />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            font-semibold
                            theme-text
                          "
                        >
                          {authData?.user
                            ?.displayName ||
                            username}
                        </p>

                        <p
                          className="
                            truncate
                            text-xs
                            theme-muted
                          "
                        >
                          @{username}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">

                    {/* ================================= */}
                    {/* VIEW PROFILE */}
                    {/* ================================= */}

                    <Link
                      to={profileUrl}
                      target="_blank"
                      onClick={() =>
                        setIsProfileOpen(false)
                      }
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        theme-text
                        hover:bg-[var(--surface-secondary)]
                        transition-colors
                        duration-200
                      "
                    >
                      <FaUser
                        className="
                          theme-muted
                          transition-colors
                          duration-200
                          group-hover:text-[var(--accent)]
                        "
                      />

                      <span>
                        View Profile
                      </span>
                    </Link>

                    {/* ================================= */}
                    {/* THEME SWITCH */}
                    {/* ================================= */}

                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="
                        group
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        theme-text
                        hover:bg-[var(--surface-secondary)]
                        transition-colors
                        duration-200
                      "
                    >
                      <div className="flex items-center gap-3">
                        {isDark ? (
                          <FaMoon
                            className="
                              theme-accent
                            "
                          />
                        ) : (
                          <FaSun
                            className="
                              theme-accent
                            "
                          />
                        )}

                        <span>
                          {isDark
                            ? "Dark Mode"
                            : "Light Mode"}
                        </span>
                      </div>

                      {/* Toggle */}

                      <div
                        className="
                          relative
                          h-6
                          w-11
                          rounded-full
                          theme-accent-bg
                          transition-colors
                          duration-300
                        "
                      >
                        <motion.div
                          animate={{
                            x: isDark
                              ? 20
                              : 2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="
                            absolute
                            top-1
                            h-4
                            w-4
                            rounded-full
                            bg-white
                            shadow-sm
                          "
                        />
                      </div>
                    </button>

                    {/* ================================= */}
                    {/* LOGOUT */}
                    {/* ================================= */}

                    <motion.button
                      whileHover={{
                        x: 3,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      onClick={() => {
                        setIsProfileOpen(
                          false
                        );

                        logout();
                      }}
                      className="
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        text-[var(--danger)]
                        hover:bg-[color-mix(in_srgb,var(--danger)_10%,transparent)]
                        transition-colors
                        duration-200
                      "
                    >
                      <FaSignOutAlt />

                      <span>
                        Logout
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}

/* ================================= */
/* NAV ITEM */
/* ================================= */

function NavItem({
  to,
  icon,
  label,
  active,
}) {
  return (
    <Link
      to={to}
      className="
        group
        relative
        flex
        items-center
        gap-2
        rounded-full
        px-4
        py-2.5
        text-sm
      "
    >
      {active && (
        <motion.span
          layoutId="active-nav"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
            mass: 0.7,
          }}
          className="
            absolute
            inset-0
            rounded-full
            theme-accent-bg
          "
        />
      )}

      <span
        className={`
          relative
          z-10
          text-[13px]
          transition-colors
          duration-200

          ${
            active
              ? "text-[var(--accent-foreground)]"
              : "theme-muted group-hover:text-[var(--accent)]"
          }
        `}
      >
        {icon}
      </span>

      <span
        className={`
          relative
          z-10
          hidden
          md:block
          transition-colors
          duration-200

          ${
            active
              ? "font-semibold text-[var(--accent-foreground)]"
              : "theme-muted group-hover:theme-text"
          }
        `}
      >
        {label}
      </span>
    </Link>
  );
}

export default DashboardNavbar;