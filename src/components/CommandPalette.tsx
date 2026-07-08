import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";

const commands = [
  { label: "Go to About", target: "#about" },
  { label: "Go to Skills", target: "#skills" },
  { label: "Go to Projects", target: "#projects" },
  { label: "Go to Experience", target: "#experience" },
  { label: "Go to Achievements", target: "#achievements" },
  { label: "Go to Certifications", target: "#certifications" },
  { label: "Go to Education", target: "#education" },
  { label: "Go to GitHub", target: "#github" },
  { label: "Go to Contact", target: "#contact" },
  { label: "Download Resume", target: "/Aditya_Pareek_Resume.pdf" },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const filtered = useMemo(
    () => commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const go = (target: string) => {
    if (target.startsWith("#")) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(target, "_blank");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99] flex items-start justify-center bg-black/70 p-4 pt-28 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass glow-border w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={16} className="text-white/40" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section…"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/40">Esc</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-white/30">No matches.</p>
              )}
              {filtered.map((c) => (
                <button
                  key={c.label}
                  onClick={() => go(c.target)}
                  className="flex w-full items-center rounded-xl px-4 py-2.5 text-left text-sm text-white/75 hover:bg-white/5 hover:text-white"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
