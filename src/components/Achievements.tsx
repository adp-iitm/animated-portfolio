
import { achievements } from "../data";
import { Reveal } from "./Reveal";
import { Trophy, FolderGit2, BrainCircuit, Code2 } from "lucide-react";

const icons = [FolderGit2, BrainCircuit, Code2, Trophy];

export function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-400">
          Highlights
        </p>

        <h2 className="font-heading text-4xl font-bold">
          A quick look at what I've <span className="text-gradient">built so far.</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal key={item.label} delay={index * 0.08}>
              <div className="glass glow-border rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2">
                <div className="mb-6 inline-flex rounded-2xl bg-indigo-500/10 p-3 text-indigo-300">
                  <Icon size={24} />
                </div>

                <h3 className="text-4xl font-bold">
                  {item.value}
                  {item.suffix}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">
                  {item.label}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
