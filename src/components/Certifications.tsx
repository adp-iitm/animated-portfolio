import { motion } from "framer-motion";
import { BookOpen, Brain, Cpu, Database, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const learning = [
  {
    icon: Brain,
    title: "Artificial Intelligence",
    description:
      "Exploring LLMs, AI agents, prompt engineering, RAG and practical AI applications.",
  },
  {
    icon: Cpu,
    title: "Backend Engineering",
    description:
      "Building scalable APIs with FastAPI, Flask and Django while improving system design skills.",
  },
  {
    icon: Database,
    title: "Machine Learning",
    description:
      "Working on model development, feature engineering, evaluation and deployment using Python.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description:
      "Learning through personal projects, hackathons, open-source repositories and technical documentation.",
  },
];

export function Certifications() {
  return (
    <section
      id="learning"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          Currently Learning
        </p>

        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          Always <span className="text-gradient">improving.</span>
        </h2>

        <p className="mt-5 max-w-2xl leading-relaxed text-[#9CA3AF]">
          Technology changes quickly, so I enjoy learning by building real
          projects, participating in hackathons, and experimenting with new
          tools rather than collecting certificates.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {learning.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              className="glass glow-border rounded-3xl p-7"
            >
              <item.icon className="text-cyan-300" size={26} />

              <h3 className="mt-5 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 leading-relaxed text-[#9CA3AF]">
                {item.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-indigo-300">
                <ArrowRight size={16} />
                Learning through real projects
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}