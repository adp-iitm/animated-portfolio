import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { ReactNode, MouseEvent } from "react";

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.4 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref as never}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      data-cursor-hover
      className={className}
    >
      <motion.span animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }} className="inline-flex items-center gap-2">
        {children}
      </motion.span>
    </Comp>
  );
}
