import { useEffect, useRef } from "react";
import { useMotion } from "../hooks/useMotion";
import { Star } from "./Icon";

export default function OrbitScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { enabled } = useMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;
    let width = 600;
    let height = 600;
    let frame = 0;
    let visible = false;
    let lastTime = 0;
    let phase = 0;
    const compact = window.matchMedia("(max-width: 800px)").matches;
    const columns = compact ? 100 : 170;
    const rows = compact ? 7 : 11;
    const points: Array<{
      angle: number;
      cross: number;
      color: string;
      size: number;
    }> = [];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const angle = (i / columns) * Math.PI * 2;
        const cross = (j / rows) * Math.PI * 2;
        const light = Math.round(68 + 27 * ((Math.sin(angle + cross) + 1) / 2));
        points.push({
          angle,
          cross,
          color: `hsl(${265 + j * 2} 95% ${light}%)`,
          size: 0.65 + (j % 3) * 0.18,
        });
      }
    }
    const draw = (time = 0) => {
      frame = 0;
      // Stop entirely when the scene is offscreen, hidden, or motion is paused.
      if (enabled && visible && !document.hidden) {
        if (lastTime) phase += Math.min(time - lastTime, 48) * 0.00023;
        lastTime = time;
      } else lastTime = 0;
      context.clearRect(0, 0, width, height);
      const unit = Math.min(width, height) / 600;
      const rotation = phase * 0.23;
      const sinR = Math.sin(rotation),
        cosR = Math.cos(rotation);
      for (const p of points) {
        const major =
          174 +
          Math.sin(p.angle * 5 + phase * 1.6) * 12 +
          Math.cos(p.angle * 3 - phase) * 7;
        const minor = 22 + Math.sin(p.angle * 4 + phase) * 7;
        const radius = major + Math.cos(p.cross) * minor;
        const x = Math.cos(p.angle) * radius;
        const y = Math.sin(p.angle) * radius;
        const z =
          Math.sin(p.cross) * minor + Math.sin(p.angle * 3 + phase) * 14;
        const rotatedX = x * cosR - y * sinR;
        const rotatedY = (x * sinR + y * cosR) * 0.94 + z * 0.65;
        context.globalAlpha = 0.4 + (Math.sin(p.cross) + 1) * 0.26;
        context.fillStyle = p.color;
        const size = p.size * unit;
        context.fillRect(
          width / 2 + rotatedX * unit,
          height / 2 + rotatedY * unit,
          size,
          size,
        );
      }
      context.globalAlpha = 1;
      if (enabled && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      draw();
    };
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width || 600;
      height = bounds.height || 600;
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      restart();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        restart();
      },
      { rootMargin: "60px" },
    );
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", restart);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", restart);
    };
  }, [enabled]);

  return (
    <section
      className="orbit-section"
      data-scene="orbit"
      aria-labelledby="orbit-heading"
    >
      <div className="orbit-sticky">
        <span className="portal-corner portal-tl" aria-hidden="true" />
        <span className="portal-corner portal-tr" aria-hidden="true" />
        <span className="portal-corner portal-bl" aria-hidden="true" />
        <span className="portal-corner portal-br" aria-hidden="true" />
        <div className="orbit-topline container">
          <span>(03 — THE FEELING)</span>
          <span>DESIGN × CODE × CURIOSITY</span>
        </div>
        <div className="orb-shell" aria-hidden="true">
          <div className="orb-halo" />
          <canvas ref={canvasRef} />
          <Star className="orb-star" />
        </div>
        <div className="orbit-caption container">
          <h2 id="orbit-heading">
            A little motion.
            <br />
            <span>A lasting impression.</span>
          </h2>
          <p>
            I care about how it works.
            <br />
            And just as much about how it feels.
          </p>
        </div>
      </div>
    </section>
  );
}
