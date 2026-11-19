import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  Project,
  PROJECTS,
  CATEGORIES,
  CategoryFilter,
} from '../data/portfolioData';

interface WorksGridProps {
  onSelectProject: (project: Project) => void;
}

export const WorksGrid: React.FC<WorksGridProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="works" className="relative w-full bg-[var(--bg-canvas)]">
      {/* Section Header Bar bounded by 1px top and bottom hairlines */}
      <div className="border-t border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/95 backdrop-blur-md sticky top-11 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Section Title */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="font-serif text-base sm:text-xl text-[var(--text-primary)] font-medium tracking-tight">
              SELECTED WORKS
            </span>
            <span className="text-[var(--accent-sage)] text-xs sm:text-sm">✦</span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
              ({filteredProjects.length} PIECES)
            </span>
          </div>

          {/* Interactive Category Filter Pills with Sliding Layout Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {/* Sliding Active Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#1F2724] border border-[var(--accent-sage)]/60 rounded-full"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Architectural Grid (3-col Desktop, 2-col Tablet, 1-col Mobile) with 1px hairlines */}
      <div className="max-w-7xl mx-auto border-b border-[var(--border-hairline)]">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 divide-[var(--border-hairline)]"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Calculate architectural border classes for seamless 1px grid
              const isColEnd = (index + 1) % 3 === 0;
              const isColEndMd = (index + 1) % 2 === 0;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 6) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => onSelectProject(project)}
                  className={`group relative flex flex-col justify-between p-6 sm:p-7 bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface)]/50 transition-colors duration-500 cursor-pointer border-b border-[var(--border-hairline)] ${
                    !isColEnd ? 'lg:border-r lg:border-[var(--border-hairline)]' : ''
                  } ${
                    !isColEndMd ? 'md:border-r md:border-[var(--border-hairline)] lg:border-r-0' : ''
                  }`}
                >
                  {/* Top Row: Index number in Serif + Project Title + Subtitle */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-baseline justify-between">
                      <span className="font-serif text-2xl text-[var(--accent-sage)]/80 font-normal">
                        {project.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                        {project.year}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] font-medium tracking-tight group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] font-light mt-1 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Center: High-Resolution Artwork Preview Frame (aspect-[4/3], overflow-hidden) */}
                  <div className="relative aspect-[4/3] w-full rounded overflow-hidden bg-[#161C1A] border border-[var(--border-hairline)] mb-5">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle Dark Vignette on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* View High-Res Badge (Appears smoothly on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="px-4 py-2 rounded-full bg-[#0F1412]/85 border border-[var(--border-hairline-bright)] text-xs uppercase tracking-widest text-[var(--text-primary)] backdrop-blur-md opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 shadow-xl">
                        <span>View High-Res</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-sage)]" />
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Clean Bordered Category Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[9px] font-mono tracking-wider text-[var(--text-muted)] border border-[var(--border-hairline)] bg-[var(--bg-surface)]/40 group-hover:border-[var(--border-hairline-bright)] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
