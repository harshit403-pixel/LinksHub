import Navbar from "./Navbar";
import Hero from "./Hero";
import Problem from "./Problem";
import Solution from "./Solution";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import Footer from "./Footer";
import SmoothScroll from "../../components/SmoothScroll";
import InkCursor from "../../components/InkCursor";
import { useEffect } from "react";

const Landing = () => {
  useEffect(() => {
  document.body.classList.add("landing-cursor-hidden");

  return () => {
    document.body.classList.remove("landing-cursor-hidden");
  };
}, []);
  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        {/* Ink cursor - landing page only */}
        <InkCursor />

        {/* Global animated vertical grid */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-[8%] landing-grid-vertical" />

          <div className="absolute inset-y-0 right-[8%] landing-grid-vertical landing-grid-delay-2" />
        </div>

        {/* Landing page content */}
        <div className="relative z-10">
          <Navbar />

          <Hero />

          <Problem />

          <Solution />

          <HowItWorks />

          <FAQ />

          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
};

export default Landing;