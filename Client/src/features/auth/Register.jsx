import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { FaUser, FaEnvelope, FaRocket } from "react-icons/fa";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { register } from "./auth.api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,

    onSuccess: () => {
      toast.success("Account created successfully");

      navigate("/login");
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
                Create
                <br />
                Account.
              </h1>

              <p className="mt-5 text-zinc-400 text-lg max-w-sm">
                Start building your personalized link profile in seconds.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />

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
                value={formData.password}
                onChange={handleChange}
              />

              <Button disabled={isPending}>
                {isPending
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </form>

            <p className="mt-8 text-center text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-lime-400 hover:text-lime-300"
              >
                Sign In
              </Link>
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:grid grid-cols-4 auto-rows-[180px] gap-4"
          >
            <div className="col-span-2 rounded-3xl bg-lime-400 p-6 flex justify-between">
              <div>
                <p className="text-black/70 text-sm">
                  New Profile
                </p>

                <h3 className="text-black text-2xl font-bold">
                  Username
                </h3>
              </div>

              <FaUser
                size={24}
                className="text-black"
              />
            </div>

            <div className="col-span-2 row-span-2 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between">
              <FaRocket
                size={28}
                className="text-lime-400"
              />

              <div>
                <p className="text-zinc-500">
                  Launch your profile
                </p>

                <h3 className="text-white text-3xl font-bold">
                  LinksHub
                </h3>
              </div>
            </div>

            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <FaEnvelope
                size={26}
                className="text-white"
              />
            </div>

            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <span className="text-3xl">🔗</span>
            </div>

            <div className="col-span-4 rounded-3xl bg-zinc-900 border border-zinc-800 p-5">
              <span className="text-zinc-400">
                Custom Link Page
              </span>
              <h2 className="text-white text-4xl font-bold leading-tight mt-2">
                Share everything from one place
              </h2>
            </div>

            <div className="col-span-4 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-end">
              

              <h2 className="text-white text-4xl font-bold leading-tight mt-2">
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