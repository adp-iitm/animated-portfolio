import { techMarquee } from "../data";

export function Marquee() {
  const doubled = [...techMarquee, ...techMarquee];
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#09090B] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#09090B] to-transparent" />
      <div className="flex w-max gap-10 animate-marquee">
        {doubled.map((tech, i) => (
          <span key={`${tech}-${i}`} className="font-heading text-lg font-medium text-white/25">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
