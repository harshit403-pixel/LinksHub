import { useEffect, useRef } from "react";

const InkCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrame;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const points = [];
    const MAX_POINTS = 400;

    const mouse = {
      x: -100,
      y: -100,
      active: false,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addPoint = (x, y) => {
      points.push({
        x,
        y,
        life: 1,
      });

      if (points.length > MAX_POINTS) {
        points.shift();
      }
    };

    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      if (!mouse.active) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;

        addPoint(x, y);
        return;
      }

      const dx = x - mouse.x;
      const dy = y - mouse.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      // Interpolate points for smooth fast movement
      const steps = Math.min(Math.ceil(distance / 3), 40);

      for (let i = 1; i <= steps; i++) {
        const progress = i / steps;

        addPoint(
          mouse.x + dx * progress,
          mouse.y + dy * progress
        );
      }

      mouse.x = x;
      mouse.y = y;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Newest points are at the end of the array.
// Tail (oldest points) dissolves first
for (let i = 0; i < points.length; i++) {
  points[i].life -= 0.005;

  if (points[i].life <= 0) {
    points.splice(i, 1);
    i--;
  }
}
      // Draw the trail segment by segment
  for (let i = 1; i < points.length; i++) {
  const previous = points[i - 1];
  const current = points[i];

  const life = Math.min(previous.life, current.life);

  if (life <= 0) continue;

  const positionRatio = i / points.length;

  ctx.beginPath();
  ctx.moveTo(previous.x, previous.y);
  ctx.lineTo(current.x, current.y);

  // Thin at the tail, thicker near the cursor
  ctx.lineWidth = 1 + positionRatio * 2.5;
  ctx.lineCap = "round";

  ctx.strokeStyle = `rgba(255, 255, 255, ${life * 0.7})`;
  ctx.stroke();
}

      // Soft cursor head
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          8
        );

        gradient.addColorStop(
          0,
          "rgba(255, 255, 255, 0.85)"
        );

        gradient.addColorStop(
          0.65,
          "rgba(255, 255, 255, 0.3)"
        );

        gradient.addColorStop(
          1,
          "rgba(255, 255, 255, 0)"
        );

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);

      points.length = 0;
    };
  }, []);

  return (
<canvas
  ref={canvasRef}
  aria-hidden="true"
  className="
    pointer-events-none
    fixed
    inset-0
    z-[9999]
    hidden
    md:block
    mix-blend-difference
  "
/>
  );
};

export default InkCursor;