import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { TopBanner } from './components/TopBanner';
import { Hero } from './components/Hero';
import { WorksGrid } from './components/WorksGrid';
import { ArtworkLightbox } from './components/ArtworkLightbox';
import { ProcessAndTools } from './components/ProcessAndTools';
import { Testimonials } from './components/Testimonials';
import { FooterContact } from './components/FooterContact';
import { ContactModal } from './components/ContactModal';
import { Project, PROJECTS } from './data/portfolioData';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis and prevent body scroll when Lightbox or ContactModal is active
  useEffect(() => {
    if (selectedProject || isContactOpen) {
      lenisRef.current?.stop();
      document.body.classList.add('overflow-hidden');
    } else {
      lenisRef.current?.start();
      document.body.classList.remove('overflow-hidden');
    }
  }, [selectedProject, isContactOpen]);

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-secondary)] font-sans selection:bg-[var(--accent-velvet)] selection:text-[var(--text-primary)]">
      {/* 1. Sticky Editorial Top Page Ribbon */}
      <TopBanner onOpenContact={() => setIsContactOpen(true)} />

      {/* 2. Hero Section (Magazine Cover Layered Composition) */}
      <Hero onOpenContact={() => setIsContactOpen(true)} />

      {/* 3. Selected Works (Clickable High-Resolution Gallery) */}
      <WorksGrid onSelectProject={(p) => setSelectedProject(p)} />

      {/* 4. Methodology & Toolkit (Split Editorial Bento: Process & Tools) */}
      <ProcessAndTools />

      {/* 5. Client Testimonials (Kind Words) */}
      <Testimonials />

      {/* 6. Contact & Editorial Footer */}
      <FooterContact onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Full-Resolution Lightbox Modal */}
      <ArtworkLightbox
        project={selectedProject}
        allProjects={PROJECTS}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Slide-Over Contact Drawer Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;
