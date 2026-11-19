import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS, TOOLS, ToolItem } from '../data/portfolioData';

// Custom Minimal SVG Brand Badges for Design Tools
const ToolIcon: React.FC<{ type: ToolItem['iconType'] }> = ({ type }) => {
  switch (type) {
    case 'illustrator':
      return (
        <span className="font-mono font-bold text-xs tracking-tighter text-[#EAE0D0] bg-[#FF9A00]/20 border border-[#FF9A00]/40 px-1.5 py-0.5 rounded">
          Ai
        </span>
      );
    case 'photoshop':
      return (
        <span className="font-mono font-bold text-xs tracking-tighter text-[#EAE0D0] bg-[#31A8FF]/20 border border-[#31A8FF]/40 px-1.5 py-0.5 rounded">
          Ps
        </span>
      );
    case 'indesign':
      return (
        <span className="font-mono font-bold text-xs tracking-tighter text-[#EAE0D0] bg-[#FF3366]/20 border border-[#FF3366]/40 px-1.5 py-0.5 rounded">
          Id
        </span>
      );
    case 'figma':
      return (
        <svg className="w-4 h-4 text-[#EAE0D0]" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="currentColor" fillOpacity="0.8" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="currentColor" fillOpacity="0.8" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="currentColor" fillOpacity="0.8" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="currentColor" fillOpacity="0.8" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="currentColor" fillOpacity="0.8" />
        </svg>
      );
    case 'procreate':
      return (
        <svg className="w-4 h-4 text-[#EAE0D0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
          <path d="M7.07 14.94c-1.66 0-3 1.34-3 3 0 1.31.84 2.41 2.01 2.82.52.19.89.65.99 1.18.06.35.34.6.69.6h.62c.38 0 .7-.3.72-.68.04-.66.38-1.25.9-1.61 1.09-.76 1.77-2.02 1.77-3.31 0-1.66-1.34-3-3-3z" />
        </svg>
      );
    case 'aftereffects':
      return (
        <span className="font-mono font-bold text-xs tracking-tighter text-[#EAE0D0] bg-[#9999FF]/20 border border-[#9999FF]/40 px-1.5 py-0.5 rounded">
          Ae
        </span>
      );
    case 'lightroom':
      return (
        <span className="font-mono font-bold text-xs tracking-tighter text-[#EAE0D0] bg-[#31A8FF]/20 border border-[#31A8FF]/40 px-1.5 py-0.5 rounded">
          Lr
        </span>
      );
    case 'blender':
      return (
        <svg className="w-4 h-4 text-[#EAE0D0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="m14 14 6 6" />
        </svg>
      );
    default:
      return null;
  }
};

export const ProcessAndTools: React.FC = () => {
  return (
    <section id="process" className="relative w-full bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
      {/* Section Header Bar */}
      <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-medium tracking-tight">
              METHODOLOGY &amp; TOOLKIT
            </span>
            <span className="text-[var(--accent-sage)] text-sm">✦</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
            CRAFT &middot; RIGOR &middot; PRECISION
          </span>
        </div>
      </div>

      {/* Split Editorial Bento: Left Column (My Process) | Right Column (Tools I Use) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border-hairline)]">
        {/* LEFT COLUMN: MY PROCESS ✦ */}
        <div className="p-6 sm:p-8 lg:p-12 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
            <h2 className="font-serif text-2xl text-[var(--text-primary)] font-medium tracking-tight flex items-center gap-2">
              <span>MY PROCESS</span>
              <span className="text-[var(--accent-sage)] text-base">✦</span>
            </h2>
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
              5 Disciplined Stages
            </span>
          </div>

          {/* Sub-grid: Steps on Left, Arched Atmospheric Card on Right */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
            {/* Numbered Steps 01 to 05 */}
            <div className="sm:col-span-7 space-y-5">
              {PROCESS_STEPS.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative pl-4 border-l border-[var(--border-hairline)] hover:border-[var(--accent-sage)] transition-colors duration-300"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-serif text-sm font-semibold text-[var(--accent-sage)] group-hover:text-[var(--text-primary)] transition-colors">
                      {step.number}
                    </span>
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] tracking-wide mt-0.5">
                    {step.tagline}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] font-light mt-1.5 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Arched Atmospheric Visual Card */}
            <div className="sm:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[220px] aspect-[3/4] rounded-t-full overflow-hidden border border-[var(--border-hairline)] bg-[#161C1A] shadow-2xl p-1">
                {/* Visual Imagery */}
                <img
                  src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80"
                  alt="Atmospheric Botanical Composition"
                  className="w-full h-full object-cover rounded-t-full filter saturate-75 contrast-110"
                />
                <div className="absolute inset-0 rounded-t-full bg-gradient-to-t from-[#0F1412] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--accent-sage)] font-mono block">
                    EDITORIAL SENSITIVITY
                  </span>
                </div>
              </div>

              {/* Italic Bodoni Moda Quote */}
              <div className="mt-5 text-center px-2">
                <blockquote className="font-serif italic text-base sm:text-lg text-[var(--text-primary)] leading-snug">
                  &ldquo;A thoughtful process for timeless visual results.&rdquo;
                </blockquote>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-2">
                  Ayshin Behkam &middot; Creative Methodology
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TOOLS I USE ✦ */}
        <div id="tools" className="p-6 sm:p-8 lg:p-12 space-y-8 bg-[var(--bg-surface)]/20">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)]">
            <h2 className="font-serif text-2xl text-[var(--text-primary)] font-medium tracking-tight flex items-center gap-2">
              <span>TOOLS I USE</span>
              <span className="text-[var(--accent-sage)] text-base">✦</span>
            </h2>
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
              Digital &amp; Print Mastery
            </span>
          </div>

          {/* 2-Column Grid of Bordered Dark Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {TOOLS.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group p-4 rounded bg-[var(--bg-canvas)] border border-[var(--border-hairline)] hover:border-[var(--accent-sage)]/60 hover:bg-[#161C1A] transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[var(--bg-surface)] border border-[var(--border-hairline)] group-hover:border-[var(--accent-sage)]/40 transition-colors">
                    <ToolIcon type={tool.iconType} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium text-[var(--text-primary)] group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-[10px] text-[var(--text-muted)] tracking-wider">
                      {tool.category}
                    </p>
                  </div>
                </div>

                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--accent-sage)] border border-[var(--border-hairline)] px-2 py-0.5 rounded group-hover:border-[var(--accent-sage)]/50 transition-colors">
                  {tool.proficiency}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Additional Capabilities / Footer Micro-Label */}
          <div className="p-5 rounded border border-dashed border-[var(--border-hairline)] bg-[var(--bg-canvas)]/40 text-center space-y-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] block font-mono">
              &amp; MORE CREATIVE TOOLS
            </span>
            <p className="text-xs text-[var(--text-secondary)] font-light max-w-md mx-auto">
              FontLab &middot; Glyphs &middot; Capture One &middot; Cinema 4D &middot; Pantone Color Proofing &middot; Pre-Press Preflight
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
