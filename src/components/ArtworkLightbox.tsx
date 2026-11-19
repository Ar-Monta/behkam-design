import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Info,
  Check,
  Copy,
  RotateCcw,
} from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ArtworkLightboxProps {
  project: Project | null;
  allProjects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({
  project,
  allProjects,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clean reset function for zoom and pan
  const resetView = useCallback(() => {
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
    isDraggingRef.current = false;
    hasMovedRef.current = false;
  }, []);

  // Center pan while keeping zoom
  const centerPan = useCallback(() => {
    setPanOffset({ x: 0, y: 0 });
    setIsDragging(false);
    isDraggingRef.current = false;
    hasMovedRef.current = false;
  }, []);

  // Reset states when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    resetView();
    setIsImageLoaded(false);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setShowInfo(false);
    }
  }, [project, resetView]);

  // Current project index in the full list
  const currentIndex = project
    ? allProjects.findIndex((p) => p.id === project.id)
    : -1;

  const handlePrev = useCallback(() => {
    resetView();
    if (currentIndex > 0) {
      onSelectProject(allProjects[currentIndex - 1]);
    } else if (allProjects.length > 0) {
      onSelectProject(allProjects[allProjects.length - 1]);
    }
  }, [currentIndex, allProjects, onSelectProject, resetView]);

  const handleNext = useCallback(() => {
    resetView();
    if (currentIndex < allProjects.length - 1) {
      onSelectProject(allProjects[currentIndex + 1]);
    } else if (allProjects.length > 0) {
      onSelectProject(allProjects[0]);
    }
  }, [currentIndex, allProjects, onSelectProject, resetView]);

  // Toggle Zoom with automatic pan reset
  const toggleZoom = useCallback(() => {
    if (isZoomed) {
      resetView();
    } else {
      setIsZoomed(true);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [isZoomed, resetView]);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          resetView();
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key.toLowerCase() === 'z') {
        toggleZoom();
      } else if (e.key.toLowerCase() === 'r') {
        resetView();
      } else if (e.key.toLowerCase() === 'i') {
        setShowInfo((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext, isZoomed, resetView, toggleZoom]);

  // Global mouseup and touchend listener to guarantee dragging stops
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  // Copy hex color
  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Drag pan handlers with smooth clamping so image never flies off-screen
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !isZoomed) return;

    const deltaX = Math.abs(e.clientX - (dragStartRef.current.x + panOffset.x));
    const deltaY = Math.abs(e.clientY - (dragStartRef.current.y + panOffset.y));
    if (deltaX > 4 || deltaY > 4) {
      hasMovedRef.current = true;
    }

    // Clamp pan offset within reasonable bounds based on window dimensions
    const maxPanX = window.innerWidth * 0.75;
    const maxPanY = window.innerHeight * 0.75;

    const rawX = e.clientX - dragStartRef.current.x;
    const rawY = e.clientY - dragStartRef.current.y;

    const clampedX = Math.max(-maxPanX, Math.min(maxPanX, rawX));
    const clampedY = Math.max(-maxPanY, Math.min(maxPanY, rawY));

    setPanOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Touch drag handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isZoomed || e.touches.length !== 1) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX - panOffset.x, y: touch.clientY - panOffset.y };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !isZoomed || e.touches.length !== 1) return;
    hasMovedRef.current = true;
    const touch = e.touches[0];
    const maxPanX = window.innerWidth * 0.8;
    const maxPanY = window.innerHeight * 0.8;

    const rawX = touch.clientX - dragStartRef.current.x;
    const rawY = touch.clientY - dragStartRef.current.y;

    const clampedX = Math.max(-maxPanX, Math.min(maxPanX, rawX));
    const clampedY = Math.max(-maxPanY, Math.min(maxPanY, rawY));

    setPanOffset({ x: clampedX, y: clampedY });
  };

  // Click on artwork canvas: if not dragged, toggle zoom/reset
  const handleCanvasClick = () => {
    if (hasMovedRef.current) {
      // User was dragging; don't trigger click reset
      hasMovedRef.current = false;
      return;
    }

    if (!isZoomed) {
      setIsZoomed(true);
      setPanOffset({ x: 0, y: 0 });
    } else {
      // Zoomed in and clicked without dragging -> smoothly reset back to fit
      resetView();
    }
  };

  if (!isOpen || !project) return null;

  const currentHighResUrl =
    project.highResImages[currentImageIndex] || project.highResImages[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none">
        {/* Cinema-Grade Dark Frosted Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0B0E0D]/95 backdrop-blur-2xl"
        />

        {/* Top Floating Control Bar */}
        <header className="absolute top-0 left-0 right-0 z-30 h-16 px-4 sm:px-8 flex items-center justify-between border-b border-[var(--border-hairline)] bg-[#0B0E0D]/75 backdrop-blur-md">
          {/* Project Title & Counter */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <span className="font-serif text-sm sm:text-base text-[var(--accent-sage)] shrink-0">
              {project.number}
            </span>
            <div className="h-4 w-[1px] bg-[var(--border-hairline)] shrink-0" />
            <div className="truncate">
              <h3 className="font-serif text-sm sm:text-lg text-[var(--text-primary)] font-medium leading-none truncate">
                {project.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-[var(--text-muted)] tracking-wider uppercase mt-1 truncate">
                {project.category} &middot; {project.year}
              </p>
            </div>
          </div>

          {/* Controls: Zoom Toggle, Reset Button, Info Toggle, Close */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Zoom Toggle */}
            <button
              onClick={toggleZoom}
              title="Toggle Zoom (Key: Z)"
              className={`px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs ${
                isZoomed
                  ? 'border-[var(--accent-sage)] bg-[var(--accent-sage)]/20 text-[var(--text-primary)]'
                  : 'border-[var(--border-hairline)] hover:border-[var(--text-muted)] text-[var(--text-secondary)] hover:bg-[#161C1A]'
              }`}
            >
              {isZoomed ? (
                <>
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Zoomed (2x)</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Fit Screen (1x)</span>
                </>
              )}
            </button>

            {/* Dedicated Reset / Center View Button */}
            <button
              onClick={resetView}
              title="Reset View & Center Artwork (Key: R)"
              className={`px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs ${
                isZoomed || panOffset.x !== 0 || panOffset.y !== 0
                  ? 'border-[var(--accent-sage)] text-[var(--accent-sage)] bg-[var(--accent-sage)]/10 hover:bg-[var(--accent-sage)]/25'
                  : 'border-[var(--border-hairline)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[#161C1A]'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset View</span>
            </button>

            {/* Project Details Panel Toggle with Mobile Tooltip */}
            <div className="relative flex items-center">
              <button
                onClick={() => setShowInfo(!showInfo)}
                title="Toggle Project Details (Key: I)"
                aria-label="Toggle Project Details"
                className={`p-2 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs ${
                  showInfo
                    ? 'border-[var(--accent-sage)] bg-[var(--accent-sage)]/20 text-[var(--text-primary)]'
                    : 'border-[var(--border-hairline)] hover:border-[var(--text-muted)] text-[var(--text-secondary)] hover:bg-[#161C1A]'
                }`}
              >
                <Info className="w-4 h-4" />
                <span className="hidden lg:inline">
                  {showInfo ? 'Hide Info' : 'Show Info'}
                </span>
              </button>

              {/* Mobile Tooltip: "Tap for preview" */}
              <div className="lg:hidden absolute top-full mt-2.5 right-0 z-50 pointer-events-none">
                <div className="relative px-2.5 py-1 rounded-md bg-[#121815]/95 border border-[var(--accent-sage)]/80 text-[9px] text-[var(--text-primary)] font-mono tracking-wider uppercase shadow-xl backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)] animate-pulse" />
                  <span>{showInfo ? 'Tap to close' : 'Tap for preview'}</span>
                </div>
                {/* Upward pointing arrow */}
                <div className="absolute -top-1 right-3 w-2 h-2 bg-[#121815] border-t border-l border-[var(--accent-sage)]/80 transform rotate-45" />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              title="Close Lightbox (Key: Esc)"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[var(--border-hairline)] hover:border-[var(--accent-velvet)] hover:bg-[var(--accent-velvet)]/20 text-[var(--text-primary)] transition-all duration-200 flex items-center gap-1 text-xs"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline uppercase tracking-widest text-[11px]">
                Esc
              </span>
            </button>
          </div>
        </header>

        {/* Main Artwork Stage */}
        <div
          ref={containerRef}
          className={`relative z-20 w-full h-full pt-16 flex transition-all duration-300 ${
            showInfo ? 'lg:pr-96' : ''
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Canvas Area */}
          <div
            className={`relative flex-1 h-full flex items-center justify-center p-3 sm:p-8 lg:p-12 overflow-hidden ${
              isZoomed
                ? 'cursor-grab active:cursor-grabbing'
                : 'cursor-zoom-in'
            }`}
            onClick={handleCanvasClick}
          >
            {/* Shimmer Loading Skeleton */}
            {!isImageLoaded && (
              <div className="absolute inset-8 sm:inset-16 rounded-lg bg-[var(--bg-surface)]/60 animate-pulse border border-[var(--border-hairline)] flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-8 h-8 mx-auto border-2 border-[var(--accent-sage)] border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                    Loading High-Res Artwork...
                  </p>
                </div>
              </div>
            )}

            {/* High-Resolution Artwork with Smooth Transform and Spring Transitions */}
            <motion.div
              animate={{
                scale: isZoomed ? 2 : 1,
                x: isZoomed ? panOffset.x : 0,
                y: isZoomed ? panOffset.y : 0,
              }}
              transition={
                isDragging
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 350, damping: 32 }
              }
              className="relative max-w-full max-h-full flex items-center justify-center select-none"
            >
              <img
                key={currentHighResUrl}
                src={currentHighResUrl}
                alt={project.title}
                onLoad={() => setIsImageLoaded(true)}
                className={`max-w-full max-h-[80vh] sm:max-h-[82vh] object-contain rounded shadow-2xl transition-opacity duration-500 pointer-events-none ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                draggable={false}
              />
            </motion.div>

            {/* Floating Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              title="Previous Project (←)"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#161C1A]/85 border border-[var(--border-hairline)] text-[var(--text-primary)] hover:border-[var(--accent-sage)] hover:bg-[#1E2522] transition-all backdrop-blur-md z-30 group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              title="Next Project (→)"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#161C1A]/85 border border-[var(--border-hairline)] text-[var(--text-primary)] hover:border-[var(--accent-sage)] hover:bg-[#1E2522] transition-all backdrop-blur-md z-30 group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Floating Zoom & Reset Bottom Pill (Mobile & Desktop Responsive) */}
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="absolute bottom-4 sm:bottom-6 inset-x-0 mx-auto w-max max-w-[calc(100vw-24px)] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0F1412]/95 border border-[var(--accent-sage)]/60 backdrop-blur-xl text-[10px] sm:text-[11px] text-[var(--text-secondary)] tracking-wider uppercase z-30 flex items-center justify-center gap-2 sm:gap-3 shadow-[0_12px_36px_rgba(0,0,0,0.85)] select-none whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Mode Label */}
                <span className="hidden sm:inline font-medium">2X Zoom &middot; Drag to Pan</span>
                <span className="sm:hidden font-medium text-[9.5px]">2X &middot; Drag</span>

                <span className="text-[var(--border-hairline)] select-none">|</span>

                {/* Center Button */}
                <button
                  onClick={centerPan}
                  title="Center artwork without zooming out"
                  className="text-[var(--text-primary)] hover:text-white px-1.5 py-0.5 rounded transition-colors cursor-pointer font-medium active:scale-95"
                >
                  Center
                </button>

                <span className="text-[var(--border-hairline)] select-none">|</span>

                {/* Reset to Fit Button */}
                <button
                  onClick={resetView}
                  title="Reset to 1x fit screen"
                  className="text-[var(--accent-sage)] hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer px-1.5 py-0.5 rounded active:scale-95"
                >
                  <RotateCcw className="w-3 h-3 shrink-0" />
                  <span className="hidden sm:inline">Reset to Fit</span>
                  <span className="sm:hidden">Reset</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Toggleable Project Details Sidebar (Collapsible) */}
          <AnimatePresence>
            {showInfo && (
              <motion.aside
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="fixed lg:absolute top-16 right-0 bottom-0 w-full sm:w-96 bg-[#121715]/95 backdrop-blur-xl border-l border-[var(--border-hairline)] p-6 sm:p-8 overflow-y-auto z-40 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-6">
                  {/* Category & Title */}
                  <div className="space-y-2 border-b border-[var(--border-hairline)] pb-5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-sage)] font-semibold">
                      {project.category}
                    </span>
                    <h2 className="font-serif text-2xl text-[var(--text-primary)] font-medium leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Metadata Specs */}
                  <div className="grid grid-cols-2 gap-4 text-xs border-b border-[var(--border-hairline)] pb-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                        Client
                      </span>
                      <span className="text-[var(--text-primary)] font-medium mt-0.5 block">
                        {project.client}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                        Year
                      </span>
                      <span className="text-[var(--text-primary)] font-medium mt-0.5 block">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Design Brief / Description */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                      Design Brief &amp; Concept
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Color Palette Swatches */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                        Color Palette
                      </span>
                      {copiedHex && (
                        <span className="text-[10px] text-[var(--accent-sage)] flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied {copiedHex}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      {project.palette.map((color) => (
                        <button
                          key={color}
                          onClick={() => copyColor(color)}
                          title={`Click to copy HEX ${color}`}
                          className="group relative flex-1 h-9 rounded border border-[var(--border-hairline)] hover:scale-105 transition-all overflow-hidden cursor-pointer"
                          style={{ backgroundColor: color }}
                        >
                          <span className="sr-only">{color}</span>
                          <span className="opacity-0 group-hover:opacity-100 absolute inset-0 flex items-center justify-center bg-black/40 text-[9px] font-mono text-white transition-opacity">
                            <Copy className="w-2.5 h-2.5" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables Suite */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                      Key Deliverables
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.deliverables.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-[10px] text-[var(--text-secondary)] tracking-wider"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Pagination in Sidebar */}
                <div className="pt-6 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>
                    Project {currentIndex + 1} of {allProjects.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="px-2.5 py-1 rounded border border-[var(--border-hairline)] hover:text-[var(--text-primary)] hover:border-[var(--accent-sage)] transition-colors cursor-pointer"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-2.5 py-1 rounded border border-[var(--border-hairline)] hover:text-[var(--text-primary)] hover:border-[var(--accent-sage)] transition-colors cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  );
};
