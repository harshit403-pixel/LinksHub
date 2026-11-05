import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";

const headImages = [
  "/images/landing/problem/problem-1.webp",
  "/images/landing/problem/problem-2.webp",
  "/images/landing/problem/problem-3.webp",
  "/images/landing/preloader/pre-1.webp",
  "/images/landing/preloader/pre-2.webp",
  "/images/landing/preloader/pre-3.webp",
];

// More copies = more heads
const HEAD_COUNT = 40;

const Preloader = ({ onComplete }) => {
  const physicsRef = useRef(null);
  const engineRef = useRef(null);
  const animationRef = useRef(null);

  const bodiesRef = useRef([]);

  const [ready, setReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  /*
   * Preload all unique images first
   */
  useEffect(() => {
    let loaded = 0;

    headImages.forEach((src) => {
      const img = new Image();

      img.src = src;

      const done = () => {
        loaded++;

        if (loaded === headImages.length) {
          setReady(true);
        }
      };

      img.onload = done;
      img.onerror = done;
    });
  }, []);

  /*
   * Matter.js physics
   */
  useEffect(() => {
    if (!ready || !physicsRef.current) return;

    const container = physicsRef.current;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const {
      Engine,
      Bodies,
      Body,
      Composite,
      Runner,
    } = Matter;

    const engine = Engine.create();

    engineRef.current = engine;

    /*
     * Gravity
     */
    engine.gravity.y = 1.15;

    /*
     * Floor
     */
    const floor = Bodies.rectangle(
      width / 2,
      height + 60,
      width + 300,
      100,
      {
        isStatic: true,
        friction: 0.8,
        restitution: 0.15,
      }
    );

    /*
     * Walls
     */
    const leftWall = Bodies.rectangle(
      -50,
      height / 2,
      100,
      height * 2,
      {
        isStatic: true,
      }
    );

    const rightWall = Bodies.rectangle(
      width + 50,
      height / 2,
      100,
      height * 2,
      {
        isStatic: true,
      }
    );

    Composite.add(engine.world, [
      floor,
      leftWall,
      rightWall,
    ]);

    /*
     * Create many heads
     */
    const bodies = [];

    for (let index = 0; index < HEAD_COUNT; index++) {
      /*
       * Randomly choose one of your six images
       */
      const imageIndex =
        Math.floor(
          Math.random() * headImages.length
        );

      /*
       * Head size
       */
      const size =
        Math.min(width * 0.15, 190) *
        (0.75 + Math.random() * 0.35);

      /*
       * Spread heads across the entire screen
       */
      const x =
        width * 0.08 +
        Math.random() * width * 0.84;

      /*
       * Start at different heights above screen
       */
      const y =
        -150 -
        Math.random() * 1400;

      const body = Bodies.circle(
        x,
        y,
        size * 0.34,
        {
          restitution:
            0.35 + Math.random() * 0.2,

          friction:
            0.45 + Math.random() * 0.25,

          frictionAir: 0.018,

          density: 0.002,

          angle:
            (Math.random() - 0.5) *
            Math.PI,

          /*
           * Custom data
           */
          plugin: {
            imageIndex,
            size,
          },
        }
      );

      /*
       * Give each head a random horizontal movement
       */
      Body.setVelocity(body, {
        x:
          (Math.random() - 0.5) * 4,

        y:
          Math.random() * 1.5,
      });

      /*
       * Random spin
       */
      Body.setAngularVelocity(
        body,
        (Math.random() - 0.5) * 0.08
      );

      Composite.add(
        engine.world,
        body
      );

      bodies.push(body);
    }

    bodiesRef.current = bodies;

    /*
     * Physics runner
     */
    const runner = Runner.create();

    Runner.run(
      runner,
      engine
    );

    /*
     * Update DOM positions
     */
    const update = () => {
      bodies.forEach((body, index) => {
        const element =
          container.querySelector(
            `[data-head="${index}"]`
          );

        if (!element) return;

        /*
         * Hide until Matter gives us a valid position
         */
        if (
          !Number.isFinite(
            body.position.x
          ) ||
          !Number.isFinite(
            body.position.y
          )
        ) {
          return;
        }

        element.style.opacity = "1";

        element.style.transform = `
          translate3d(
            ${body.position.x}px,
            ${body.position.y}px,
            0
          )
          translate(-50%, -50%)
          rotate(${body.angle}rad)
        `;
      });

      animationRef.current =
        requestAnimationFrame(update);
    };

    animationRef.current =
      requestAnimationFrame(update);

    /*
     * Random little forces
     */
    const randomMovement = setInterval(() => {
      bodies.forEach((body) => {
        /*
         * Only disturb heads that are
         * already inside the screen.
         */
        if (
          body.position.y > -100 &&
          body.position.y < height
        ) {
          Body.applyForce(
            body,
            body.position,
            {
              x:
                (Math.random() - 0.5) *
                0.0015,

              y:
                (Math.random() - 0.5) *
                0.0002,
            }
          );
        }
      });
    }, 600);

    /*
     * Let the heads fall and settle.
     */
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 5000);

    return () => {
      clearTimeout(exitTimer);
      clearInterval(randomMovement);

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }

      Runner.stop(runner);
      Engine.clear(engine);

      engineRef.current = null;
      bodiesRef.current = [];
    };
  }, [ready]);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{
        y: isExiting ? "-100%" : "0%",
      }}
      transition={{
        duration: 1.4,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (isExiting) {
          onComplete?.();
        }
      }}
      className="fixed inset-0 z-[10000] overflow-hidden bg-white"
    >
      {/* Physics layer */}
      <div
        ref={physicsRef}
        className="absolute inset-0 overflow-hidden"
      >
        {Array.from(
          { length: HEAD_COUNT },
          (_, index) => {
            /*
             * Use a random image for every head
             */
            const image =
              headImages[
                index %
                  headImages.length
              ];

            return (
              <div
                key={index}
                data-head={index}
                className="absolute left-0 top-0"
                style={{
                  width:
                    "min(15vw, 190px)",

                  height:
                    "min(15vw, 190px)",

                  opacity: 0,

                  transform:
                    "translate(-50%, -50%)",

                  willChange:
                    "transform",

                  pointerEvents: "none",
                }}
              >
                <img
                  src={image}
                  alt=""
                  draggable="false"
                  className="h-full w-full select-none object-contain"
                />
              </div>
            );
          }
        )}
      </div>
    </motion.div>
  );
};

export default Preloader;