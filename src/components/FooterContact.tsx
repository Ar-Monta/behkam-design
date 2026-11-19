import React, { useState } from 'react';
import { Mail, Instagram, Linkedin, ExternalLink, MapPin, ArrowUp, Copy, Check } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';

interface FooterContactProps {
  onOpenContact: () => void;
}

export const FooterContact: React.FC<FooterContactProps> = ({ onOpenContact }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DESIGNER_INFO.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)]">
      {/* 3-Column Architectural Block Separated by 1px Hairlines */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border-hairline)]">
        {/* Column 1: LET'S CREATE SOMETHING + large flowing Pinyon Script 'Amazing' */}
        <div className="md:col-span-4 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-sage)] font-mono block">
              WORK WITH ME
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] font-medium tracking-tight uppercase leading-none">
              LET&rsquo;S CREATE <br />
              SOMETHING
            </h2>
            <div className="pt-2">
              <span className="font-script text-6xl sm:text-7xl lg:text-8xl text-[var(--text-primary)] leading-[0.9] block select-none">
                Amazing
              </span>
            </div>
          </div>

          <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed max-w-xs">
            Open for bespoke brand identities, editorial publications, packaging systems, and long-term design partnerships.
          </p>
        </div>

        {/* Column 2: Availability Statement, Inviting Line & Pill CTA Button */}
        <div className="md:col-span-4 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-[var(--bg-surface)]/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[11px] text-[var(--accent-sage)] font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)] animate-pulse" />
              <span>CURRENTLY ACCEPTING Q1/Q2 PROJECTS</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] font-medium leading-snug">
              Every transformative visual identity begins with a simple conversation.
            </h3>

            <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
              Whether you are launching a flagship brand, reimagining an established heritage, or curating an editorial book, let&rsquo;s bring elegance to your story.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--text-primary)] hover:bg-white text-[#0F1412] font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group"
            >
              <span>SEND ME A MESSAGE</span>
              <span className="text-[var(--accent-velvet)] group-hover:rotate-45 transition-transform duration-300">✦</span>
            </button>

            {/* Quick Copy Email with Toast */}
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-4 py-2 rounded-full border border-[var(--border-hairline)] hover:border-[var(--accent-sage)] text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center gap-2"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--accent-sage)]" />
                  <span className="text-[var(--accent-sage)]">Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Direct Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Column 3: Structured Contact List with Minimal Icons + Compact Monochrome Portrait */}
        <div className="md:col-span-4 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
          <div className="flex items-center gap-5">
            {/* Compact Monochrome Portrait */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[var(--border-hairline)] bg-[#161C1A] shrink-0">
              <img
                src={DESIGNER_INFO.portrait}
                alt="Ayshin Behkam Kia"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[var(--text-primary)] font-medium">
                {DESIGNER_INFO.name}
              </h4>
              <p className="text-[11px] text-[var(--accent-sage)] tracking-wider uppercase mt-0.5 font-mono">
                Graphic Designer
              </p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                {DESIGNER_INFO.location}
              </p>
            </div>
          </div>

          {/* Contact Links */}
          <div className="space-y-3 pt-4 border-t border-[var(--border-hairline)] text-xs">
            <a
              href={`mailto:${DESIGNER_INFO.email}`}
              className="flex items-center justify-between p-2.5 rounded hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--accent-sage)]" />
                <span className="font-mono text-[11px]">{DESIGNER_INFO.email}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={DESIGNER_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[var(--accent-sage)]" />
                <span>Instagram {DESIGNER_INFO.instagramHandle}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={DESIGNER_INFO.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-xs text-[var(--accent-sage)]">Bē</span>
                <span>Behance {DESIGNER_INFO.behanceHandle}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href={DESIGNER_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-[var(--accent-sage)]" />
                <span>LinkedIn {DESIGNER_INFO.linkedinHandle}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <div className="flex items-center gap-2.5 p-2.5 text-[var(--text-muted)] text-[11px]">
              <MapPin className="w-4 h-4 text-[var(--accent-sage)]" />
              <span>Istanbul &middot; T&uuml;rkiye &middot; Worldwide Remote</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: THANK YOU FOR VISITING ✦ + Copyright & Back to Top Link */}
      <div className="border-t border-[var(--border-hairline)] bg-[#0C100E] py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="font-serif tracking-widest text-[var(--text-primary)] uppercase">
              THANK YOU FOR VISITING
            </span>
            <span className="text-[var(--accent-sage)]">✦</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono">
              &copy; {new Date().getFullYear()} Ayshin Behkam Kia. All Rights Reserved.
            </span>

            <button
              onClick={scrollToTop}
              className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5 uppercase text-[11px] tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-sage)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
