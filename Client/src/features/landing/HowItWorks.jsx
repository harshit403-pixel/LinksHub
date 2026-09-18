import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* knowledge field for card 04 */
const CHUNKS = (() => {
  let s = 20260916;

  const r = () =>
    ((s = (s * 1664525 + 1013904223) % 4294967296), s / 4294967296);

  return Array.from({ length: 34 }, () => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());

    return {
      x: 300 + Math.cos(a) * d * 96,
      y: 110 + Math.sin(a) * d * 72,
    };
  });
})();

const QUERIES = [
  {
    text: "what did they build?",
    chunks: [3, 11, 18, 27],
  },
  {
    text: "why this stack?",
    chunks: [1, 14, 22, 31],
  },
  {
    text: "how does auth work?",
    chunks: [6, 9, 20, 29],
  },
];

const Q_OUT = { x: 132, y: 110 };
const A_IN = { x: 468, y: 110 };

const curve = (a, b) =>
  `M${a.x} ${a.y} C ${a.x + (b.x - a.x) * 0.45} ${a.y}, ${
    b.x - (b.x - a.x) * 0.45
  } ${b.y}, ${b.x} ${b.y}`;

const Card = ({
  number,
  title,
  label,
  children,
  className = "",
}) => (
  <article
    className={`flex min-h-0 flex-col border-b border-r border-[#b5b5b5] bg-white p-4 sm:p-5 ${className}`}
  >
    <span className="select-none font-mono  text-3xl leading-none text-[#777777] sm:text-4xl">
      {number}
    </span>

    <div className="pointer-events-none min-h-0 flex-1 py-3">
      {children}
    </div>

    <div>
      <h3 className="font-mono  text-base leading-tight text-[#050505] sm:text-lg">
        {title}
      </h3>

      <p className="mt-1 font-mono text-[9px] tracking-[0.1em] text-[#444444]">
        {label}
      </p>
    </div>
  </article>
);

const svgClass = "h-full w-full";

