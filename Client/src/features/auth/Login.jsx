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
            <div className="mb-14">

              <h1 className="text-6xl font-black text-white leading-none">
                Welcome
                <br />
                Back.
              </h1>

              <p className="mt-5 text-zinc-400 text-lg max-w-sm">
                Build a beautiful profile and manage all your links from one place.
              </p>
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
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
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
            className="hidden lg:grid grid-cols-4 auto-rows-[150px] gap-4"
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
              <p className="text-zinc-500 text-sm">
                Build beautiful link pages
              </p>

              <h2 className="text-white text-4xl font-bold leading-tight mt-2">
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