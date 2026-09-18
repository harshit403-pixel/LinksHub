const CLIP_PATH = {
  tl: "polygon(0 0, 100% 0, 0 100%)",
  tr: "polygon(0 0, 100% 0, 100% 100%)",
  bl: "polygon(0 0, 100% 100%, 0 100%)",
  br: "polygon(100% 0, 100% 100%, 0 100%)",
};

const POSITION = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

function CornerTick({ corner = "tl", size = 10, className = "" }) {
  return (
    <span
      className={`absolute ${POSITION[corner]} ${className}`}
      style={{
        width: size,
        height: size,
        clipPath: CLIP_PATH[corner],
        backgroundColor: "var(--foreground)",
      }}
    />
  );
}

export default CornerTick;