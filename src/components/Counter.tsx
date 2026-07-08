import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useReveal } from "../hooks/useReveal";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, visible } = useReveal<HTMLSpanElement>(0.5);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!visible) return;
    const controls = animate(count, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [visible, value, count]);

  return (
    <motion.span ref={ref} className="font-heading text-4xl font-bold text-white sm:text-5xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}
