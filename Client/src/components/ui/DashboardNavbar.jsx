import { useEffect, useRef, useState } from "react";
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

import { interpolate } from "flubber";

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

  const [isDark, setIsDark] = useState(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return true;
  });


  /* ================================= */
  /* LOGO */
  /* ================================= */

  const logoRef = useRef(null);


  /* ================================= */
  /* THEME */
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


  /* ================================= */
  /* LOGO MORPH
  /* ================================= */

  useEffect(() => {

    const logo = logoRef.current;

    if (!logo) return;


    const left =
      logo.querySelector("#logo-left");

    const middle =
      logo.querySelector("#logo-middle");

    const right =
      logo.querySelector("#logo-right");


    /*
    =====================================
    INITIAL PATHS
    =====================================
    */

    const initialPaths = {

      left:
        "M109.5 1.5H0L0.5 457H109.5V256.5H205.5V457H303V234L109.5 149.5V1.5Z",

      middle:
        "M431 134.5H330.5V329L431 455H521.5L622.5 329C623 264.167 623.7 134.5 622.5 134.5H521.5V329H431V134.5Z",

      right:
        "M755.5 0H648H645.5V453H737.5V411.5H944V157.5L755.5 145V0Z"

    };


    /*
    =====================================
    FINAL PATHS
    =====================================
    */

    const finalPaths = {

      left:
        "M109.5 1.5H0L0.5 457H109.5V256.5C109.5 199 205.5 203 205.5 256.5V457H303V234C303 93.5 142.5 94.5 109.5 149.5V1.5Z",

      middle:
        "M431 134.5H330.5V329C337.491 400.741 355.872 430.84 431 455C466.342 461.797 486.157 460.938 521.5 455C590.695 434.156 616.705 410.282 622.5 329C623 264.167 623.7 134.5 622.5 134.5H519.5V329C516 379.5 433.5 375 431 329V134.5Z",

      right:
        "M648 0H755.5V145C836.655 103.605 892.329 104.763 944 157.5C1017.9 232.926 1001.64 341.694 944 411.5C875.815 494.079 740.984 451.707 737.5 414.416V453H645.5V0H648Z"

    };


    /*
    =====================================
    CREATE INTERPOLATORS
    =====================================
    */

    const leftForward =
      interpolate(
        initialPaths.left,
        finalPaths.left,
        {
          maxSegmentLength: 2
        }
      );

    const leftReverse =
      interpolate(
        finalPaths.left,
        initialPaths.left,
        {
          maxSegmentLength: 2
        }
      );


    const middleForward =
      interpolate(
        initialPaths.middle,
        finalPaths.middle,
        {
          maxSegmentLength: 2
        }
      );

    const middleReverse =
      interpolate(
        finalPaths.middle,
        initialPaths.middle,
        {
          maxSegmentLength: 2
        }
      );


    const rightForward =
      interpolate(
        initialPaths.right,
        finalPaths.right,
        {
          maxSegmentLength: 2
        }
      );

    const rightReverse =
      interpolate(
        finalPaths.right,
        initialPaths.right,
        {
          maxSegmentLength: 2
        }
      );


    /*
    =====================================
    ANIMATION STATE
    =====================================
    */

    let animationFrame = null;

    let startTime = null;

    let fromProgress = 0;

    let targetProgress = 0;


    /*
    =====================================
    SPEED
    =====================================
    
    Increase this number = slower
    Decrease this number = faster

    800 = 0.8 seconds
    1000 = 1 second
    1200 = 1.2 seconds
    */

    const duration = 800;


    /*
    =====================================
    EASING
    =====================================
    */

    const ease = (t) => {

      return t < 0.5
        ? 4 * t * t * t
        : 1 -
            Math.pow(
              -2 * t + 2,
              3
            ) / 2;

    };


    /*
    =====================================
    ANIMATE
    =====================================
    */

    const animate = (target) => {

      targetProgress = target;

      if (animationFrame) {
        cancelAnimationFrame(
          animationFrame
        );
      }

      startTime = null;

      fromProgress =
        target === 1
          ? 0
          : 1;


      const frame = (timestamp) => {

        if (!startTime) {
          startTime = timestamp;
        }


        const elapsed =
          timestamp - startTime;


        let progress =
          Math.min(
            elapsed / duration,
            1
          );


        progress = ease(progress);


        const current =
          fromProgress +
          (targetProgress - fromProgress) *
            progress;


        /*
        =================================
        UPDATE PATHS
        =================================
        */

        left.setAttribute(
          "d",
          leftForward(current)
        );

        middle.setAttribute(
          "d",
          middleForward(current)
        );

        right.setAttribute(
          "d",
          rightForward(current)
        );


        if (progress < 1) {

          animationFrame =
            requestAnimationFrame(
              frame
            );

        }

      };


      animationFrame =
        requestAnimationFrame(frame);
    };


    /*
    =====================================
    HOVER IN
    =====================================
    */

    const handleMouseEnter = () => {

      animate(1);

    };


    /*
    =====================================
    HOVER OUT
    =====================================
    */

    const handleMouseLeave = () => {

      /*
      Reverse using the same
      interpolators.
      */

      if (animationFrame) {

        cancelAnimationFrame(
          animationFrame
        );

      }

      let startTime = null;

      const startProgress = 1;

      const endProgress = 0;


      const frame = (timestamp) => {

        if (!startTime) {
          startTime = timestamp;
        }


        const elapsed =
          timestamp - startTime;


        let progress =
          Math.min(
            elapsed / duration,
            1
          );


        progress = ease(progress);


        const current =
          startProgress +
          (endProgress - startProgress) *
            progress;


        left.setAttribute(
          "d",
          leftForward(current)
        );

        middle.setAttribute(
          "d",
          middleForward(current)
        );

        right.setAttribute(
          "d",
          rightForward(current)
        );


        if (progress < 1) {

          animationFrame =
            requestAnimationFrame(
              frame
            );

        }

      };


      animationFrame =
        requestAnimationFrame(frame);
    };


    logo.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    logo.addEventListener(
      "mouseleave",
      handleMouseLeave
    );


    /*
    =====================================
    CLEANUP
    =====================================
    */

    return () => {

      logo.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      logo.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      if (animationFrame) {

        cancelAnimationFrame(
          animationFrame
        );

      }

    };

  }, []);


  /* ================================= */
  /* AUTH */
  /* ================================= */

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


      lastScrollY =
        currentScrollY;

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


  /* ================================= */
  /* RETURN */
  /* ================================= */

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
              rounded-full
              px-3
              py-2
            "
          >

            <div
              ref={logoRef}
              className="
                flex
                h-9
                w-16
                items-center
                justify-center
                cursor-pointer
              "
            >

              <svg
                viewBox="0 0 994 460"
                className="h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  id="logo-left"
                  fill="currentColor"
                  className="theme-text"
                  d="M109.5 1.5H0L0.5 457H109.5V256.5H205.5V457H303V234L109.5 149.5V1.5Z"
                />

                <path
                  id="logo-middle"
                  fill="currentColor"
                  className="theme-text"
                  d="M431 134.5H330.5V329L431 455H521.5L622.5 329C623 264.167 623.7 134.5 622.5 134.5H521.5V329H431V134.5Z"
                />

                <path
                  id="logo-right"
                  fill="currentColor"
                  className="theme-text"
                  d="M755.5 0H648H645.5V453H737.5V411.5H944V157.5L755.5 145V0Z"
                />

               <ellipse
  cx="812"
  cy="288"
  rx="75.5"
  ry="78.5"
  fill={isDark ? "#000000" : "#FFFFFF"}
  style={{
    transition: "fill 250ms ease",
  }}
/>
              </svg>

            </div>

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
              active={
                location.pathname.startsWith(
                  "/dashboard/library"
                )
              }
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

                  {/* USER INFO */}

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

                    {/* VIEW PROFILE */}

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


                    {/* THEME SWITCH */}

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


                    {/* LOGOUT */}

                    <motion.button
                      type="button"
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