const HowItWorks = () => {
  const sectionRef = useRef(null);

  const avatarRef = useRef(null);
  const bioRefs = useRef([]);
  const chipRefs = useRef([]);
  const repoRefs = useRef([]);
  const countRef = useRef(null);

  const ringRefs = useRef([]);
  const tickRefs = useRef([]);

  const queryRef = useRef(null);
  const answerRef = useRef(null);
  const answerLinesRef = useRef(null);

  const chunkRefs = useRef([]);
  const inRefs = useRef([]);
  const outRefs = useRef([]);

  const [inView, setInView] = useState(false);
  const [q, setQ] = useState(0);

  const query = QUERIES[q];

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const loops = [];

      /* 01 — PROFILE */

      const t1 = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        paused: true,
      });

      t1.fromTo(
        avatarRef.current,
        {
          strokeDashoffset: 1,
          opacity: 1,
        },
        {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: "power2.inOut",
        }
      )
        .fromTo(
          bioRefs.current,
          {
            scaleX: 0,
            opacity: 1,
          },
          {
            scaleX: 1,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.12,
            transformOrigin: "left center",
          },
          0.4
        )
        .fromTo(
          chipRefs.current,
          {
            opacity: 0,
            y: 6,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.09,
          },
          0.95
        )
        .to(
          [
            avatarRef.current,
            ...bioRefs.current,
            ...chipRefs.current,
          ],
          {
            opacity: 0,
            duration: 0.5,
          },
          3
        );

      loops.push(t1);

      /* 02 — PROJECTS */

      const t2 = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.2,
        delay: 0.5,
        paused: true,
      });

      t2.fromTo(
        repoRefs.current,
        {
          x: 70,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.14,
        }
      )
        .fromTo(
          countRef.current,
          {
            textContent: 0,
          },
          {
            textContent: 14,
            duration: 1.1,
            ease: "power2.out",
            snap: {
              textContent: 1,
            },
          },
          0.2
        )
        .to(
          repoRefs.current,
          {
            opacity: 0,
            duration: 0.45,
            stagger: 0.05,
          },
          3
        );

      loops.push(t2);

      /* 03 — AI UNDERSTANDS PROJECT */

      const t3 = gsap.timeline({
        repeat: -1,
        delay: 1,
        paused: true,
      });

      t3.fromTo(
        ringRefs.current,
        {
          scale: 0.4,
          opacity: 0,
          transformOrigin: "150px 110px",
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          stagger: 0.4,
        }
      )
        .fromTo(
          tickRefs.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.35,
            stagger: 0.1,
          },
          1
        )
        .to(
          [...ringRefs.current, ...tickRefs.current],
          {
            opacity: 0,
            duration: 0.6,
          },
          3.3
        );

      loops.push(t3);

      if (reduced) {
        loops.forEach((t) => t.progress(0.65).pause());
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",

        onToggle: (self) => {
          setInView(self.isActive);

          loops.forEach((t) =>
            self.isActive ? t.play() : t.pause()
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* 04 — RECRUITER QUESTION → AI ANSWER */

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      const active = query.chunks
        .map((i) => chunkRefs.current[i])
        .filter(Boolean);

      gsap
        .timeline({
          onComplete: () =>
            setQ((p) => (p + 1) % QUERIES.length),
        })

        /* recruiter question appears */

        .fromTo(
          queryRef.current,
          {
            opacity: 0,
            x: -8,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
          }
        )

        /* question travels into project knowledge */

        .fromTo(
          inRefs.current,
          {
            strokeDashoffset: 1,
            opacity: 1,
          },
          {
            strokeDashoffset: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
          },
          0.3
        )

        /* relevant knowledge gets selected */

        .to(
          active,
          {
            attr: {
              r: 2.8,
            },
            opacity: 1,
            duration: 0.28,
            ease: "back.out(2)",
            stagger: 0.07,
          },
          0.55
        )

        /* information travels to AI answer */

        .fromTo(
          outRefs.current,
          {
            strokeDashoffset: 1,
            opacity: 1,
          },
          {
            strokeDashoffset: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.inOut",
          },
          1.1
        )

        /* answer activates */

        .to(
          answerRef.current,
          {
            stroke: "#050505",
            duration: 0.35,
          },
          1.6
        )

        .fromTo(
          answerLinesRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.35,
          },
          1.7
        )

        /* reset */

        .to(
          [...inRefs.current, ...outRefs.current],
          {
            opacity: 0,
            duration: 0.55,
          },
          3.2
        )

        .to(
          active,
          {
            attr: {
              r: 1.1,
            },
            opacity: 0.32,
            duration: 0.55,
          },
          3.2
        )

        .to(
          answerRef.current,
          {
            stroke: "#b5b5b5",
            duration: 0.55,
          },
          3.3
        )

        .to(
          [answerLinesRef.current, queryRef.current],
          {
            opacity: 0,
            duration: 0.45,
          },
          3.4
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [q, inView]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="flex flex-col justify-center bg-[var(--background)] px-4 py-12 text-[#050505] sm:px-6 lg:h-screen lg:min-h-[620px] lg:px-8 lg:py-10"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col lg:min-h-0">

        {/* HEADING */}

        <div className="mb-6 flex items-end justify-between gap-6 border-b border-[#111111] pb-5">
          <h2 className="font-mono  text-4xl leading-none tracking-tight text-[#050505] sm:text-5xl">
            how it works
          </h2>

          <p className="hidden max-w-[15rem] font-mono text-[9px] leading-relaxed tracking-[0.1em] text-[#444444] sm:block">
          
          </p>
        </div>

        {/* BENTO */}

        <div className="grid grid-cols-1 border-l border-t border-[#b5b5b5] lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:grid-rows-[0.85fr_1fr]">

          {/* 01 */}

          <Card
            number="01"
            title="Create your profile"
            label="profile → links → bio → identity"
            className="h-52 lg:col-span-4 lg:h-auto"
          >
            <svg
              viewBox="0 0 300 160"
              className={svgClass}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <rect
                ref={avatarRef}
                x="46"
                y="30"
                width="44"
                height="44"
                pathLength="1"
                fill="none"
                stroke="#444444"
                strokeWidth="1.2"
                strokeDasharray="1"
              />

              {[
                { y: 36, w: 104 },
                { y: 50, w: 78 },
                { y: 64, w: 92 },
              ].map((l, i) => (
                <rect
                  key={l.y}
                  ref={(el) => (bioRefs.current[i] = el)}
                  x="106"
                  y={l.y}
                  width={l.w}
                  height="2.5"
                  fill="#333333"
                  style={{
                    transformBox: "fill-box",
                  }}
                />
              ))}

              {["github", "leetcode", "site"].map((c, i) => (
                <g
                  key={c}
                  ref={(el) => (chipRefs.current[i] = el)}
                >
                  <rect
                    x={46 + i * 70}
                    y="102"
                    width="62"
                    height="22"
                    fill="none"
                    stroke="#999999"
                  />

                  <text
                    x={77 + i * 70}
                    y="117"
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="8"
                    letterSpacing="1"
                    fill="#333333"
                  >
                    {c}
                  </text>
                </g>
              ))}
            </svg>
          </Card>

          {/* 02 */}

          <Card
            number="02"
            title="Add your projects"
            label="import → select → publish"
            className="h-52 lg:col-span-3 lg:h-auto"
          >
            <svg
              viewBox="0 0 220 160"
              className={svgClass}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {[0, 1, 2, 3].map((i) => (
                <g
                  key={i}
                  ref={(el) => (repoRefs.current[i] = el)}
                >
                  <rect
                    x={26 + i * 8}
                    y={20 + i * 26}
                    width="140"
                    height="20"
                    fill="#ffffff"
                    stroke={
                      i === 0 ? "#555555" : "#b0b0b0"
                    }
                  />

                  <rect
                    x={36 + i * 8}
                    y={28 + i * 26}
                    width={58 - i * 8}
                    height="2.5"
                    fill="#444444"
                  />

                  <circle
                    cx={154 + i * 8}
                    cy={30 + i * 26}
                    r="2"
                    fill="#555555"
                  />
                </g>
              ))}

              <text
                x="26"
                y="146"
                className="font-mono"
                fontSize="9"
                letterSpacing="1.2"
                fill="#444444"
              >
                <tspan
                  ref={countRef}
                  fill="#050505"
                >
                  0
                </tspan>

                <tspan> repositories</tspan>
              </text>
            </svg>
          </Card>

          {/* 03 */}

          <Card
            number="03"
            title="AI understands your projects"
            label="analyze → understand → explain"
            className="h-52 lg:col-span-5 lg:h-auto"
          >
            <svg
              viewBox="0 0 300 220"
              className={svgClass}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <rect
                x="140"
                y="100"
                width="20"
                height="20"
                fill="none"
                stroke="#111111"
                strokeWidth="1.2"
              />

              {[42, 68, 94, 120].map((r, i) => (
                <rect
                  key={r}
                  ref={(el) => (ringRefs.current[i] = el)}
                  x={150 - r}
                  y={110 - r * 0.6}
                  width={r * 2}
                  height={r * 1.2}
                  fill="none"
                  stroke="#a5a5a5"
                  strokeWidth="1"
                  strokeDasharray={
                    i % 2 ? "2 5" : "none"
                  }
                />
              ))}

              {[
                {
                  t: "stack",
                  x: 150,
                  y: 16,
                },
                {
                  t: "architecture",
                  x: 292,
                  y: 113,
                  a: "end",
                },
                {
                  t: "decisions",
                  x: 150,
                  y: 210,
                },
                {
                  t: "features",
                  x: 8,
                  y: 113,
                  a: "start",
                },
              ].map((l, i) => (
                <text
                  key={l.t}
                  ref={(el) => (tickRefs.current[i] = el)}
                  x={l.x}
                  y={l.y}
                  textAnchor={l.a || "middle"}
                  className="font-mono"
                  fontSize="8"
                  letterSpacing="1.2"
                  fill="#444444"
                >
                  {l.t}
                </text>
              ))}
            </svg>
          </Card>

          {/* 04 */}

          <Card
            number="04"
            title="Recruiters ask. AI answers."
            label="question → understand → answer"
            className="h-64 lg:col-span-7 lg:h-auto"
          >
            <svg
              viewBox="0 0 600 220"
              className={svgClass}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* knowledge */}

              {CHUNKS.map((c, i) => (
                <circle
                  key={i}
                  ref={(el) => (chunkRefs.current[i] = el)}
                  cx={c.x}
                  cy={c.y}
                  r="1.4"
                  fill="#111111"
                  opacity="0.5"
                />
              ))}

              {/* incoming */}

              {query.chunks.map((ci, i) => (
                <path
                  key={`in-${q}-${ci}`}
                  ref={(el) => (inRefs.current[i] = el)}
                  d={curve(Q_OUT, CHUNKS[ci])}
                  pathLength="1"
                  fill="none"
                  stroke="#555555"
                  strokeWidth="1"
                  strokeDasharray="1"
                />
              ))}

              {/* outgoing */}

              {query.chunks.map((ci, i) => (
                <path
                  key={`out-${q}-${ci}`}
                  ref={(el) => (outRefs.current[i] = el)}
                  d={curve(CHUNKS[ci], A_IN)}
                  pathLength="1"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1"
                  strokeDasharray="1"
                />
              ))}

              {/* recruiter */}

              <g ref={queryRef} opacity="0">
                <rect
                  x="6"
                  y="92"
                  width="126"
                  height="36"
                  fill="#ffffff"
                  stroke="#555555"
                  strokeWidth="1"
                />

                <text
                  x="16"
                  y="107"
                  className="font-mono"
                  fontSize="7"
                  letterSpacing="1.4"
                  fill="#555555"
                >
                  recruiter asks
                </text>

                <text
                  x="16"
                  y="121"
                  className="font-mono "
                  fontSize="11"
                  fill="#050505"
                >
                  {query.text}
                </text>
              </g>

              {/* answer */}

              <g>
                <rect
                  ref={answerRef}
                  x="468"
                  y="88"
                  width="126"
                  height="46"
                  fill="#ffffff"
                  stroke="#b5b5b5"
                  strokeWidth="1"
                />

                <text
                  x="478"
                  y="103"
                  className="font-mono"
                  fontSize="7"
                  letterSpacing="1.4"
                  fill="#555555"
                >
                  AI ANSWER
                </text>

                <g
                  ref={answerLinesRef}
                  opacity="0"
                >
                  <rect
                    x="478"
                    y="111"
                    width="92"
                    height="2.5"
                    fill="#333333"
                  />

                  <rect
                    x="478"
                    y="119"
                    width="72"
                    height="2.5"
                    fill="#555555"
                  />

                  <rect
                    x="478"
                    y="127"
                    width="84"
                    height="2.5"
                    fill="#444444"
                  />
                </g>
              </g>
            </svg>
          </Card>

          {/* QUIET CELL */}

         {/* 05 — INTERACTIVE PIXEL FIELD */}

<div className="relative hidden overflow-hidden border-b border-r border-[#b5b5b5] bg-white lg:col-span-5 lg:block">
  <div
    className="how-pixel-card absolute inset-0"
    onMouseMove={(e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();

      const col = Math.floor(
        ((e.clientX - rect.left) / rect.width) * 12
      );

      const row = Math.floor(
        ((e.clientY - rect.top) / rect.height) * 8
      );

      const index = row * 12 + col;
      const pixel = card.querySelectorAll(".how-pixel")[index];

      if (!pixel || pixel.dataset.active === "true") return;

      const colors = [
        "#FF3B30",
        "#FF9500",
        "#FFCC00",
        "#34C759",
        "#00C7BE",
        "#007AFF",
        "#5856D6",
        "#AF52DE",
        "#FF2D55",
        "#00A8FF",
      ];

      const randomColor =
        colors[Math.floor(Math.random() * colors.length)];

      pixel.style.setProperty("--pixel-color", randomColor);
      pixel.dataset.active = "true";
      pixel.classList.add("is-active");

      setTimeout(() => {
        pixel.classList.remove("is-active");
        pixel.dataset.active = "false";
      }, 450);
    }}
  >
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
      {Array.from({ length: 96 }).map((_, i) => (
        <span
          key={i}
          className="how-pixel"
          data-active="false"
        />
      ))}
    </div>

    <div className="relative z-10 flex h-full items-end p-6">
      <p className="max-w-[25rem] font-mono text-3xl font-medium leading-[0.95] tracking-[-4px] text-[#050505] lg:text-[3.2rem]">
        ONE LINK.
        <br />
        YOUR WORK SPEAKS
        <br />
        FOR ITSELF.
      </p>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;