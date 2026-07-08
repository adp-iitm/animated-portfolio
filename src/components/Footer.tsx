import { motion } from "framer-motion";
import { Heart, ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { socials } from "../data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="font-heading text-2xl font-bold">
              Aditya Pareek
            </h3>

            <p className="mt-3 max-w-md leading-relaxed text-[#9CA3AF]">
              Information Science Engineering student passionate about
              Artificial Intelligence, Backend Development, and building
              software that solves real-world problems.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-2 rounded-full px-5 py-3 transition hover:border-indigo-500/40"
            >
              <FaGithub size={17} />
              GitHub
            </a>

            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-2 rounded-full px-5 py-3 transition hover:border-indigo-500/40"
            >
              <FaLinkedin size={17} />
              LinkedIn
            </a>

            <a
              href={`mailto:${socials.email}`}
              className="glass flex items-center gap-2 rounded-full px-5 py-3 transition hover:border-indigo-500/40"
            >
              <Mail size={17} />
              Email
            </a>

          </div>

        </div>

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col gap-4 text-sm text-[#6B7280] md:flex-row md:items-center md:justify-between">

          <p>
            © {year} Aditya Pareek. All rights reserved.
          </p>

       
          <a
            href="#home"
            className="group flex items-center gap-2 hover:text-white"
          >
            Back to top

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />

          </a>

        </div>

      </div>
    </footer>
  );
}