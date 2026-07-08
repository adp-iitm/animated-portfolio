"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { GraduationCap, Code2, Trophy } from "lucide-react";
import { Reveal } from "./Reveal";

// ---------------------------------------------------------------------------
// Data — pulled directly from Aditya's resume, chronological order.
// Move this into ../data.ts if you'd rather keep it alongside your other data.
// ---------------------------------------------------------------------------

type JourneyType = "Education" | "Project" | "Leadership";

type JourneyItem = {
  year: string;
  range: string;
  title: string;
  org: string;
  type: JourneyType;
  description: string;
  current?: boolean;
};

const journey: JourneyItem[] = [
  {
    year: "2019",
    range: "Apr 2019 – Mar 2022 · CBSE",
    title: "Class 10 & 12 Schooling",
    org: "DAV Centenary Public School, Ajmer",
    type: "Education",
    description:
      "Completed Class 10 and Class 12, laying the foundation before moving into engineering.",
  },
  {
    year: "2023",
    range: "Aug 2023 – Jun 2027",
    title: "B.E. Information Science & Engineering",
    org: "The National Institute of Engineering (NIE), Mysuru",
    type: "Education",
    description:
      "Started my engineering degree — core coursework spanning DBMS, Operating Systems, and Data Structures & Algorithms.",
  },
  {
    year: "2023",
    range: "Jun 2023 – Jun 2027",
    title: "BS in Data Science",
    org: "Indian Institute of Technology (IIT), Madras",
    type: "Education",
    description:
      "Took on a second degree alongside my B.E., diving into System Commands and Business Data Management.",
  },
  {
    year: "2024",
    range: "2024 – Present",
    title: "Chess Club Lead, Corbett Knight",
    org: "IIT Madras",
    type: "Leadership",
    description:
      "Organized 5 tournaments with 100+ participants and led an 8-person committee, growing club engagement by 150%.",
  },
  {
    year: "2024",
    range: "Nov 2024 – Jan 2025",
    title: "Data Analyst Agent",
    org: "Python · FastAPI · LangChain · Google Gemini",
    type: "Project",
    description:
      "Built an NLP-to-Python code generation pipeline that automated 80% of exploratory data analysis, running in a sandboxed environment with sub-2s visualization response times.",
  },
  {
    year: "2025",
    range: "Jan 2025 – Present",
    title: "Adi Assistant — AI-Powered Coding Platform",
    org: "Node.js · Vercel AI SDK · Docker",
    type: "Project",
    description:
      "A browser-based IDE serving 100+ developers with zero local setup. Orchestrates 3 LLM providers with fallback routing, cut API costs 40%, and dropped deploy time from 30min to 90sec.",
    current: true,
  },
  {
    year: "2025",
    range: "Mar 2025 – Present",
    title: "Scalable Video Intelligence System",
    org: "React · Express.js · OpenCV · Firebase",
    type: "Project",
    description:
      "An AI-powered platform turning 15+ live camera feeds into real-time insight, cutting manual surveillance workload by 70% with 95%+ accurate facial recognition across a 200+ user database.",
    current: true,
  },
];

const ICONS: Record<JourneyType, typeof GraduationCap> = {
  Education: GraduationCap,
  Project: Code2,
  Leadership: Trophy,
};

// Winding road drawn in a fixed 200x1000 coordinate space, then stretched
// (preserveAspectRatio="none") to match however tall the timeline actually is.
const ROAD_PATH =
  "M100,0 C100,90 30,90 30,180 C30,270 170,270 170,360 C170,450 30,450 30,540 C30,630 170,630 170,720 C170,810 30,810 30,900 C30,960 100,960 100,1000";

// ---------------------------------------------------------------------------
// Road: the animated SVG path + a glowing marker that tracks scroll progress
// along the actual curve (not just linear %), using getPointAtLength.
// ---------------------------------------------------------------------------

function Road({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const clamped = Math.min(Math.max(v, 0), 1);
    const point = path.getPointAtLength(clamped * length);
    dotRef.current?.setAttribute("cx", String(point.x));
    dotRef.current?.setAttribute("cy", String(point.y));
    glowRef.current?.setAttribute("cx", String(point.x));
    glowRef.current?.setAttribute("cy", String(point.y));
  });

  return (
    <svg
      viewBox="0 0 200 1000"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-32 -translate-x-1/2 lg:block"
    >
      <defs>
        <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="roadBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* base track */}
      <path
        d={ROAD_PATH}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={14}
        strokeLinecap="round"
      />

      {/* animated dashed centerline — gives the "moving road" feel */}
      <path
        d={ROAD_PATH}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={2}
        strokeDasharray="6 10"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-160"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      {/* progress fill — draws itself in as you scroll */}
      <motion.path
        ref={pathRef}
        d={ROAD_PATH}
        fill="none"
        stroke="url(#roadGrad)"
        strokeWidth={5}
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />

      {/* "you are here" marker, follows the curve exactly */}
      <circle ref={glowRef} r={14} fill="url(#roadGrad)" filter="url(#roadBlur)" opacity={0.55} />
      <circle ref={dotRef} r={6} fill="#fff" stroke="#22d3ee" strokeWidth={3} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Experience section
// ---------------------------------------------------------------------------

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          Journey
        </p>
        <h2 className="font-heading text-4xl font-bold sm:text-5xl">
          My <span className="text-gradient">learning journey.</span>
        </h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-[#9CA3AF]">
          Every project and milestone has helped me grow as a developer —
          from coursework fundamentals to shipping AI-powered, full-stack
          systems.
        </p>
      </Reveal>

      <div ref={containerRef} className="relative mt-20">
        <Road progress={scrollYProgress} />

        {/* simple straight line fallback on mobile, where the road is hidden */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-white/10 to-indigo-500/60 lg:hidden" />

        <div className="space-y-14 lg:space-y-24">
          {journey.map((item, index) => {
            const Icon = ICONS[item.type];
            const alignRight = index % 2 === 1;

            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0">
                  {/* mobile dot marker */}
                  <span className="absolute left-2.5 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-cyan-400 bg-[#05070d] lg:hidden" />

                  <div className={alignRight ? "lg:col-start-2" : "lg:col-start-1"}>
                    <motion.div
                      initial={{ opacity: 0, x: alignRight ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.5 }}
                      className="glass glow-border rounded-3xl p-8"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-300">
                          <Icon size={14} />
                          {item.type}
                        </span>

                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                            In progress
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-xs uppercase tracking-widest text-white/40">
                        {item.range}
                      </p>

                      <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-cyan-300">{item.org}</p>

                      <p className="mt-5 leading-7 text-[#9CA3AF]">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
