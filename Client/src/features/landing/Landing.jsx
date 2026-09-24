import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Hero from "./Hero";
import Problem from "./Problem";
import Solution from "./Solution";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import Footer from "./Footer";

import SmoothScroll from "../../components/SmoothScroll";
import Preloader from "../../components/Preloader";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  const video = document.createElement("video");

  video.src = "/images/landing/profile-demo-optimized.mp4";
  video.preload = "auto";
  video.load();

  return () => {
    video.src = "";
  };
}, []);

  return (
    <SmoothScroll>
      {/* Preloader */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      <div className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
        

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