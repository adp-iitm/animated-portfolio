"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, WheelEvent as ReactWheelEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { X } from "lucide-react";

type TheHumanSideProps = {
  open: boolean;
  onClose: () => void;
};

const LOADING_LINES = [
  "Switching context...",
  "Loading human profile...",
  "Loading interests...",
  "Building experience...",
  "Ready.",
];

type CardData = {
  icon: string;
  title: string;
  description: string;
  quote: string;
};

const CARDS: CardData[] = [
  {
    icon: "🌍",
    title: "Traveling",
    description:
      "Exploring new places allows me to understand different cultures, people and perspectives. Every journey teaches me something that books never could.",
    quote: "The world is the best classroom.",
  },
  {
    icon: "🚶",
    title: "Walking",
    description:
      "Long walks help me organize my thoughts, recharge mentally and often lead to better ideas while solving technical problems.",
    quote: "Great ideas rarely appear behind a desk.",
  },
  {
    icon: "🌐",
    title: "Geopolitics",
    description:
      "I enjoy following global affairs, economics and international relations to understand how technology shapes societies and how societies shape technology.",
    quote: "Technology never evolves in isolation.",
  },
  {
    icon: "🏛",
    title: "History",
    description:
      "History fascinates me because today's innovations are built on yesterday's discoveries, ideas and decisions.",
    quote: "The past explains the future.",
  },
];

function HumanCard({ card, index }: { card: CardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rawRotateY.set((px - 0.5) * 14);
    rawRotateX.set((0.5 - py) * 14);

    glowRef.current?.style.setProperty("--x", `${px * 100}%`);
    glowRef.current?.style.setProperty("--y", `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative shrink-0 snap-center"
      style={{ width: "min(340px, 80vw)" }}
    >
      {/* idle float */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* animated gradient border */}
        <div className="human-card-border rounded-[32px] p-[1.5px] shadow-[0_20px_60px_-15px_rgba(34,211,238,0.25)]">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 800 }}
            className="group relative overflow-hidden rounded-[32px] bg-[#0a0d16]/85 backdrop-blur-xl"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative h-full w-full p-8"
            >
              {/* mouse-reactive glow */}
              <div
                ref={glowRef}
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(34,211,238,0.18), transparent 55%)",
                }}
              />

              <div className="relative" style={{ transform: "translateZ(40px)" }}>
                <span className="text-5xl">{card.icon}</span>
                <h3 className="mt-6 font-heading text-2xl font-bold text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{card.description}</p>
                <p className="mt-6 border-l-2 border-cyan-400/50 pl-4 text-sm italic text-cyan-300/80">
                  "{card.quote}"
                </p>
              </div>

              {/* subtle particle interaction */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-cyan-300/40"
                    style={{ left: `${20 + i * 20}%`, top: `${15 + i * 18}%` }}
                    animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.6, 1] }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TheHumanSide({ open, onClose }: TheHumanSideProps) {
  const [stage, setStage] = useState<"loading" | "ready">("loading");
  const [lineIndex, setLineIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // run the terminal-style loading sequence every time it opens
  useEffect(() => {
    if (!open) return;
    setStage("loading");
    setLineIndex(0);

    const stepMs = 1300;
    const lineTimers = LOADING_LINES.map((_, i) =>
      setTimeout(() => setLineIndex(i + 1), stepMs * (i + 1))
    );
    const doneTimer = setTimeout(() => setStage("ready"), stepMs * LOADING_LINES.length + 15000);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [open]);

  // freeze background scroll while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // esc to close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // let the mouse wheel drive horizontal scroll
  const handleWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollRef.current?.scrollBy({ left: e.deltaY });
    }
  };

  return (
    <>
      <style>{`
        .human-card-border {
          background: linear-gradient(120deg, rgba(34,211,238,0.65), rgba(99,102,241,0.65), rgba(168,85,247,0.5), rgba(34,211,238,0.65));
          background-size: 300% 300%;
          animation: humanBorderSpin 6s ease infinite;
        }
        @keyframes humanBorderSpin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .human-side-scroll::-webkit-scrollbar { display: none; }
        .human-side-scroll { scrollbar-width: none; }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] overflow-hidden bg-[#05070d]"
            role="dialog"
            aria-modal="true"
            aria-label="The Human Side"
          >
            {/* aurora background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -left-1/4 top-[-20%] h-[70vh] w-[70vh] rounded-full bg-cyan-500/20 blur-[120px]"
                animate={{ x: [0, 80, -40, 0], y: [0, 40, -20, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-[-10%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-indigo-500/20 blur-[120px]"
                animate={{ x: [0, -60, 30, 0], y: [0, -30, 50, 0] }}
                transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[-25%] left-[30%] h-[55vh] w-[55vh] rounded-full bg-purple-500/15 blur-[130px]"
                animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-[#05070d]/40" />
            </div>

            {/* close */}
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close"
              className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 backdrop-blur-xl transition hover:border-cyan-400/40 hover:text-cyan-300"
            >
              <X size={18} />
            </button>

            {/* loading terminal */}
            <AnimatePresence>
              {stage === "loading" && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.01 }}
                  className="relative z-10 flex h-full w-full items-center justify-center"
                >
                  <div className="w-[280px] font-mono text-xs text-cyan-300/80 sm:text-sm">
                    {LOADING_LINES.slice(0, lineIndex).map((line, i) => (
                      <p key={line} className={i === lineIndex - 1 ? "text-white" : "opacity-40"}>
                        <span className="text-cyan-400">{">"}</span> {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* main experience */}
            {stage === "ready" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex h-full w-full flex-col"
              >
                <div className="mx-auto w-full max-w-5xl px-6 pt-16 text-center sm:pt-20">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-heading text-5xl font-black text-white sm:text-7xl"
                  >
                    The <span className="text-gradient">Human Side</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 text-lg text-white/70"
                  >
                    Technology is what I build. Curiosity is what drives me.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/40"
                  >
                    Beyond software, I'm fascinated by places, people, history and
                    understanding how the world works. These experiences shape the
                    way I think, learn and solve problems.
                  </motion.p>
                </div>

                {/* horizontal journey */}
                <div
                  ref={scrollRef}
                  onWheel={handleWheel}
                  className="human-side-scroll mt-12 flex flex-1 items-center gap-8 overflow-x-auto overflow-y-hidden px-[10vw] pb-10 snap-x snap-mandatory touch-pan-x"
                >
                  {CARDS.map((card, i) => (
                    <HumanCard key={card.title} card={card} index={i} />
                  ))}

                  {/* closing panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-full shrink-0 snap-center flex-col items-center justify-center text-center"
                    style={{ width: "min(500px, 85vw)" }}
                  >
                    <p className="font-heading text-3xl font-bold text-white sm:text-4xl">
                      Curiosity keeps me learning.
                      <br />
                      Learning keeps me building.
                    </p>
                    <p className="mt-5 max-w-sm text-sm text-white/40">
                      Every experience outside technology helps me become a better
                      engineer.
                    </p>
                  </motion.div>
                </div>

                <p className="pb-6 text-center text-[11px] uppercase tracking-widest text-white/20">
                  Scroll or swipe to explore · Esc to close
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
