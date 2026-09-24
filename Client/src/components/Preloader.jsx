import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const items = [
  { type: "image", src: "/images/landing/problem/problem-1.png" },
  { type: "image", src: "/images/landing/problem/problem-2.png" },
  { type: "image", src: "/images/landing/problem/problem-3.png" },
  { type: "image", src: "/images/landing/preloader/pre-1.png" },
  { type: "image", src: "/images/landing/preloader/pre-2.png" },
  { type: "image", src: "/images/landing/preloader/pre-3.png" },
];

// Fisher-Yates shuffle
const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
};

const Preloader = ({ onComplete }) => {
  const [visibleBoxes, setVisibleBoxes] = useState(new Set());
  const [seenBoxes, setSeenBoxes] = useState(new Set());
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Random blinking continues until the exit starts
  useEffect(() => {
    const showRandomBoxes = () => {
      const indexes = shuffleArray(
        [...Array(items.length).keys()]
      );

      // Show between 3 and all boxes
      const amount =
        Math.floor(Math.random() * (items.length - 2)) + 3;

      const selectedBoxes = new Set(indexes.slice(0, amount));

      setVisibleBoxes(selectedBoxes);

      setSeenBoxes((previous) => {
        const updated = new Set(previous);

        selectedBoxes.forEach((index) => {
          updated.add(index);
        });

        // Mark completion but do not stop the blinking
        if (
          updated.size === items.length &&
          !hasCompleted
        ) {
          setHasCompleted(true);
        }

        return updated;
      });
    };

    // Show the first random combination immediately
    showRandomBoxes();

    // Continue blinking
    const interval = setInterval(showRandomBoxes, 450);

    return () => clearInterval(interval);
  }, [hasCompleted]);

  // Wait at least 2 seconds after all boxes have appeared
  useEffect(() => {
    if (!hasCompleted) return;

    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasCompleted]);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{
        y: isExiting ? "-100%" : "0%",
      }}
      transition={{
        duration: 1.3,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (isExiting) {
          onComplete?.();
        }
      }}
      className="fixed inset-0 z-[10000] bg-white"
    >
      {/* Full-screen grid */}
      <div className="grid h-full w-full grid-cols-3 grid-rows-2">
        {items.map((item, index) => {
          const isVisible = visibleBoxes.has(index);

          const isLastColumn = index % 3 === 2;
          const isLastRow = index >= 3;

          return (
            <div
              key={`${item.type}-${item.src}-${index}`}
              className={`
                relative flex items-center justify-center
                overflow-hidden
                ${!isLastColumn ? "border-r border-black/50" : ""}
                ${!isLastRow ? "border-b border-black/50" : ""}
              `}
            >
              {/* Random fade in and fade out */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                className="flex h-full w-full items-center justify-center"
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt=""
                    className="h-[55%] w-[55%] object-contain"
                  />
                ) : (
                  <span className="text-3xl tracking-[0.2em] text-black md:text-6xl">
                    {item.value}
                  </span>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Preloader;