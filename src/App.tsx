import { useCallback, useState } from "react";
import type { Project } from "./data/portfolio";
import { MotionProvider, useMotion } from "./hooks/useMotion";
import { useReveal, useScrollScenes } from "./hooks/useScrollScenes";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CardStage from "./components/CardStage";
import OrbitScene from "./components/OrbitScene";
import SelectedWork from "./components/SelectedWork";
import Playground from "./components/Playground";
import About from "./components/About";
import ProjectIndex from "./components/ProjectIndex";
import ProjectDialog from "./components/ProjectDialog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function Portfolio() {
  const { enabled } = useMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  useScrollScenes(enabled);
  useReveal();
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <CardStage />
        <OrbitScene />
        <SelectedWork onSelect={setSelectedProject} />
        <Playground onSelect={setSelectedProject} />
        <About />
        <ProjectIndex onSelect={setSelectedProject} />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectDialog project={selectedProject} onClose={closeProject} />
      )}
    </>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <Portfolio />
    </MotionProvider>
  );
}
