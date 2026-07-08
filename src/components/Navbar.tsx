
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X, Sparkles } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "education", label: "Education" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

type NavbarProps = {
  onOpenPalette: () => void;
  onOpenHumanSide: () => void;
};

export function Navbar({ onOpenPalette, onOpenHumanSide }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4"
    >
      <div className={`glass flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3 ${scrolled ? "shadow-lg shadow-black/30" : ""}`}>
        <a href="#hero" className="font-heading text-lg font-semibold tracking-tight">
          Aditya<span className="text-gradient">.dev</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="relative rounded-full px-3.5 py-1.5 text-sm text-white/70 hover:text-white"
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHumanSide}
            className="hidden lg:flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-400/20 hover:text-white"
          >
            <Sparkles size={15} />
            The Human Side
          </button>

          <button
            onClick={onOpenPalette}
            className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:text-white"
          >
            <Command size={13} />
            <span>K</span>
          </button>

          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          >
            {menuOpen ? <X size={16}/> : <Menu size={16}/>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{opacity:0,y:-10}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-10}}
            className="glass absolute inset-x-4 top-[4.5rem] rounded-2xl p-3 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {links.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm text-white/80 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenHumanSide();
                }}
                className="mt-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-left text-sm text-cyan-300 hover:bg-cyan-400/20"
              >
                ✨ The Human Side
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
