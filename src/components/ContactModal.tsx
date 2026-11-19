import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Send, Mail, Instagram, ExternalLink } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Identity',
    message: '',
  });
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DESIGNER_INFO.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        projectType: 'Brand Identity',
        message: '',
      });
    }, 2400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-end overflow-hidden select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Slide-Over Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-lg h-full bg-[#121815] border-l border-[var(--border-hairline)] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
        >
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-5">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-sage)] font-mono block">
                  CONTACT &middot; COLLABORATION
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] font-medium mt-1">
                  Initiate a Project
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-[var(--border-hairline)] hover:border-[var(--accent-sage)] text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Email Copy Card */}
            <div className="p-4 rounded bg-[#161D1A] border border-[var(--border-hairline)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#0F1412] text-[var(--accent-sage)] border border-[var(--border-hairline)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">
                    Direct Email
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-[var(--text-primary)]">
                    {DESIGNER_INFO.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-full border border-[var(--border-hairline)] hover:border-[var(--accent-sage)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition-all"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--accent-sage)]" />
                    <span className="text-[var(--accent-sage)]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Form */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded border border-[var(--accent-sage)] bg-[var(--accent-sage)]/10 text-center space-y-3"
              >
                <div className="w-10 h-10 mx-auto rounded-full bg-[var(--accent-sage)]/20 flex items-center justify-center text-[var(--accent-sage)]">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-xl text-[var(--text-primary)] font-medium">
                  Message Dispatched
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Thank you for reaching out. Ayshin will review your brief and reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-2.5 rounded bg-[#161D1A] border border-[var(--border-hairline)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-sage)] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@studio.com"
                    className="w-full px-4 py-2.5 rounded bg-[#161D1A] border border-[var(--border-hairline)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-sage)] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Project Discipline
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-[#161D1A] border border-[var(--border-hairline)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-sage)] transition-colors"
                  >
                    <option value="Brand Identity">Brand Identity System</option>
                    <option value="Print & Editorial">Print, Books &amp; Editorial</option>
                    <option value="Packaging">Packaging &amp; Die-Cuts</option>
                    <option value="Poster & Typography">Poster, Monogram &amp; Typography</option>
                    <option value="Full Retainer">Full Creative Direction Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Brief / Objectives
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your brand, timeline, and vision..."
                    className="w-full px-4 py-2.5 rounded bg-[#161D1A] border border-[var(--border-hairline)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent-sage)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[var(--text-primary)] hover:bg-white text-[#0F1412] font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 mt-2 shadow-lg"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Social Links Footer */}
          <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="tracking-wider">Follow Archive:</span>
            <div className="flex items-center gap-4">
              <a
                href={DESIGNER_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a
                href={DESIGNER_INFO.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"
              >
                <span>Behance</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
