import { useEffect, useRef, useState } from "react";

const CORE = {
  x: 400,
  y: 250,
  w: 300,
  h: 140,
};
const solutions = [
  {
    key: "profile",
    title: ["Everything in one", "developer profile"],
    node: { x: 138, y: 88 },
    path: "M400 300 C 340 300 422 126 370 126",
    image: "/images/landing/solution/profile.png",
  },
  {
    key: "context",
    title: ["Project context", "beyond the repo"],
    node: { x: 730, y: 88 },
    path: "M700 300 C 760 300 678 126 730 126",
    image: "/images/landing/solution/context.png",
  },
  {
    key: "assistant",
    title: ["AI that knows", "your work"],
    node: { x: 138, y: 476 },
    path: "M400 340 C 340 340 422 514 370 514",
    image: "/images/landing/solution/assistant.png",
  },
  {
    key: "link",
    title: ["One link for", "your entire identity"],
    node: { x: 730, y: 476 },
    path: "M700 340 C 760 340 678 514 730 514",
    image: "/images/landing/solution/link.png",
  },
];
const NODE_W = 232;
const NODE_H = 76;

const DURATION = 0.8;
const CELLS_PER_ROW = 12;

const Solution = () => {
  const previewRef = useRef(null);
  const canvasRef = useRef(null);

  const [hovered, setHovered] = useState(null);

  const stateRef = useRef({
    image: null,
    cells: [],
    raf: null,
    W: 0,
    H: 0,
  });

  /* =========================================
     CANVAS PIXEL REVEAL
  ========================================= */

  useEffect(() => {
    const preview = previewRef.current;
    const canvas = canvasRef.current;

    if (!preview || !canvas) return;

    const ctx = canvas.getContext("2d");

    const frame = document.createElement("canvas");
    const frameCtx = frame.getContext("2d");

    const resize = () => {
      const W = preview.offsetWidth;
      const H = preview.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      frame.width = Math.round(W * dpr);
      frame.height = Math.round(H * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frameCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const size = W / CELLS_PER_ROW;
      const rows = Math.ceil(H / size);

      const cells = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < CELLS_PER_ROW; col++) {
          cells.push({
            x: col * size,
            y: row * size,
            size,
            alpha: 0,
          });
        }
      }

      stateRef.current.W = W;
      stateRef.current.H = H;
      stateRef.current.cells = cells;
    };

    resize();

    const draw = () => {
      const {
        image,
        cells,
        W,
        H,
      } = stateRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!image || !image.complete || !image.naturalWidth) {
        stateRef.current.raf = requestAnimationFrame(draw);
        return;
      }

const scale = Math.min(
  W / image.naturalWidth,
  H / image.naturalHeight
);

const drawWidth = image.naturalWidth * scale;
const drawHeight = image.naturalHeight * scale;

const drawX = (W - drawWidth) / 2;
const drawY = (H - drawHeight) / 2;

frameCtx.clearRect(0, 0, W, H);
frameCtx.drawImage(
  image,
  drawX,
  drawY,
  drawWidth,
  drawHeight
);
      for (const cell of cells) {
        if (cell.alpha <= 0) continue;

        ctx.globalAlpha = cell.alpha;

        ctx.drawImage(
          frame,
          cell.x,
          cell.y,
          cell.size,
          cell.size,
          cell.x,
          cell.y,
          cell.size,
          cell.size
        );
      }

      ctx.globalAlpha = 1;

      stateRef.current.raf = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);

      if (stateRef.current.raf) {
        cancelAnimationFrame(stateRef.current.raf);
      }
    };
  }, []);

  /* =========================================
     LOAD / REVEAL IMAGE
  ========================================= */

  useEffect(() => {
    if (hovered === null) {
      stateRef.current.image = null;

      stateRef.current.cells.forEach((cell) => {
        cell.alpha = 0;
      });

      return;
    }

    const solution = solutions[hovered];

    const image = new Image();

    image.src = solution.image;

    image.onload = () => {
      stateRef.current.image = image;

      const cells = stateRef.current.cells;

      cells.forEach((cell) => {
        cell.alpha = 0;
      });

      const shuffled = [...cells].sort(() => Math.random() - 0.5);

      shuffled.forEach((cell, index) => {
        const delay =
          (index / shuffled.length) * DURATION;

        window.setTimeout(() => {
          if (stateRef.current.image !== image) return;

          cell.alpha = 1;
        }, delay * 1000);
      });
    };

    return () => {
      image.onload = null;
    };
  }, [hovered]);

  /* =========================================
     CURSOR FOLLOW
  ========================================= */

  const handleMouseMove = (event) => {
    const preview = previewRef.current;

    if (!preview) return;

    const rect = preview.getBoundingClientRect();

    const targetX =
      event.clientX -
      rect.width / 2;

    const targetY =
      event.clientY -
      rect.height / 2;

    preview.style.transform = `
      translate3d(
        ${targetX}px,
        ${targetY}px,
        0
      )
    `;
  };

  return (
    <section
      id="solution"
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: "#090909",
        color: "#f5f5f5",
      }}
    >
      {/* =========================================
          HORIZONTAL GRID LINE
      ========================================= */}

      <div
        className="pointer-events-none absolute left-0 right-0 top-[-30px] landing-grid-horizontal landing-grid-delay-1"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, #303030 0, #303030 5px, transparent 5px, transparent 11px)",
        }}
      />

      {/* =========================================
          PIXEL IMAGE PREVIEW
      ========================================= */}

