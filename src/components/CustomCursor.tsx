import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(isFine);
    if (!isFine) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glow = { x: pos.x, y: pos.y };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };

    let raf = 0;
    const animate = () => {
      glow.x += (pos.x - glow.x) * 0.12;
      glow.y += (pos.y - glow.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glow.x}px, ${glow.y}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen transition-[width,height] duration-300"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.35), rgba(6,182,212,0.12) 55%, transparent 70%)",
          width: hovering ? 96 : 64,
          height: hovering ? 96 : 64,
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[91] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 transition-[width,height,background-color] duration-200"
        style={{
          width: hovering ? 16 : 8,
          height: hovering ? 16 : 8,
          backgroundColor: hovering ? "rgba(6,182,212,0.9)" : "rgba(255,255,255,0.9)",
        }}
      />
    </>
  );
}
