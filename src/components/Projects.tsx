
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Rocket } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, type Project } from "../data";
import { Reveal } from "./Reveal";

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const featured =
    project.id === "visioncapture" || project.id === "adi-assistant";

  const highlights: Record<string, string[]> = {
    "visioncapture": [
      "Real-time object detection",
      "FastAPI backend",
      "React dashboard",
    ],
    "adi-assistant": [
      "AI coding assistant",
      "Code generation",
      "Debugging workflows",
    ],
    "hospital-management": [
      "Role-based login",
      "Appointments",
      "Patient records",
    ],
    "data-analysis-agent": [
      "Dataset cleaning",
      "Charts",
      "AI summaries",
    ],
    "cybersafe-ai": [
      "Fraud detection",
      "Phishing analysis",
      "ML models",
    ],
    "trekking-management": [
      "Admin dashboard",
      "Bookings",
      "Staff management",
    ],
    "rewear": [
      "Community exchange",
      "Listings",
      "Point system",
    ],
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="glass glow-border overflow-hidden rounded-3xl"
    >
      <div className={`relative h-44 bg-gradient-to-br ${project.accent}`}>
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute left-5 top-5 flex gap-2">
          {featured && (
            <span className="rounded-full bg-yellow-400/20 border border-yellow-400/30 px-3 py-1 text-xs text-yellow-300">
              ⭐ Featured
            </span>
          )}

          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white">
            Personal Project
          </span>
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="font-heading text-2xl font-bold">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-white/80">
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="p-6">
        <p className="leading-relaxed text-[#9CA3AF]">
          {project.description}
        </p>

        <div className="mt-5 space-y-2">
          {(highlights[project.id] ?? []).map((h) => (
            <p key={h} className="text-sm text-white/75">
              ✓ {h}
            </p>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
          >
            <FaGithub size={15} />
            GitHub
          </a>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm"
            >
              <Rocket size={15} />
              Live Demo
            </a>
          ) : (
            <span className="rounded-full border border-dashed border-white/15 px-4 py-2 text-sm text-white/50">
              Deployment Planned
            </span>
          )}

          <button
            onClick={() => onOpen(project)}
            className="ml-auto text-cyan-300"
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-400">
          Projects
        </p>
        <h2 className="font-heading text-4xl font-bold">
          Projects I've <span className="text-gradient">built and learned from.</span>
        </h2>
      </Reveal>

      <div className="relative mt-10 max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-4"
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p)=>(
          <ProjectCard key={p.id} project={p} onOpen={setActive}/>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            onClick={()=>setActive(null)}
          >
            <motion.div
              onClick={(e)=>e.stopPropagation()}
              className="glass w-full max-w-2xl rounded-3xl p-8"
              initial={{scale:.95,opacity:0}}
              animate={{scale:1,opacity:1}}
              exit={{scale:.95,opacity:0}}
            >
              <button className="float-right" onClick={()=>setActive(null)}>
                <X/>
              </button>

              <h3 className="text-3xl font-bold">{active.title}</h3>

              <p className="mt-5 leading-relaxed text-[#9CA3AF]">
                {active.description}
              </p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
