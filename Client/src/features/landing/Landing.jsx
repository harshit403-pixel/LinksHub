
import { useEffect, useRef, useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Problem from "./Problem";
import Solution from "./Solution";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import Footer from "./Footer";

import SmoothScroll from "../../components/SmoothScroll";
import Preloader from "../../components/Preloader";
import { AnimatePresence } from "framer-motion";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const logoRef = useRef(null);

  useEffect(() => {
    const video = document.createElement("video");

    video.src = "/images/landing/profile-demo-optimized.mp4";
    video.preload = "metadata";
    video.load();

    return () => {
      video.src = "";
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">

        {/* Global grid */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-[8%] landing-grid-vertical" />
          <div className="absolute inset-y-0 right-[8%] landing-grid-vertical landing-grid-delay-2" />
        </div>

        {/* Landing content */}
        <div className="relative z-10">
          <Navbar
            logoRef={logoRef}
            isLoading={isLoading}
          />

          <Hero />
          <Problem />
          <Solution />
          <HowItWorks />
          <FAQ />
          <Footer />
        </div>

        {/* Logo animation */}
        <AnimatePresence>
  {isLoading && (
    <Preloader
      targetRef={logoRef}
      onComplete={() => setIsLoading(false)}
    />
  )}
</AnimatePresence>

      </div>
    </SmoothScroll>
  );
};

export default Landing;
