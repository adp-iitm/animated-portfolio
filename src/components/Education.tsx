import { Reveal } from "./Reveal";
import { education } from "../data";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-4xl px-6 py-28">
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">Education</p>
        <h2 className="font-heading text-3xl font-bold sm:text-4xl">
          Two degrees, <span className="text-gradient">one direction.</span>
        </h2>
      </Reveal>

      <div className="mt-14 space-y-6">
        {education.map((edu, i) => (
          <Reveal key={edu.title} delay={i * 0.1}>
            <div className="glass glow-border flex flex-col gap-4 rounded-2xl p-7 sm:flex-row sm:items-start">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/20">
                <GraduationCap size={20} className="text-violet-300" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold">{edu.title}</h3>
                <p className="mt-1 text-sm text-indigo-300/80">{edu.place}</p>
                <p className="font-mono text-xs text-white/40">{edu.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#9CA3AF]">{edu.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
