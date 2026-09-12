import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getLinkIcon } from "./getLinkIcon";

/*
  LinksHub carousel

  Each card represents one existing profile link.
  The carousel keeps the original turntable behaviour:
  cards move around an endless ring instead of reaching
  the beginning or end of a normal row.
*/

const CARD_W = 210;
const CARD_H = 270;

const STAGE_W = 500;
const STAGE_H = 350;

const ORBIT = 145;
const DEPTH = 100;
const LEAN = 38;

const PULL = 140;
const TOSS = 150;
const MOST = 2;

const BASE = 620;

const ANGLE = [-4.2, 2.6, -1.4, 3.8, 1.7];

const clamp = (v, lo, hi) =>
  Math.min(hi, Math.max(lo, v));

const mix = (a, b, t) =>
  a + (b - a) * t;

const out = (t) =>
  1 - (1 - t) ** 4;

const stillness = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;

const spotOf = (
  i,
  turn,
  orbit,
  depth,
  count
) => {
  const th =
    (i - turn) *
    ((Math.PI * 2) / count);

  const f =
    (Math.cos(th) + 1) / 2;

  return {
    x: Math.sin(th) * orbit,

    y: -(1 - f) * LEAN,

    s: mix(
      1 -
        clamp(depth, 0, 150) /
          200,
      1,
      f
    ),

    z: Math.round(f * 100),
  };
};

const write = (
  el,
  sp,
  angle
) => {
  el.style.transform = `
    translate(-50%, -50%)
    translate(${sp.x.toFixed(2)}px, ${sp.y.toFixed(2)}px)
    rotate(${angle}deg)
    scale(${sp.s.toFixed(4)})
  `;

  el.style.zIndex = String(sp.z);
};

