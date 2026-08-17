import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaGlobe,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useLogin } from "./useLogin";

function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const { mutate, isPending } = useLogin();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "/api/auth/google";
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        p-4

        theme-bg
        theme-text

        transition-colors
        duration-250
      "
    >
      <div
        className="
          w-full
          max-w-7xl
          rounded-[32px]
          border
          theme-border
          theme-surface
          p-4
          transition-colors
          duration-250
          md:p-6
        "
      >
        <div className="grid gap-6 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              flex
              min-h-[650px]
              flex-col
              justify-center
              rounded-[28px]
              border
              theme-border
              theme-surface-secondary
              p-8
              transition-colors
              duration-250
              md:p-12
            "
          >
            <div className="mb-7">

              <h1
                className="
                  text-6xl
                  font-black
                  leading-none
                  theme-text
                "
              >
                Welcome
                <br />
                Back.
              </h1>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <Input
                label="Email or Username"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <Button disabled={isPending}>
                {isPending
                  ? "Signing In..."
                  : "Sign In"}
              </Button>

              <div className="relative flex items-center gap-1">
                <div
                  className="
                    h-px
                    flex-1
                    theme-border
                    border-t
                  "
                />

                <span
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-wider
                    theme-muted
                  "
                >
                  OR
                </span>

                <div
                  className="
                    h-px
                    flex-1
                    theme-border
                    border-t
                  "
                />
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isPending}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  theme-border
                  theme-bg
                  px-6
                  py-4
                  font-semibold
                  theme-text
                  transition-all
                  duration-200

                  hover:border-[var(--border-hover)]
                  hover:scale-[1.01]

                  active:scale-[0.98]

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.27-.968 2.34-2.066 3.057v2.523h3.343c1.957-1.803 3.088-4.46 3.088-7.534 0-.715-.064-1.407-.217-2z"
                    fill="var(--accent)"
                  />

                  <path
                    d="M12.04 22c2.79 0 5.13-.925 6.84-2.505l-3.343-2.523c-.927.62-2.11.987-3.497.987-2.69 0-4.97-1.82-5.787-4.267H2.797v2.605A10.34 10.34 0 0 0 12.04 22z"
                    fill="var(--accent)"
                  />

                  <path
                    d="M6.253 13.692A6.213 6.213 0 0 1 5.93 12c0-.587.108-1.157.323-1.692V7.703H2.797A10.002 10.002 0 0 0 1.73 12c0 1.55.372 3.017 1.067 4.297l3.456-2.605z"
                    fill="var(--accent)"
                  />

                  <path
                    d="M12.04 6.041c1.518 0 2.88.522 3.953 1.547l2.964-2.964C17.165 2.986 14.826 2 12.04 2a10.34 10.34 0 0 0-9.243 5.703l3.456 2.605c.817-2.447 3.097-4.267 5.787-4.267z"
                    fill="var(--accent)"
                  />
                </svg>

                Continue with Google
              </button>
            </form>

            <p
              className="
                mt-8
                text-center
                theme-muted
              "
            >
              Don't have an account?{" "}

              <Link
                to="/register"
                className="
                  font-semibold
                  theme-accent
                  transition-colors
                  hover:opacity-80
                "
              >
                Register
              </Link>
            </p>
          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              hidden
              auto-rows-[165px]
              grid-cols-4
              gap-4
              lg:grid
            "
          >

            {/* BRAND CARD */}

            <div
              className="
                col-span-2
                row-span-2
                flex
                flex-col
                justify-between
                rounded-3xl
                border
                theme-border
                theme-surface-secondary
                p-6
                transition-colors
                duration-250
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  theme-accent-bg
                "
              >
                <span className="font-bold">
                  H
                </span>
              </div>

              <div>
                <p className="theme-muted">
                  Show Your Presence
                </p>

                <h3
                  className="
                    text-3xl
                    font-bold
                    theme-text
                  "
                >
                  LinksHub
                </h3>
              </div>
            </div>

            {/* FEATURED */}

            <div
              className="
                col-span-2
                flex
                justify-between
                rounded-3xl
                theme-accent-bg
                p-6
                transition-colors
                duration-250
              "
            >
              <div>
                <p className="text-sm opacity-70">
                  Featured
                </p>

                <h3 className="text-2xl font-bold">
                  Portfolio
                </h3>
              </div>

              <FaGlobe
                size={24}
              />
            </div>

            {/* GITHUB */}

            <div
              className="
                flex
                items-center
                justify-center
                rounded-3xl
                border
                theme-border
                theme-surface-secondary
                transition-colors
                duration-250
              "
            >
              <FaGithub
                size={28}
                className="theme-text"
              />
            </div>

            {/* INSTAGRAM */}

            <div
              className="
                flex
                items-center
                justify-center
                rounded-3xl
                border
                theme-border
                theme-surface-secondary
                transition-colors
                duration-250
              "
            >
              <FaInstagram
                size={28}
                className="theme-text"
              />
            </div>

            {/* LINKEDIN */}

            <div
              className="
                col-span-2
                flex
                justify-between
                rounded-3xl
                border
                theme-border
                theme-surface-secondary
                p-5
                transition-colors
                duration-250
              "
            >
              <span
                className="
                  font-medium
                  theme-text
                "
              >
                LinkedIn
              </span>

              <FaLinkedin
                size={22}
                className="theme-accent"
              />
            </div>

            {/* YOUTUBE */}

            <div
              className="
                col-span-2
                flex
                justify-between
                rounded-3xl
                border
                theme-border
                theme-surface-secondary
                p-5
                transition-colors
                duration-250
              "
            >
              <span
                className="
                  font-medium
                  theme-text
                "
              >
                YouTube
              </span>

              <FaYoutube
                size={22}
                className="theme-accent"
              />
            </div>

            {/* BOTTOM CARD */}

            <div
              className="
                col-span-4
                flex
                flex-col
                justify-end
                rounded-3xl
                border
                theme-border
                theme-surface-secondary
                p-6
                transition-colors
                duration-250
              "
            >
              <h2
                className="
                  text-4xl
                  font-bold
                  leading-tight
                  theme-text
                "
              >
                One profile.
                <br />
                All your links.
              </h2>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;