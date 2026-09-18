import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CipherText from "../../components/ui/CipherText";

const Hero = () => {
  return (
    <section className="relative  overflow-hidden">
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-0 right-0 top-[120px] landing-grid-horizontal landing-grid-delay-1" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Hero copy */}
        <div className="flex min-h-[680px] flex-col items-center justify-center py-24 text-center sm:min-h-[760px]">
          <div>
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--muted)] sm:text-xs">
              Your developer identity
            </p>

            <h1 className="max-w-5xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[92px]">
              Everything you build.
              <br />
              <span className="text-[var(--muted)]">
                One place to share it.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
              LinksHub brings your links, projects, GitHub, coding profiles
              and developer work together into one profile you can share
              anywhere.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="group flex items-center gap-2 bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-transform hover:-translate-y-0.5"
              >
              <CipherText>Create your profile</CipherText>

                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <a
                href="#how-it-works"
                className="flex items-center gap-2 border border-[var(--border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--surface-secondary)]"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Product showcase */}
          <div className="relative mt-20 w-full">
            {/* Decorative corner marks */}
            <div className="absolute -left-2 -top-2 z-20 h-8 w-8 border-l border-t border-dashed border-[var(--foreground)]" />
            <div className="absolute -right-2 -top-2 z-20 h-8 w-8 border-r border-t border-dashed border-[var(--foreground)]" />
            <div className="absolute -bottom-2 -left-2 z-20 h-8 w-8 border-b border-l border-dashed border-[var(--foreground)]" />
            <div className="absolute -bottom-2 -right-2 z-20 h-8 w-8 border-b border-r border-dashed border-[var(--foreground)]" />

            {/* Real LinksHub desktop screenshot */}
            <div className="relative mx-auto w-full overflow-hidden border border-dashed border-[var(--border)] bg-[var(--surface)]">
              <img
                src="/images/landing/profile-desktop.png"
                alt="LinksHub developer profile"
                className="block h-auto w-full"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;