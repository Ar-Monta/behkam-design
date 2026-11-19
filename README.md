# Ayshin Behkam Kia — Graphic Designer & Visual Storyteller Portfolio

A luxurious, editorial, single-page portfolio website for **Ayshin Behkam Kia**, designed with magazine-style architectural hairlines, oversized overlapping typography, interactive high-resolution gallery lightbox, split process/tools bento, client endorsements, and an organic dark museum color palette.

---

## Architecture & Design Tokens

- **Primary Canvas (`--bg-canvas`):** `#0F1412` (Deep Forest Obsidian)
- **Elevated Surface (`--bg-surface`):** `#161C1A` (Soft Slate Pine)
- **Warm Editorial Cream (`--text-primary`):** `#EAE0D0` (Warm Champagne Sand)
- **Relaxed Body Copy (`--text-secondary`):** `#BEB6AA` (Soft Warm Stone)
- **Muted Metadata (`--text-muted`):** `#7E8680` (Calm Mineral Gray)
- **Trust Accent (`--accent-sage`):** `#8BA193` (Muted Eucalyptus Sage)
- **Warmth Accent (`--accent-velvet`):** `#7C3E44` (Deep Velvet Wine)
- **Architectural Hairlines (`--border-hairline`):** `rgba(234, 224, 208, 0.14)`

---

## Typography

- **Display / Editorial Serif:** `Bodoni Moda` (Weights 400, 500, 600, 700, italic)
- **Body / UI Sans:** `Plus Jakarta Sans` (Weights 300, 400, 500, 600)
- **Signature / Accent Script:** `Pinyon Script` (Weight 400)

---

## How to Add or Swap High-Resolution Artwork

All project data is centralized inside `src/data/portfolioData.ts`, and all image assets live in `public/`.

### 1. Dropping New Images into `public/works/`
1. Place your uncropped, full-resolution artwork or presentation slides inside:
   ```
   public/works/
   ```
   Example: `public/works/new-project.jpg`
2. Create or place a 4:3 cropped thumbnail inside:
   ```
   public/works/thumbs/new-project.jpg
   ```

### 2. Updating `src/data/portfolioData.ts`
Open `src/data/portfolioData.ts` and add or edit entries in the `PROJECTS` array:

```typescript
{
  id: 'unique-project-slug',
  number: '15',
  title: 'Project Name',
  subtitle: 'Concise Subtitle or Deliverable Scope',
  category: 'Brand Identity', // 'Brand Identity' | 'Print & Editorial' | 'Packaging' | 'Poster & Type' | 'UI/UX & Social'
  tags: ['BRANDING', 'TYPOGRAPHY', 'PACKAGING'],
  thumbnail: '/works/thumbs/new-project.jpg',
  highResImages: ['/works/new-project.jpg'],
  year: '2026',
  client: 'Client Name',
  description: 'Detailed concept, typography system, color theory, and methodology.',
  palette: ['#484B31', '#E69B56', '#EBE2CD', '#232620'],
  deliverables: ['Brand Manual', 'Packaging Suite', 'Menu Architecture'],
}
```

### 3. Swapping Designer Portrait
- The full portrait is located at: `public/portrait.png`
- The transparent cutout used for overlapping the `PORTFOLIO` wordmark is at: `public/portrait-cutout.png`

---

## Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (Vite)
npm run dev

# Run TypeScript check and production build
npm run build

# Preview production build locally
npm run preview
```
