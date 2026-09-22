
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

    // Actual mouse position
    const target = {
      x: -100,
      y: -100,
    };

    // Smooth cursor position
    const mouse = {
      x: -100,
      y: -100,
      active: false,
    };

    const EASE = 0.06;

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
      target.x = event.clientX;
      target.y = event.clientY;

      if (!mouse.active) {
        mouse.x = target.x;
        mouse.y = target.y;
        mouse.active = true;

        addPoint(mouse.x, mouse.y);
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.active) {
        // Smooth delayed movement
        mouse.x += (target.x - mouse.x) * EASE;
        mouse.y += (target.y - mouse.y) * EASE;

        // Add interpolated points for a continuous trail
        const lastPoint = points[points.length - 1];

        if (lastPoint) {
          const dx = mouse.x - lastPoint.x;
          const dy = mouse.y - lastPoint.y;

          const distance = Math.sqrt(dx * dx + dy * dy);
          const steps = Math.min(Math.ceil(distance / 3), 40);

          for (let i = 1; i <= steps; i++) {
            const progress = i / steps;

            addPoint(
              lastPoint.x + dx * progress,
              lastPoint.y + dy * progress
            );
          }
        } else {
          addPoint(mouse.x, mouse.y);
        }
      }

      // Tail dissolves first
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].life -= 0.005;

        if (points[i].life <= 0) {
          points.splice(i, 1);
        }
      }

      // Draw ink trail
      for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const current = points[i];

        const life = Math.min(previous.life, current.life);

        if (life <= 0) continue;

        const positionRatio = i / points.length;

        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(current.x, current.y);

        // Thin tail, thick head
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