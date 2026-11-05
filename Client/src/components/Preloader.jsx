
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const LOGO_SIZE = 146;

const Preloader = ({ onComplete, targetRef }) => {
  const controls = useAnimationControls();
  const [isClosing, setIsClosing] = useState(false);
  const [targetRect, setTargetRect] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer;
    let closeTimer;

    const startAnimation = async () => {
      const target = targetRef.current;

      if (!target) {
        onComplete?.();
        return;
      }

      const rect = target.getBoundingClientRect();
      setTargetRect(rect);

      const startX = window.innerWidth / 2 - LOGO_SIZE / 2;
      const startY = window.innerHeight / 2 - LOGO_SIZE / 2;

      controls.set({
        x: 0,
        y: 0,
        width: LOGO_SIZE,
        height: LOGO_SIZE,
      });

      timer = setTimeout(async () => {
        if (cancelled) return;

        const logoAnimation = controls.start({
          x: rect.left - startX,
          y: rect.top - startY,
          width: rect.width,
          height: rect.height,
          transition: {
            duration: 2.0,
            ease: [0.76, 0, 0.24, 1],
          },
        });

        // Begin collapsing the background just before the logo arrives
        closeTimer = setTimeout(() => {
          if (!cancelled) {
            setIsClosing(true);
          }
        }, 1300);

        await logoAnimation;
      }, 400);
    };

    startAnimation();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearTimeout(closeTimer);
      controls.stop();
    };
  }, [controls, targetRef, onComplete]);

  const clipPath = targetRect
    ? `circle(0px at ${
        targetRect.left + targetRect.width / 2
      }px ${targetRect.top + targetRect.height / 2}px)`
    : "circle(150% at 50% 50%)";

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none">
      {/* Background collapses into the navbar logo */}
      <motion.div
        className="absolute inset-0 overflow-hidden bg-[#FAFAF9]"
        initial={{
          clipPath: "circle(150% at 50% 50%)",
        }}
        animate={{
          clipPath: isClosing
            ? clipPath
            : "circle(150% at 50% 50%)",
        }}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={() => {
          if (isClosing) {
            onComplete?.();
          }
        }}
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-200/50 blur-[100px]" />

        {/* Background texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(#000 0.6px, transparent 0.6px)",
            backgroundSize: "6px 6px",
          }}
        />
      </motion.div>

      {/* Logo moves independently and stays visible */}
      <motion.img
        src="/favicon.svg"
        alt="LinksHub"
        initial={{
          x: 0,
          y: 0,
          width: LOGO_SIZE,
          height: LOGO_SIZE,
        }}
        animate={controls}
        draggable={false}
        className="pointer-events-none fixed z-10 select-none object-contain"
        style={{
          left: `calc(50% - ${LOGO_SIZE / 2}px)`,
          top: `calc(50% - ${LOGO_SIZE / 2}px)`,
        }}
      />
    </div>
  );
};

export default Preloader;