function LinksCarousel({
  links = [],
}) {
  const slots = useRef([]);
  const turn = useRef(0);
  const raf = useRef(0);

  const drag = useRef(null);

  const [held, setHeld] =
    useStateSafe(false);

  const paint = useCallback(() => {
    const count = links.length;

    if (!count) return;

    slots.current.forEach(
      (el, i) => {
        if (!el) return;

        const spot = spotOf(
          i,
          turn.current,
          ORBIT,
          DEPTH,
          count
        );

        write(
          el,
          spot,
          ANGLE[i % ANGLE.length]
        );
      }
    );
  }, [links.length]);

  useLayoutEffect(() => {
    paint();
  }, [paint]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(
        raf.current
      );
    };
  }, []);

  const glide = useCallback(
    (to) => {
      cancelAnimationFrame(
        raf.current
      );

      const from = turn.current;

      if (
        stillness() ||
        from === to
      ) {
        turn.current = to;
        paint();
        return;
      }

      const duration = BASE;

      const start =
        performance.now();

      const tick = (now) => {
        const progress = Math.min(
          1,
          (now - start) / duration
        );

        turn.current = mix(
          from,
          to,
          out(progress)
        );

        paint();

        if (progress < 1) {
          raf.current =
            requestAnimationFrame(
              tick
            );
        }
      };

      raf.current =
        requestAnimationFrame(tick);
    },
    [paint]
  );

  const go = useCallback(
    (direction) => {
      glide(
        Math.round(
          turn.current
        ) + direction
      );
    },
    [glide]
  );

  const handlePointerDown = (
    e
  ) => {
    cancelAnimationFrame(
      raf.current
    );

    drag.current = {
      x0: e.clientX,
      t: e.timeStamp,
      last: e.clientX,
      vx: 0,
      moved: false,
      start: turn.current,
    };

    setHeld(true);

    try {
      e.currentTarget.setPointerCapture(
        e.pointerId
      );
    } catch {
      // Pointer capture is not available.
    }
  };

  const handlePointerMove = (
    e
  ) => {
    const current =
      drag.current;

    if (!current) return;

    const dx =
      e.clientX - current.x0;

    if (
      !current.moved &&
      Math.abs(dx) > 3
    ) {
      current.moved = true;
    }

    const dt = Math.max(
      1,
      e.timeStamp - current.t
    );

    current.vx =
      (current.vx +
        (e.clientX -
          current.last) /
          dt) /
      2;

    current.last =
      e.clientX;

    current.t =
      e.timeStamp;

    turn.current =
      current.start -
      dx / PULL;

    paint();
  };

  const handlePointerUp = () => {
    const current =
      drag.current;

    if (!current) return;

    drag.current = null;

    setHeld(false);

    const carry = clamp(
      (-current.vx * TOSS) /
        PULL,
      -MOST,
      MOST
    );

    const target = Math.round(
      turn.current + carry
    );

    if (current.moved) {
      glide(target);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  if (!links.length) {
    return null;
  }

  return (
    <div
      className="link-carousel"
      style={{
        width: "100%",
        maxWidth: STAGE_W,
        height: STAGE_H,
      }}
    >
      <div
        className="link-carousel-track"
        data-held={held}
        role="group"
        aria-label="Profile links"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={
          handleKeyDown
        }
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          handlePointerUp
        }
        onPointerCancel={
          handlePointerUp
        }
      >
        {links.map((link, index) => (
          <div
            key={link._id}
            ref={(el) => {
              slots.current[index] =
                el;
            }}
            className="link-carousel-slot"
            style={{
              width: CARD_W,
              height: CARD_H,
            }}
          >
            <LinkCard
              link={link}
              held={held}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkCard({
  link,
  held,
}) {
  const [hovered, setHovered] =
    useStateSafe(false);

  const preview =
    link.previewImage;

  return (
    <a
      href={`/api/links/go/${link._id}`}
      target="_blank"
      rel="noreferrer"
      className="
        link-carousel-card
        group
        block
        h-full
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--surface-secondary)]
        text-[var(--foreground)]
        no-underline
        transition-colors
        duration-300
        hover:border-[var(--muted-foreground)]
      "
      onPointerEnter={() =>
        setHovered(true)
      }
      onPointerLeave={() =>
        setHovered(false)
      }
      onPointerCancel={() =>
        setHovered(false)
      }
      onClick={(e) => {
        if (held) {
          e.preventDefault();
        }
      }}
    >
      {/* IMAGE */}

      {preview ? (
        <div className="relative h-[145px] overflow-hidden">
          <img
            src={preview}
            alt={
              link.previewTitle ||
              link.title
            }
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-black/10
            to-transparent
          " />

          <div className="
            absolute
            bottom-3
            left-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/40
            text-white
            backdrop-blur-sm
          ">
            {getLinkIcon(
              link.url
            )}
          </div>
        </div>
      ) : (
        <div className="
          flex
          h-[145px]
          items-center
          justify-center
          border-b
          border-[var(--border)]
          bg-[var(--surface)]
        ">
          <div className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-[var(--border)]
            text-[var(--muted-foreground)]
            transition-transform
            duration-300
            group-hover:scale-110
          ">
            {getLinkIcon(
              link.url
            )}
          </div>
        </div>
      )}

      {/* CONTENT */}

      <div className="
        flex
        h-[125px]
        flex-col
        justify-between
        p-4
      ">
        <div>
          <h3 className="
            line-clamp-1
            break-words
            text-base
            font-semibold
            text-[var(--foreground)]
          ">
            {link.title}
          </h3>

          {(link.previewTitle ||
            link.previewDescription) && (
            <p className="
              mt-1.5
              line-clamp-2
              text-xs
              leading-5
              text-[var(--muted)]
            ">
              {link.previewDescription ||
                link.previewTitle}
            </p>
          )}
        </div>

        <div className="
          flex
          items-center
          justify-between
          text-xs
          text-[var(--muted)]
        ">
          <span
            className="
              transition-colors
              group-hover:text-[var(--foreground)]
            "
          >
            Open link
          </span>

          <FaArrowUpRightFromSquare
            size={11}
            className="
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-[var(--foreground)]
            "
          />
        </div>
      </div>
    </a>
  );
}

/*
  Small local state helper.

  This keeps the component self-contained and avoids
  adding another dependency.
*/
function useStateSafe(initial) {
  const React = require("react");

  return React.useState(initial);
}

export default LinksCarousel;