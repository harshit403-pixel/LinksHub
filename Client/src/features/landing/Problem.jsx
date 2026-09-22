import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    number: "01",
    title: "Your resume can't show everything.",
    description:
      "You may have built 10 or 15 projects, but your resume usually has room for only 2–3. The rest of your work never gets the attention it deserves.",
    image: "/images/landing/problem/problem-1.png",
  },
  {
    number: "02",
    title: "Your best work gets buried.",
    description:
      "Even with a GitHub link, recruiters have to open repositories, read READMEs, understand the stack, and figure out what you actually built.",
    image: "/images/landing/problem/problem-2.png",
  },
  {
    number: "03",
    title: "Recruiters still have unanswered questions.",
    description:
      "What did you build? Why this stack? How does it work? The answers exist, but finding them takes time.",
    image: "/images/landing/problem/problem-3.png",
  },
];

const Problem = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemRefs = useRef([]);
  const imageRefs = useRef([]);
  const turbulenceRef = useRef(null);
  const displacementRef = useRef(null);

  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(itemRefs.current, {
        opacity: 0.3,
      });

      gsap.set(itemRefs.current[0], {
        opacity: 1,
      });

      gsap.set(imageRefs.current, {
        opacity: 0,
        scale: 1,
        filter: "url(#problem-morph)",
      });

      gsap.set(imageRefs.current[0], {
        opacity: 1,
        scale: 1,
      });

      gsap.set(displacementRef.current, {
        attr: {
          scale: 0,
        },
      });

      ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "bottom bottom",
  pin: contentRef.current,
  scrub: true,
  invalidateOnRefresh: true,

        onUpdate: (self) => {
          const index = Math.min(
            problems.length - 1,
            Math.floor(self.progress * problems.length)
          );

          if (index === activeIndexRef.current) return;

          const previousIndex = activeIndexRef.current;
          activeIndexRef.current = index;

          setActiveIndex(index);

          /* LEFT CONTENT */

          itemRefs.current.forEach((item, i) => {
            gsap.to(item, {
              opacity: i === index ? 1 : 0.3,
              duration: 0.45,
              ease: "power2.out",
              overwrite: true,
            });
          });

          /* INDICATOR */

          gsap.to(indicatorRef.current, {
            y: index * 40,
            duration: 0.65,
            ease: "power3.inOut",
            overwrite: true,
          });

          /* MORPH IMAGE */

          const currentImage = imageRefs.current[previousIndex];
          const nextImage = imageRefs.current[index];

          if (!currentImage || !nextImage) return;

          const morph = gsap.timeline();

          morph.to(
            turbulenceRef.current,
            {
              attr: {
                baseFrequency: "0.035",
              },
              duration: 0.3,
              ease: "power2.in",
            },
            0
          );

          morph.to(
            displacementRef.current,
            {
              attr: {
                scale: 45,
              },
              duration: 0.4,
              ease: "power2.inOut",
            },
            0
          );

          morph.to(
            currentImage,
            {
              opacity: 0,
              scale: 1.03,
              duration: 0.45,
              ease: "power2.inOut",
            },
            0.08
          );

          morph.fromTo(
            nextImage,
            {
              opacity: 0,
              scale: 0.97,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
            },
            0.18
          );

          morph.to(
            displacementRef.current,
            {
              attr: {
                scale: 0,
              },
              duration: 0.55,
              ease: "power3.out",
            },
            0.45
          );

          morph.to(
            turbulenceRef.current,
            {
              attr: {
                baseFrequency: "0.01",
              },
              duration: 0.45,
              ease: "power2.out",
            },
            0.5
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative h-[300vh] "
    >
      {/* Same horizontal animated line as Hero */}
      <div className="pointer-events-none absolute left-0 right-0 top-[-30px] landing-grid-horizontal landing-grid-delay-1" />

      <div
        ref={contentRef}
        className="flex h-screen items-center px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid h-[calc(100vh-4rem)] min-h-[620px] border border-[var(--border)] bg-[var(--background)] lg:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT */}
            <div className="relative flex flex-col justify-center border-b border-[var(--border)] px-8 py-10 sm:px-12 lg:border-b-0 lg:px-16">
              <p className="absolute left-8 top-8 font-serif text-5xl leading-none tracking-tight text-[var(--foreground)] sm:left-12 sm:text-6xl lg:left-16 lg:text-7xl">
                problems
              </p>

              <div className="max-w-lg  sm:-translate-y-63">
                <div className="relative">
                  {/* Indicator track */}
                  <div className="absolute left-[3px] top-0 h-[104px] w-px bg-[var(--border)]" />

                  {/* Smooth moving indicator */}
                  <div
                    ref={indicatorRef}
                    className="absolute left-0 top-0 z-10 h-6 w-[7px] bg-[var(--foreground)]"
                  />

                  <div className="space-y-4">
                    {problems.map((problem, index) => {
                      const active = index === activeIndex;

                      return (
                        <div
                          key={problem.number}
                          ref={(el) => {
                            itemRefs.current[index] = el;
                          }}
                          className="relative flex min-h-[24px] items-start pl-8"
                        >
                          <span
                            className={`
                              w-7 shrink-0 font-mono text-[10px]
                              transition-colors duration-500
                              ${
                                active
                                  ? "text-[var(--foreground)]"
                                  : "text-[var(--muted)]"
                              }
                            `}
                          >
                            {problem.number}
                          </span>

                          <div className="ml-4">
                            <h3
                              className={`
                                font-serif text-xl leading-tight
                                transition-colors duration-500
                                sm:text-2xl
                                ${
                                  active
                                    ? "text-[var(--foreground)]"
                                    : "text-[var(--muted)]"
                                }
                              `}
                            >
                              {problem.title}
                            </h3>

                            <div
                              className={`
                                grid transition-[grid-template-rows,opacity] duration-500
                                ${
                                  active
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                                }
                              `}
                            >
                              <div className="overflow-hidden">
                                <p className="max-w-sm pb-3 pt-3 text-sm leading-6 text-[var(--muted)] sm:text-base">
                                  {problem.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="absolute bottom-8 left-8 flex items-center gap-3 sm:left-12 lg:left-16">
                {problems.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      h-px transition-all duration-500
                      ${
                        index === activeIndex
                          ? "w-10 bg-[var(--foreground)]"
                          : "w-5 bg-[var(--border)]"
                      }
                    `}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative  flex items-center justify-center p-6 sm:p-10 lg:p-14">
              <div className="relative w-full max-w-[520px] overflow-hidden">
                {problems.map((problem, index) => (
                  <img
                    key={problem.image}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    src={problem.image}
                    alt=""
                    className={`absolute left-0 top-0 h-auto w-full object-contain ${
                      index === 0 ? "relative" : ""
                    }`}
                  />
                ))}

                {/* Keeps container height */}
                <img
                  src={problems[0].image}
                  alt=""
                  className="invisible block h-auto w-full"
                />

                {/* Morph filter */}
                <svg
                  className="absolute h-0 w-0"
                  aria-hidden="true"
                >
                  <defs>
                    <filter
                      id="problem-morph"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feTurbulence
                        ref={turbulenceRef}
                        type="fractalNoise"
                        baseFrequency="0.01"
                        numOctaves="2"
                        seed="8"
                        result="noise"
                      />

                      <feDisplacementMap
                        ref={displacementRef}
                        in="SourceGraphic"
                        in2="noise"
                        scale="0"
                        xChannelSelector="R"
                        yChannelSelector="G"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;