<div
  ref={previewRef}
  className="pointer-events-none fixed left-0 top-0 z-[100] overflow-hidden"
  style={{
    width: "320px",
    height: "220px",
    opacity: hovered === null ? 0 : 1,
    visibility: hovered === null ? "hidden" : "visible",
    transition: "opacity 180ms ease, visibility 180ms ease",
    willChange: "transform",
  }}
>
  <canvas
    ref={canvasRef}
    className="block h-full w-full"
  />
</div>

      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="flex min-h-screen items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="border"
            style={{
              background: "#090909",
              borderColor: "#303030",
            }}
          >
            {/* =====================================
                DESKTOP
            ===================================== */}

            <div className="hidden px-6 py-10 md:block lg:px-12 lg:py-14">
              <svg
                viewBox="0 0 1100 640"
                className="h-auto w-full overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  {/* CORE AURA */}

                  <radialGradient
                    id="solution-aura"
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ffffff"
                      stopOpacity="0.16"
                    />

                    <stop
                      offset="45%"
                      stopColor="#ffffff"
                      stopOpacity="0.06"
                    />

                    <stop
                      offset="100%"
                      stopColor="#ffffff"
                      stopOpacity="0"
                    />
                  </radialGradient>

                  {/* CORE */}

                  <linearGradient
                    id="solution-core"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#ffffff"
                      stopOpacity="0.035"
                    />

                    <stop
                      offset="100%"
                      stopColor="#ffffff"
                      stopOpacity="0.09"
                    />
                  </linearGradient>

                  {/* WIRE GLOW */}

                  <filter
                    id="solution-glow"
                    x="-200%"
                    y="-200%"
                    width="500%"
                    height="500%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="3"
                      result="blur"
                    />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* =================================
                    AURA
                ================================= */}

                <ellipse
                  cx="550"
                  cy="320"
                  rx="270"
                  ry="180"
                  fill="url(#solution-aura)"
                />

                {/* =================================
                    WIRES
                ================================= */}

                {solutions.map((solution, index) => (
                  <g key={solution.key}>
                    {/* Static wire */}

                    <path
                      d={solution.path}
                      pathLength="1"
                      fill="none"
                      stroke="#303030"
                      strokeWidth="1.25"
                    />

                    {/* Moving glow */}

                    <path
                      d={solution.path}
                      pathLength="1"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="0.07 0.065"
                      strokeDashoffset="0"
                      filter="url(#solution-glow)"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-0.135"
                        dur="1.9s"
                        begin={`${index * 0.35}s`}
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                ))}

                {/* =================================
                    CORE
                ================================= */}

                <g>
                  <rect
                    x={CORE.x}
                    y={CORE.y}
                    width={CORE.w}
                    height={CORE.h}
                    fill="url(#solution-core)"
                    stroke="#f5f5f5"
                    strokeWidth="1.25"
                  />

                  <text
                    x="550"
                    y="312"
                    textAnchor="middle"
                    className="font-serif"
                    fontSize="34"
                    fill="#f5f5f5"
                  >
                    LinksHub
                  </text>

                  <text
                    x="550"
                    y="344"
                    textAnchor="middle"
                    className="font-mono"
                    fontSize="10"
                    letterSpacing="3"
                    fill="#777777"
                  >
                    YOUR DEVELOPER IDENTITY
                  </text>

                  {/* Connector points */}

                  <circle
                    cx="400"
                    cy="300"
                    r="3"
                    fill="#f5f5f5"
                  />

                  <circle
                    cx="400"
                    cy="340"
                    r="3"
                    fill="#f5f5f5"
                  />

                  <circle
                    cx="700"
                    cy="300"
                    r="3"
                    fill="#f5f5f5"
                  />

                  <circle
                    cx="700"
                    cy="340"
                    r="3"
                    fill="#f5f5f5"
                  />
                </g>

                {/* =================================
                    SOLUTION BOXES
                ================================= */}

                {solutions.map((solution, index) => {
                  const { x, y } = solution.node;

                  const active = hovered === index;

                  return (
                    <g
                      key={solution.key}
                      onMouseEnter={() =>
                        setHovered(index)
                      }
                      onMouseLeave={() =>
                        setHovered(null)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {/* Box */}

                      <rect
                        x={x}
                        y={y}
                        width={NODE_W}
                        height={NODE_H}
                        fill="#090909"
                        stroke={
                          active
                            ? "#f5f5f5"
                            : "#303030"
                        }
                        strokeWidth={
                          active ? 1.25 : 1
                        }
                      />

{/* Title */}

<text
  x={x + NODE_W / 2}
  y={
    y +
    (solution.title.length === 1 ? 44 : 34)
  }
  textAnchor="middle"
  className="font-serif"
  fontSize="18"
  fill="#f5f5f5"
>
  {solution.title.map((line, lineIndex) => (
    <tspan
      key={`${solution.key}-${lineIndex}`}
      x={x + NODE_W / 2}
      dy={lineIndex === 0 ? 0 : 20}
    >
      {line}
    </tspan>
  ))}
</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* =====================================
                MOBILE
            ===================================== */}

            <div className="md:hidden">
              {solutions.map((solution) => (
                <div
                  key={solution.key}
                  className="border-b px-8 py-8 last:border-b-0"
                  style={{
                    borderColor: "#303030",
                  }}
                >
                  <h3
                    className="font-serif text-2xl leading-tight"
                    style={{
                      color: "#f5f5f5",
                    }}
                  >
                    {solution.title.join(" ")}
                  </h3>

                  <p
                    className="mt-1 font-mono text-[10px] tracking-[0.15em]"
                    style={{
                      color: "#777777",
                    }}
                  >
                    {solution.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;