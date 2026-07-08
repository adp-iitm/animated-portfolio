import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "./components/Loader";
import { Background } from "./components/Background";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress, ScrollToTop } from "./components/ScrollChrome";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Marquee } from "./components/Marquee";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Achievements } from "./components/Achievements";
import { Certifications } from "./components/Certifications";
import { Education } from "./components/Education";
import { GithubStats } from "./components/GithubStats";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CommandPalette } from "./components/CommandPalette";
import { NotFound } from "./components/NotFound";
import { TheHumanSide } from "./components/TheHumanSide";

function App() {
  const [loading, setLoading] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [humanSideOpen, setHumanSideOpen] = useState(false);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isKnownRoute = path === "/" || path === "";

  if (!isKnownRoute) {
    return <NotFound />;
  }

  return (
    <>
      <Loader show={loading} />

      {/* Everything below dims, blurs and shrinks slightly while
          "The Human Side" is open, and freezes so it can't scroll
          or be interacted with underneath the overlay. */}
      <motion.div
        animate={{
          scale: humanSideOpen ? 0.98 : 1,
          filter: humanSideOpen ? "blur(14px) brightness(0.55)" : "blur(0px) brightness(1)",
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformOrigin: "center",
          pointerEvents: humanSideOpen ? "none" : "auto",
          overflow: humanSideOpen ? "hidden" : undefined,
          height: humanSideOpen ? "100vh" : undefined,
        }}
      >
        <Background />
        <CustomCursor />
        <ScrollProgress />

        <Navbar
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenHumanSide={() => setHumanSideOpen(true)}
        />

        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
        />

        <main>

          <Hero />

          <Projects />

          <About />

          <Experience />

          <Skills />

          <Marquee />

          <GithubStats />

          <Achievements />

          <Education />

          <Certifications />

          <Contact />

        </main>

        <Footer />

        <ScrollToTop />
      </motion.div>

      <TheHumanSide open={humanSideOpen} onClose={() => setHumanSideOpen(false)} />
    </>
  );
}

export default App;
