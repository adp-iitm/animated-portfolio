import { Reveal } from "./Reveal";
import { Braces, Cloud, Cpu, GitBranch } from "lucide-react";

const interests = [
  "Python",
  "FastAPI",
  "React",
  "Machine Learning",
  "PostgreSQL",
  "REST APIs",
  "OpenCV",
  "Docker",
  "Git & GitHub",
];

const pillars = [
  {
    icon: Cpu,
    title: "Artificial Intelligence",
    copy: "Building practical AI applications using machine learning, computer vision, and automation.",
  },
  {
    icon: Braces,
    title: "Backend Development",
    copy: "Creating REST APIs and backend services using FastAPI, Flask, and Django.",
  },
  {
    icon: Cloud,
    title: "Deployment",
    copy: "Deploying projects on Vercel, Netlify, and cloud platforms while learning modern DevOps practices.",
  },
  {
    icon: GitBranch,
    title: "Continuous Learning",
    copy: "Exploring new technologies through personal projects, open-source projects, and hands-on experimentation.",
  },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          About
        </p>

        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          From classroom ideas to{" "}
          <span className="text-gradient">real-world projects.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5">
        <Reveal delay={0.1} className="lg:col-span-3">
          <p className="text-lg leading-relaxed text-white/80">
            I'm an Information Science Engineering student who enjoys building
            software that solves practical problems. My journey started with
            Python programming and gradually expanded into backend development,
            full-stack web applications, and artificial intelligence. I enjoy
            understanding how every part of an application works—from the
            database and APIs to the user interface.
          </p>

          <p className="mt-5 leading-relaxed text-[#9CA3AF]">
            Most of my learning comes from building projects. Whether it's a
            hospital management system, an AI application, a trekking
            management platform, or a machine learning model, every project
            teaches me something new about writing cleaner code, solving
            real-world problems, and continuously improving as a developer.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {interests.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 transition-colors hover:border-indigo-400/40 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.15 + i * 0.08}>
              <div className="glass glow-border group h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <p.icon size={20} className="text-indigo-400" />

                <h3 className="mt-3 font-heading text-base font-semibold">
                  {p.title}
                </h3>

                <p className="mt-1.5 text-sm leading-relaxed text-[#9CA3AF]">
                  {p.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}