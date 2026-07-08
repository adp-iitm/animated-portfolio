import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { roles } from "../data";
import { MagneticButton } from "./MagneticButton";

// Drop profile-cutout.png into your assets folder and adjust this path if needed.
import portrait from "../assets/profile-cutout.png";

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 35 : 65;
    const pause = 1400;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

function HeroIllustration() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-40, 40], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-40, 40], [-6, 6]), { stiffness: 120, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="relative mx-auto flex h-[400px] w-[340px] items-center justify-center sm:h-[480px] sm:w-[400px]"
    >
      <style>{`
        @keyframes heroRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ambient glow, matches site palette */}
      <motion.div
        className="absolute -left-6 top-4 h-56 w-56 rounded-full bg-cyan-500/25 blur-[80px]"
        style={{ transform: "translateZ(10px)" }}
        animate={{ x: [0, 16, -8, 0], y: [0, -12, 8, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-6 bottom-10 h-56 w-56 rounded-full bg-indigo-500/25 blur-[80px]"
        style={{ transform: "translateZ(10px)" }}
        animate={{ x: [0, -16, 8, 0], y: [0, 12, -8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* a couple of floating accent shapes for depth */}
      <motion.div
        className="absolute h-14 w-14 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/30 to-cyan-400/20 backdrop-blur-md"
        style={{ top: "2%", left: "-4%", transform: "translateZ(90px)" }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute h-10 w-10 rounded-full border border-white/10 bg-gradient-to-br from-violet-500/30 to-indigo-500/20 backdrop-blur-md"
        style={{ top: "6%", right: "0%", transform: "translateZ(110px)" }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* portrait */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ transform: "translateZ(50px)" }}
      >
        <div
          className="absolute inset-[-12px] rounded-[40%_60%_55%_45%/50%_45%_55%_50%] opacity-70 blur-md"
          style={{
            background: "conic-gradient(from 0deg, #22d3ee, #6366f1, #a855f7, #22d3ee)",
            animation: "heroRingSpin 10s linear infinite",
          }}
        />
        <div className="relative h-[300px] w-[260px] overflow-hidden rounded-[40%_60%_55%_45%/50%_45%_55%_50%] border border-white/10 bg-[#0a0d16] shadow-[0_30px_80px_-20px_rgba(34,211,238,0.35)] sm:h-[360px] sm:w-[310px]">
          <img
            src={portrait}
            alt="Aditya Pareek"
            className="h-full w-full object-cover"
            style={{
              maskImage: "radial-gradient(120% 120% at 50% 32%, black 65%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(120% 120% at 50% 32%, black 65%, transparent 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d]/55 via-transparent to-transparent" />
        </div>
      </motion.div>

      {/* terminal card, layered in front, overlapping the portrait */}
      <div
        className="glass absolute -bottom-6 -right-4 flex w-64 flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/85 px-5 py-4 font-mono text-[12px] text-white/75 shadow-2xl shadow-black/40 backdrop-blur-xl sm:-right-8 sm:w-72 sm:text-[13px]"
        style={{ transform: "translateZ(130px)" }}
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        <div>
          <p className="text-white/60">&gt; whoami</p>
          <p className="pl-4 pt-1 font-semibold text-cyan-300">Aditya Pareek</p>
        </div>

        <div>
          <p className="text-white/60">&gt; current_focus</p>
          <p className="pl-4 pt-1">AI • Backend • Full Stack</p>
        </div>

        <div>
          <p className="text-white/60">&gt; github</p>
          <a
            href="https://github.com/adp-iitm"
            target="_blank"
            rel="noopener noreferrer"
            className="block pl-4 pt-1 text-indigo-300 transition-colors hover:text-indigo-200"
          >
            github.com/adp-iitm
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Open to opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            Hi, I'm <br />
            <span className="text-gradient">Aditya Pareek</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 h-8 font-heading text-xl text-white/80 sm:text-2xl"
          >
            <span className="text-gradient">{typed}</span>
            <span className="animate-caret text-cyan-300">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[#9CA3AF] sm:text-lg"
          >
            I build intelligent applications, scalable backend systems, and modern web experiences using AI, Machine Learning, and Full Stack technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-950/40"
            >
              View Projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="/Aditya_Pareek_Resume.pdf"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-md hover:bg-white/10"
            >
              <Download size={16} /> Download Resume
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="rounded-full px-6 py-3 text-sm font-medium text-white/70 hover:text-white"
            >
              Let's Connect
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HeroIllustration />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-widest text-white/40 sm:flex"
      >
        <span>Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
