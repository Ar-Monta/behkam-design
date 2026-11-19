import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative w-full bg-[var(--bg-canvas)] border-b border-[var(--border-hairline)]">
      {/* Header Bar */}
      <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg sm:text-xl text-[var(--text-primary)] font-medium tracking-tight">
              KIND WORDS
            </span>
            <span className="text-[var(--accent-sage)] text-sm">✦</span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
            COLLABORATION &middot; ENDORSEMENTS
          </span>
        </div>
      </div>

      {/* 3-Column Grid divided by 1px hairlines */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-hairline)]">
        {TESTIMONIALS.map((item, idx) => (
          <motion.div
            key={item.author}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface)]/40 transition-colors duration-300"
          >
            <div className="space-y-4">
              {/* Oversized Decorative Serif Opening Quote Mark in Velvet Wine (#7C3E44) */}
              <span className="font-serif text-6xl lg:text-7xl leading-none text-[var(--accent-velvet)] block select-none -mb-6 opacity-90">
                &ldquo;
              </span>

              {/* Concise Editorial Review Text */}
              <p className="font-serif text-base sm:text-lg text-[var(--text-primary)] leading-relaxed italic font-light">
                {item.quote}
              </p>
            </div>

            {/* Bottom Author Row: Avatar, Name, Role & Location */}
            <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-11 h-11 rounded-full object-cover border border-[var(--border-hairline)] grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                  {item.author}
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {item.role} &middot; <span className="text-[var(--text-secondary)]">{item.company}</span>
                </p>
                <p className="text-[10px] text-[var(--accent-sage)] font-mono tracking-wider mt-0.5">
                  {item.location}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
