import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface TopBannerProps {
  onOpenContact: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onOpenContact }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState<string>('works');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['works', 'process', 'tools', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-11 bg-[#0F1412]/85 backdrop-blur-md border-b border-[var(--border-hairline)] select-none">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs tracking-wider">
        {/* Left: Availability Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-sage)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-sage)]"></span>
          </span>
          <span className="text-[var(--text-secondary)] font-light hidden sm:inline">
            Accepting Select Graphic Design & Brand Identity Projects
          </span>
          <span className="text-[var(--text-secondary)] font-light sm:hidden">
            Available for Projects
          </span>
        </div>

        {/* Center / Right: Anchor Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-[var(--text-muted)] font-medium">
          {[
            { id: 'works', label: 'Works' },
            { id: 'process', label: 'Process' },
            { id: 'tools', label: 'Tools' },
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`transition-colors duration-200 uppercase text-[11px] tracking-widest hover:text-[var(--text-primary)] relative py-1 ${
                activeSection === item.id ? 'text-[var(--text-primary)]' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--accent-sage)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent-sage)] hover:bg-[#1C2522] transition-all duration-300 text-[11px] tracking-wider uppercase"
          >
            <span>Let's Talk</span>
            <span className="text-[var(--accent-sage)] group-hover:rotate-45 transition-transform duration-300">✦</span>
          </button>
        </div>
      </div>

      {/* 1.5px Scroll Progress Hairline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[var(--accent-sage)] origin-left"
        style={{ scaleX }}
      />
    </header>
  );
};
