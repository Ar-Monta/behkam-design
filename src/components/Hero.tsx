import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Calm parallax drifts
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[var(--bg-canvas)] overflow-hidden border-b border-[var(--border-hairline)]"
    >
      {/* Subtle Botanical / Atmospheric Vignettes */}
      <div className="absolute inset-0 pointer-events-none botanical-glow-left opacity-60" />
      <div className="absolute inset-0 pointer-events-none botanical-glow-right opacity-60" />
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-40" />

      {/* Top Editorial Micro-Header Bar (Full-Width Hairline) */}
      <div className="w-full border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--text-muted)] font-medium">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <span className="text-[var(--accent-sage)]">✦</span>
            <span className="hidden sm:inline">{DESIGNER_INFO.microHeaderLeft}</span>
            <span className="sm:hidden font-mono text-[9.5px] tracking-[0.16em]">GRAPHIC DESIGNER &amp; STORYTELLER</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--text-secondary)] font-normal tracking-[0.2em] sm:tracking-[0.25em]"
          >
            <span className="hidden sm:inline">{DESIGNER_INFO.microHeaderRight}</span>
            <span className="sm:hidden font-mono text-[9px] tracking-[0.14em]">PORTFOLIO '26</span>
          </motion.div>
        </div>
      </div>

      {/* Magazine Cover Hero Composition: Layered PORTFOLIO Wordmark + Foreground Portrait */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 md:pt-12 pb-0 flex flex-col items-center justify-start">
        {/* Layer 0: Massive Edge-to-Edge PORTFOLIO Display Heading */}
        <motion.div
          style={{ y: textY, opacity }}
          className="w-full text-center select-none pointer-events-none z-0"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[clamp(3.8rem,15.2vw,14.5rem)] font-normal leading-[0.85] tracking-[-0.03em] text-[var(--text-primary)] uppercase drop-shadow-sm whitespace-nowrap"
          >
            PORTFOLIO
          </motion.h1>

          {/* Editorial year accent in subtle serif italic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs md:text-sm tracking-[0.28em] sm:tracking-[0.32em] uppercase text-[var(--text-muted)] font-serif italic"
          >
            Selected Works &middot; Visual Systems &middot; MMXXVI
          </motion.div>
        </motion.div>

        {/* Layer 10: Foreground Portrait Cutout Overlapping Typography */}
        <motion.div
          style={{ y: portraitY, scale: portraitScale }}
          className="relative z-10 w-full max-w-[460px] sm:max-w-[580px] lg:max-w-[720px] -mt-12 sm:-mt-20 md:-mt-28 lg:-mt-36 flex justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* The transparent cutout image breaks through the PORTFOLIO lettering */}
            <img
              src={DESIGNER_INFO.portraitCutout}
              alt="Ayshin Behkam Kia — Editorial Portrait"
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] max-h-[420px] sm:max-h-[520px] lg:max-h-[600px]"
              loading="eager"
            />

            {/* Subtle base gradient grounding to blend cleanly into the hairline border */}
            <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[var(--bg-canvas)] via-[var(--bg-canvas)]/70 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* Lower Hero Split (Architectural 2-Column Grid) */}
      <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)]/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border-hairline)]">
          {/* Left Column (Statement, Badge, Signature) */}
          <div className="md:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/70 text-[var(--accent-sage)] text-[11px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]" />
                <span>{DESIGNER_INFO.availabilityBadge}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-medium tracking-tight leading-snug">
                &ldquo;I craft visual identities that inspire &amp; endure.&rdquo;
              </h2>
            </div>

            {/* Signature & Designer Name */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6 border-t border-[var(--border-hairline)]/50">
              <span className="font-script text-4xl sm:text-5xl text-[var(--text-primary)] leading-none select-none">
                Ayshin Behkam
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-sans">
                Principal Creative &middot; Art Director
              </span>
            </div>
          </div>

          {/* Right Column (Bio, Location, CTA) */}
          <div className="md:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6 bg-[var(--bg-surface)]/20">
            <div className="space-y-3 text-[var(--text-secondary)] text-sm sm:text-[15px] leading-relaxed font-light">
              {DESIGNER_INFO.bioLines.map((line, idx) => (
                <p key={idx} className="flex items-start gap-2.5">
                  <span className="text-[var(--accent-sage)] mt-1 text-xs">―</span>
                  <span>{line}</span>
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-[var(--border-hairline)]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Location with thin-stroke Globe */}
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-muted)]">
                <Globe className="w-4 h-4 text-[var(--accent-sage)] stroke-[1.5]" />
                <span>BASED IN {DESIGNER_INFO.city.toUpperCase()} / WORKING WORLDWIDE</span>
              </div>

              {/* Message CTA */}
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--text-primary)] hover:text-[var(--accent-sage)] transition-colors group"
              >
                <span>Initiate Brief</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
