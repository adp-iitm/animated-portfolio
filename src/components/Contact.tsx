import {
  Mail,
  MapPin,
  Download,
  ArrowRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Reveal } from "./Reveal";
import { socials } from "../data";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <Reveal>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
          Contact
        </p>

        <h2 className="font-heading text-4xl font-bold sm:text-5xl">
          Let's <span className="text-gradient">connect.</span>
        </h2>

        <p className="mt-5 max-w-2xl leading-relaxed text-[#9CA3AF]">
          I'm always interested in discussing AI, backend development,
          internships, or exciting software projects. Feel free to reach out
          through any of the platforms below.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2">

        <div className="glass glow-border rounded-3xl p-8">

          <h3 className="text-2xl font-bold">
            Get in touch
          </h3>

          <div className="mt-8 space-y-6">

            <a
              href={`mailto:${socials.email}`}
              className="flex items-center gap-4 text-white/80 hover:text-white"
            >
              <Mail className="text-cyan-300" />
              {socials.email}
            </a>

            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 text-white/80 hover:text-white"
            >
              <FaGithub className="text-cyan-300" />
              github.com/adp-iitm
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 text-white/80 hover:text-white"
            >
              <FaLinkedin className="text-cyan-300" />
              LinkedIn
            </a>

            <div className="flex items-center gap-4 text-white/80">
              <MapPin className="text-cyan-300" />
              Mysuru, Karnataka, India
            </div>

          </div>
        </div>

        <div className="glass glow-border flex flex-col justify-between rounded-3xl p-8">

          <div>

            <h3 className="text-2xl font-bold">
              Looking for an AI or Full Stack Developer?
            </h3>

            <p className="mt-5 leading-relaxed text-[#9CA3AF]">
              I'm currently looking for internship and full-time opportunities
              where I can contribute, learn from experienced engineers, and
              continue building impactful software.
            </p>

          </div>

          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="/Aditya_Pareek_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3"
            >
              <Download size={18} />
              Resume
            </a>

            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3"
            >
              <ArrowRight size={18} />
              View GitHub
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}