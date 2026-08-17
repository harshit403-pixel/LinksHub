import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import {
  FaUser,
  FaEnvelope,
  FaRocket,
} from "react-icons/fa";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMe,
  register,
} from "./auth.api";

function Register() {
  const RESERVED_USERNAMES = [
    "admin",
    "api",
    "login",
    "register",
    "dashboard",
    "analytics",
    "settings",
    "profile",
    "support",
    "help",
  ];

  const validateUsername = (username) => {
    if (!username) {
      return {
        valid: false,
        message: "",
      };
    }

    if (username.length < 3) {
      return {
        valid: false,
        message: "Minimum 3 characters",
      };
    }

    if (username.length > 20) {
      return {
        valid: false,
        message: "Maximum 20 characters",
      };
    }

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return {
        valid: false,
        message:
          "Only letters and numbers allowed",
      };
    }

    if (
      RESERVED_USERNAMES.includes(
        username.toLowerCase()
      )
    ) {
      return {
        valid: false,
        message: "Reserved username",
      };
    }

    return {
      valid: true,
      message: "Username looks good",
    };
  };

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const usernameValidation =
    validateUsername(
      formData.username
    );

  const queryClient =
    useQueryClient();

  const {
    mutate,
    isPending,
  } = useMutation({
    mutationFn: register,

    onSuccess: async () => {
      try {
        queryClient.removeQueries({
          queryKey: ["auth"],
        });

        await new Promise((r) =>
          setTimeout(r, 100)
        );

        await queryClient.fetchQuery({
          queryKey: ["auth"],
          queryFn: getMe,
        });

        navigate("/dashboard");

        toast.success(
          "Welcome to LinksHub"
        );
      } catch (err) {
        console.log(err);
      }
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
      );
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  const handleGoogleRegister = () => {
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
                Create
                <br />
                Account.
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <div>
                <Input
                  label="Username"
                  name="username"
                  value={
                    formData.username
                  }
                  onChange={
                    handleChange
                  }
                />

                {formData.username && (
                  <p
                    className={`
                      mt-2
                      text-sm
                      ${
                        usernameValidation.valid
                          ? "theme-accent"
                          : "text-[var(--danger)]"
                      }
                    `}
                  >
                    {
                      usernameValidation.message
                    }
                  </p>
                )}
              </div>

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={
                  formData.password
                }
                onChange={handleChange}
              />

              <Button
                disabled={
                  isPending ||
                  !usernameValidation.valid
                }
              >
                {isPending
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              {/* OR */}

              <div
                className="
                  relative
                  flex
                  items-center
                  gap-1
                "
              >
                <div
                  className="
                    h-px
                    flex-1
                    border-t
                    theme-border
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
                    border-t
                    theme-border
                  "
                />
              </div>

              {/* GOOGLE */}

              <button
                type="button"
                onClick={
                  handleGoogleRegister
                }
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
              Already have an account?{" "}

              <Link
                to="/login"
                className="
                  font-semibold
                  theme-accent
                  transition-colors
                  hover:opacity-80
                "
              >
                Sign In
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
              grid-cols-4
              gap-4
              auto-rows-[189px]
              lg:grid
            "
          >

            {/* USERNAME */}

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
                  New Profile
                </p>

                <h3 className="text-2xl font-bold">
                  Username
                </h3>
              </div>

              <FaUser
                size={24}
              />
            </div>

            {/* ROCKET */}

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
              <FaRocket
                size={28}
                className="theme-accent"
              />

              <div>
                <p className="theme-muted">
                  Launch your profile
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

            {/* EMAIL */}

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
              <FaEnvelope
                size={26}
                className="theme-text"
              />
            </div>

            {/* LINK */}

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
              <span
                className="
                  text-3xl
                  theme-accent
                "
              >
                🔗
              </span>
            </div>

            {/* CUSTOM LINK */}

            <div
              className="
                col-span-4
                rounded-3xl
                border
                theme-border
                theme-surface-secondary
                p-5
                transition-colors
                duration-250
              "
            >
              <span className="theme-muted">
                Custom Link Page
              </span>

              <h2
                className="
                  mt-2
                  text-4xl
                  font-bold
                  leading-tight
                  theme-text
                "
              >
                Share everything
                from one place
              </h2>
            </div>

            {/* BOTTOM */}

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
                  mt-2
                  text-4xl
                  font-bold
                  leading-tight
                  theme-text
                "
              >
                Create.
                <br />
                Customize.
                <br />
                Share.
              </h2>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Register;