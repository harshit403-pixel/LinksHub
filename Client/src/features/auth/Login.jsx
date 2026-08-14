import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGlobe, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl rounded-[32px] border border-zinc-800 bg-[#050505] p-4 md:p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-8 md:p-12 flex flex-col justify-center min-h-[650px]"
          >
            <div className="mb-7">

              <h1 className="text-6xl font-black text-white leading-none">
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
  <div className="h-px flex-1 bg-zinc-800" />

  <span className="text-xs font-medium uppercase tracking-wider text-zinc-600">
    OR
  </span>

  <div className="h-px flex-1 bg-zinc-800" />
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
    border-zinc-700
    bg-black
    px-6
    py-4
    font-semibold
    text-white
    transition

    hover:border-zinc-500
    hover:bg-zinc-950

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
    fill="#a3e635"
  />

  <path
    d="M12.04 22c2.79 0 5.13-.925 6.84-2.505l-3.343-2.523c-.927.62-2.11.987-3.497.987-2.69 0-4.97-1.82-5.787-4.267H2.797v2.605A10.34 10.34 0 0 0 12.04 22z"
    fill="#a3e635"
  />

  <path
    d="M6.253 13.692A6.213 6.213 0 0 1 5.93 12c0-.587.108-1.157.323-1.692V7.703H2.797A10.002 10.002 0 0 0 1.73 12c0 1.55.372 3.017 1.067 4.297l3.456-2.605z"
    fill="#a3e635"
  />

  <path
    d="M12.04 6.041c1.518 0 2.88.522 3.953 1.547l2.964-2.964C17.165 2.986 14.826 2 12.04 2a10.34 10.34 0 0 0-9.243 5.703l3.456 2.605c.817-2.447 3.097-4.267 5.787-4.267z"
    fill="#a3e635"
  />
</svg>

  Continue with Google
</button>
            </form>

            <p className="mt-8 text-center text-zinc-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-lime-400 hover:text-lime-300"
              >
                Register
              </Link>
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:grid grid-cols-4 auto-rows-[165px] gap-4"
          >
            <div className="col-span-2 row-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center">
                <span className="font-bold text-black">H</span>
              </div>

              <div>
                <p className="text-zinc-500">Show Your Prescence</p>
                <h3 className="text-white text-3xl font-bold">
                  LinksHub
                </h3>
              </div>
            </div>

            <div className="col-span-2 rounded-3xl bg-lime-400 p-6 flex justify-between">
              <div>
                <p className="text-black/70 text-sm">
                  Featured
                </p>

                <h3 className="text-black text-2xl font-bold">
                  Portfolio
                </h3>
              </div>

              <FaGlobe
                size={24}
                className="text-black"
              />
            </div>

            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <FaGithub
                size={28}
                className="text-white"
              />
            </div>

            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <FaInstagram
                size={28}
                className="text-white"
              />
            </div>

            <div className="col-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 p-5 flex justify-between">
              <span className="text-white font-medium">
                LinkedIn
              </span>

              <FaLinkedin
                size={22}
                className="text-lime-400"
              />
            </div>
            <div className="col-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 p-5 flex justify-between">
              <span className="text-white font-medium">
                YouTube
              </span>

              <FaYoutube
                size={22}
                className="text-lime-400"
              />
            </div>

            <div className="col-span-4 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-end">



              <h2 className="text-white text-4xl font-bold leading-tight">
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