import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link2, Menu, X, ArrowUpRight } from "lucide-react";
import BracketFrame from "../../components/ui/BracketFrame";
import CipherText from "../../components/ui/CipherText";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "AI assistant", href: "#ai-assistant" },
  { label: "FAQ", href: "#faq" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setOpen(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
<div className="relative h-14 sm:h-20">
  <header
    className={`
      fixed
      left-0
      right-0
      top-0
      z-50
      px-4
      pt-4
      sm:px-6
      transition-transform
      duration-300
      ease-out
      ${
        showNavbar
          ? "translate-y-0"
          : "-translate-y-[calc(100%+1rem)]"
      }
    `}
  >
      <BracketFrame
        bordered
        size={10}
        inset={-5}
        className="
          flex
          h-16
          items-center
          justify-between
          rounded-xl
          border
          border-dashed
          border-[var(--border)]
          bg-[var(--background)]
          px-5
          sm:px-6
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-semibold tracking-tight"
        >
          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-md
              bg-[var(--foreground)]
              text-[var(--background)]
            "
          >
            <Link2 size={15} strokeWidth={2.5} />
          </span>

          LinksHub
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 font-display text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                text-[var(--muted)]
                transition-colors
                hover:text-[var(--foreground)]
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 font-display text-sm md:flex">
          <Link
            to="/login"
            className="
              px-4
              py-2
              text-[var(--muted)]
              transition-colors
              hover:text-[var(--foreground)]
            "
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="
              group
              flex
              items-center
              gap-1.5
              border
              border-[var(--foreground)]
              px-4
              py-2
              text-[var(--foreground)]
              transition-colors
              hover:bg-[var(--foreground)]
              hover:text-[var(--background)]
            "
          >
            <CipherText>Get started</CipherText>

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

        {/* Mobile button */}
        <button
          type="button"
          className="text-[var(--foreground)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </BracketFrame>

      {/* Mobile menu */}
      {open && (
        <div
          className="
            mt-2
            border
            border-dashed
            border-[var(--border)]
            bg-[var(--background)]
            px-5
            py-5
            font-display
            text-sm
            md:hidden
          "
        >
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                  border-b
                  border-dashed
                  border-[var(--border)]
                  py-3
                  text-[var(--muted)]
                  transition-colors
                  hover:text-[var(--foreground)]
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 pt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="
                flex-1
                border
                border-dashed
                border-[var(--border)]
                px-4
                py-2.5
                text-center
                text-[var(--muted)]
                transition-colors
                hover:text-[var(--foreground)]
              "
            >
              Sign in
            </Link>

            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="
                flex-1
                border
                border-[var(--foreground)]
                px-4
                py-2.5
                text-center
                text-[var(--foreground)]
                transition-colors
                hover:bg-[var(--foreground)]
                hover:text-[var(--background)]
              "
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
 </div>
    
  );
}

export default Navbar;