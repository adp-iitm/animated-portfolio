import { skillGroups } from "../data";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          Skills
        </p>

        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          Technologies I use to <span className="text-gradient">build software.</span>
        </h2>

        <p className="mt-5 max-w-3xl text-[#9CA3AF] leading-relaxed">
          Over the last few years I've explored different technologies through
          academic projects, hackathons, internships, and personal learning.
          These are the tools I'm most comfortable working with today.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.08}>
            <div className="glass glow-border rounded-2xl p-7 h-full">
              <h3 className="mb-6 font-heading text-xl font-semibold text-white">
                {group.label}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all duration-300 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}