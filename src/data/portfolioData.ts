export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Brand Identity' | 'Print & Editorial' | 'Packaging' | 'Poster & Type' | 'UI/UX & Social';
  tags: string[];
  thumbnail: string;
  highResImages: string[];
  year: string;
  client: string;
  description: string;
  palette: string[];
  deliverables: string[];
}

export interface DesignerInfo {
  name: string;
  shortName: string;
  role: string;
  microHeaderLeft: string;
  microHeaderRight: string;
  statement: string;
  availabilityBadge: string;
  bioLines: string[];
  location: string;
  city: string;
  email: string;
  phone: string;
  instagram: string;
  instagramHandle: string;
  behance: string;
  behanceHandle: string;
  linkedin: string;
  linkedinHandle: string;
  portrait: string;
  portraitCutout: string;
}

export const DESIGNER_INFO: DesignerInfo = {
  name: 'Ayshin Behkam Kia',
  shortName: 'Ayshin',
  role: 'Graphic Designer & Visual Storyteller',
  microHeaderLeft: 'GRAPHIC DESIGNER & VISUAL STORYTELLER',
  microHeaderRight: 'CREATIVE PORTFOLIO 2026',
  statement: 'I CRAFT VISUAL IDENTITIES THAT INSPIRE & ENDURE',
  availabilityBadge: 'AVAILABLE FOR SELECT PROJECTS ✦',
  bioLines: [
    '7+ years shaping bespoke visual identities and editorial systems.',
    'Collaborating with visionary brands across Italy, Canada, the UAE & Turkey.',
    'Translating raw concepts into enduring, museum-grade visual languages.',
  ],
  location: 'Istanbul · Türkiye · Worldwide Remote',
  city: 'Istanbul',
  email: 'ayshanbehkamkia@gmail.com',
  phone: '+98 914 254 2759 / +39 328 238 9594',
  instagram: 'https://www.instagram.com/kia.logo/',
  instagramHandle: '@kia.logo',
  behance: 'https://www.behance.net/ayshanbehkamkia',
  behanceHandle: 'behance.net/ayshanbehkamkia',
  linkedin: 'https://www.linkedin.com/in/ayshin-behkam-586b55236',
  linkedinHandle: 'in/ayshin-behkam',
  portrait: '/portrait.png',
  portraitCutout: '/portrait2.png',
};

export const CATEGORIES = [
  'All',
  'Brand Identity',
  'Print & Editorial',
  'Packaging',
  'Poster & Type',
  'UI/UX & Social',
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const PROJECTS: Project[] = [
  {
    id: 'doran-restaurant',
    number: '01',
    title: 'Doran Restaurant',
    subtitle: 'Persian Culinary Heritage & Modern Identity System',
    category: 'Brand Identity',
    tags: ['BRANDING', 'TYPOGRAPHY', 'PACKAGING'],
    thumbnail: '/works/thumbs/6.jpg',
    highResImages: ['/works/6.jpg'],
    year: '2024',
    client: 'Doran Restaurant & Cafe',
    description:
      'A comprehensive brand identity blending classical Persian calligraphy with sleek modernism. Features an organic earth-toned palette, custom icon sets, food packaging, bread bags, apparel, and a luxury dining menu layout.',
    palette: ['#484B31', '#E69B56', '#EBE2CD', '#232620'],
    deliverables: ['Brand Identity Manual', 'Packaging Suite', 'Menu Architecture', 'Iconography', 'Exterior Signage'],
  },
  {
    id: 'planex-architecture',
    number: '02',
    title: 'Planex Architecture',
    subtitle: '3D Monogram & Structural Brand Expression',
    category: 'Brand Identity',
    tags: ['MONOGRAM', 'ARCHITECTURE', 'STATIONERY'],
    thumbnail: '/works/thumbs/7.jpg',
    highResImages: ['/works/7.jpg'],
    year: '2024',
    client: 'Planex Architecture Group',
    description:
      "A minimalist monogram based on the letter 'P'. The interplay between hollow and solid polygons symbolizes ideation and construction. Paired with architectural charcoal and warm industrial amber.",
    palette: ['#232832', '#E88B2E', '#F4F5F7', '#15181E'],
    deliverables: ['Logo System', 'Corporate Stationery', 'Signage Specs', 'Grid Guidelines'],
  },
  {
    id: 'orco-meson',
    number: '03',
    title: 'Orco Meson',
    subtitle: 'Canadian Luxury Womenswear Label & Lookbook',
    category: 'Print & Editorial',
    tags: ['FASHION', 'EDITORIAL', 'PACKAGING'],
    thumbnail: '/works/thumbs/11.jpg',
    highResImages: ['/works/11.jpg'],
    year: '2024',
    client: 'Orco Meson (Canada)',
    description:
      'Sleek, understated visual identity for an avant-garde Canadian womenswear label. Features fluid typography, soft eucalyptus pine and champagne cream tones, luxury shopping bags, and textured lookbook layouts.',
    palette: ['#596B60', '#EBE1D4', '#1E2522', '#D2C5B4'],
    deliverables: ['Visual Identity', 'Garment Tags', 'Lookbook Grid', 'Stationery'],
  },
  {
    id: 'momoa-restaurant',
    number: '04',
    title: 'Momoa Bistro',
    subtitle: 'Plant-Based Parisian Gastronomy & Identity',
    category: 'Brand Identity',
    tags: ['BRAND IDENTITY', 'ORGANIC', 'FRENCH DINING'],
    thumbnail: '/works/thumbs/8.jpg',
    highResImages: ['/works/8.jpg'],
    year: '2023',
    client: 'Momoa Bistro Paris',
    description:
      'Visual identity for a minimalist French plant-based restaurant. Combines warm terracotta red, organic moss green, and citrus accents for a playful, grounded gastronomic experience.',
    palette: ['#893B32', '#3D5B48', '#E8C15A', '#FDFBF7'],
    deliverables: ['Brand Identity', 'Packaging', 'Editorial Menus', 'Social System'],
  },
  {
    id: 'vanda-counseling',
    number: '05',
    title: 'Vanda Counseling',
    subtitle: 'Golden-Ratio Healthcare & Wellness Identity',
    category: 'Brand Identity',
    tags: ['HEALTHCARE', 'GOLDEN RATIO', 'IDENTITY'],
    thumbnail: '/works/thumbs/9.jpg',
    highResImages: ['/works/9.jpg'],
    year: '2023',
    client: 'Vanda Child Counseling Group',
    description:
      'Monogram identity structured with the Fibonacci golden spiral. Conveys empathy, renewal, and psychological safety through calm deep blues and growth greens.',
    palette: ['#163772', '#48A367', '#F0F4FA', '#0B1D3D'],
    deliverables: ['Monogram', 'Therapy Workbooks', 'Signage', 'Staff Badges'],
  },
  {
    id: 'nama-architect',
    number: '06',
    title: 'Nama Studio',
    subtitle: 'Symmetrical Typographic Facade Monogram',
    category: 'Poster & Type',
    tags: ['TYPOGRAPHY', 'SYMMETRY', 'MONOGRAM'],
    thumbnail: '/works/thumbs/10.jpg',
    highResImages: ['/works/10.jpg'],
    year: '2023',
    client: 'Nama Architecture Studio',
    description:
      "Transforms the studio's title into a symmetrical modern glyph reminiscent of arched Persian architectural facades and steel frame engineering.",
    palette: ['#E75427', '#2F353B', '#1C2023', '#F5F3EF'],
    deliverables: ['Architectural Logo', 'Hardhat & Vehicle Branding', 'Print Collateral'],
  },
  {
    id: 'avalon-pet-clinic',
    number: '07',
    title: 'Avalon Pet Clinic',
    subtitle: 'Friendly Dual Monogram & Veterinary Brand',
    category: 'Brand Identity',
    tags: ['BRANDING', 'PET CARE', 'ICONOGRAPHY'],
    thumbnail: '/works/thumbs/12.jpg',
    highResImages: ['/works/12.jpg'],
    year: '2024',
    client: 'Avalon Pet Veterinary Clinic',
    description:
      "Harmonious monogram fusing initials 'A' and 'P' into a friendly animal silhouette and heart shape. Vibrant teal and sunny gold create welcoming warmth.",
    palette: ['#009A93', '#F2B824', '#FFFFFF', '#1F3A38'],
    deliverables: ['Brand Identity', 'Pet Passport', 'Medical Packaging', 'Clinic Signage'],
  },
  {
    id: 'bewildering-games',
    number: '08',
    title: 'Bewildering Games',
    subtitle: 'Dynamic Intellectual Gaming & Esports Brand',
    category: 'Poster & Type',
    tags: ['GAMING', 'MERCHANDISE', 'DIGITAL'],
    thumbnail: '/works/thumbs/13.jpg',
    highResImages: ['/works/13.jpg'],
    year: '2024',
    client: 'Bewildering Intellectual Games',
    description:
      'Geometric sharp monogram engineered for intellectual gaming and esports. Electric violet and dark carbon evoke strategic depth and digital excitement.',
    palette: ['#340059', '#8E2DE2', '#130826', '#F2E8FD'],
    deliverables: ['App Icon', 'Merch Mockups', 'Tournament Banners', 'Guidelines'],
  },
  {
    id: 'sorvete-ice-cream',
    number: '09',
    title: 'Sorvete Gelato',
    subtitle: 'Artisanal Ice Cream Boutique & Packaging',
    category: 'Packaging',
    tags: ['PACKAGING', 'ARTISANAL', 'GOURMET'],
    thumbnail: '/works/thumbs/26.jpg',
    highResImages: ['/works/26.jpg'],
    year: '2024',
    client: 'Sorvete Gelato Boutique',
    description:
      'Editorial typography paired with deep ruby accents and crisp dessert photography for a boutique artisanal gelato house.',
    palette: ['#A31D24', '#F4F0EA', '#2B1B1C', '#DFB15B'],
    deliverables: ['Ice Cream Pint Packaging', 'Boutique Poster', 'Menu Cards'],
  },
  {
    id: 'ambienza-restaurant',
    number: '10',
    title: 'Ambienza Restaurant',
    subtitle: 'Fine-Dining Visuals & Social Campaign',
    category: 'UI/UX & Social',
    tags: ['EDITORIAL', 'LUXURY', 'SOCIAL MEDIA'],
    thumbnail: '/works/thumbs/24.jpg',
    highResImages: ['/works/24.jpg'],
    year: '2024',
    client: 'Ambienza Fine Dining',
    description:
      'Cinematic culinary visuals combining neoclassical statuary, warm walnut shadows, and editorial serif headlines for an upscale dining institution.',
    palette: ['#542D1C', '#9A6946', '#E8D8C8', '#1E120B'],
    deliverables: ['Social Grid Layouts', 'Posters', 'Menu Vignettes', 'Motion Stills'],
  },
  {
    id: 'stand-rollup-smartnlocal',
    number: '11',
    title: 'VeryGood Pasta Sauce',
    subtitle: 'Trade Show Exposition Stand Roll-Ups',
    category: 'Print & Editorial',
    tags: ['PRINT', 'EXHIBITION', 'ORGANIC FOOD'],
    thumbnail: '/works/thumbs/38.jpg',
    highResImages: ['/works/38.jpg'],
    year: '2024',
    client: 'Smart N Local (Canada)',
    description:
      'Full-scale vertical architectural roll-ups for Canadian food trade shows and retail point-of-sale displays.',
    palette: ['#C0362C', '#1D4E89', '#F28C38', '#1A1D20'],
    deliverables: ['Trade Show Roll-Ups', 'POS Displays', 'Print Assets'],
  },
  {
    id: 'metalhome-packaging',
    number: '12',
    title: 'MetalHome Housewares',
    subtitle: 'Consumer Products Box & Surface Packaging',
    category: 'Packaging',
    tags: ['PACKAGING', 'PRODUCT DESIGN', 'RETAIL'],
    thumbnail: '/works/thumbs/40.jpg',
    highResImages: ['/works/40.jpg'],
    year: '2023',
    client: 'MetalHome Industrial Group',
    description:
      'Clean retail box packaging design with topographical contour lines and botanical accents for intelligent kitchenware.',
    palette: ['#B82121', '#3F51B5', '#F7F7F7', '#1A1A1A'],
    deliverables: ['Box Die-Cuts', 'Surface Topography Pattern', 'Barcode Hierarchy'],
  },
  {
    id: 'nft-marketplace-ui',
    number: '13',
    title: 'NFT Market Place',
    subtitle: 'Futuristic Web3 Interface & Vector Illustrations',
    category: 'UI/UX & Social',
    tags: ['UI/UX', 'WEB3', 'ILLUSTRATION'],
    thumbnail: '/works/thumbs/15.jpg',
    highResImages: ['/works/15.jpg'],
    year: '2023',
    client: 'NFT Market Place',
    description:
      'Futuristic visual identity and user interface design for an NFT marketplace, featuring custom neon vector illustrations, typography, and dark-mode dashboards.',
    palette: ['#6930C3', '#5E60CE', '#4EA8DE', '#0A0915'],
    deliverables: ['Web Dashboard UI', 'Custom Vector Art', 'Promotional Banners'],
  },
  {
    id: 'smart-locks-banner',
    number: '14',
    title: 'Saray Lux Smart Locks',
    subtitle: 'Premium E-Commerce Banners & Retouching',
    category: 'UI/UX & Social',
    tags: ['DIGITAL BANNERS', 'COMPOSITING', 'RETAIL'],
    thumbnail: '/works/thumbs/33.jpg',
    highResImages: ['/works/33.jpg'],
    year: '2024',
    client: 'Saray Lux Digital',
    description:
      'High-impact e-commerce marketing banners with futuristic lighting, product compositing, and Persian headline typography.',
    palette: ['#0A2540', '#635BFF', '#00D4B2', '#0A0D14'],
    deliverables: ['Web Banners', 'Display Ads', 'Product Mockups'],
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    tagline: 'Brand narrative, audience & visual goals',
    description:
      'Deep exploration into the brand DNA, cultural landscape, competitive positioning, and emotional resonance needed to stand apart.',
  },
  {
    number: '02',
    title: 'CONCEPT',
    tagline: 'Moodboards, typography & creative direction',
    description:
      'Formulating bespoke moodboards, typographic pairings, textural palettes, and geometric directions before vectorizing.',
  },
  {
    number: '03',
    title: 'DESIGN',
    tagline: 'Logos, layouts & cohesive systems',
    description:
      'Crafting monograms, golden-ratio grids, packaging mockups, and cohesive design systems that scale seamlessly across print and digital.',
  },
  {
    number: '04',
    title: 'REFINE',
    tagline: 'Optical kerning, CMYK balance & details',
    description:
      'Iterative micro-adjustments: perfecting hairline strokes, kerning subtleties, color profile proofs (Pantone/CMYK), and tangible mockups.',
  },
  {
    number: '05',
    title: 'DELIVER',
    tagline: 'Print-ready assets & brand handoff',
    description:
      'Comprehensive brand guideline books, die-cut vector templates, pre-flight packaging files, and digital assets ready for immediate production.',
  },
];

export interface ToolItem {
  name: string;
  category: string;
  proficiency: string;
  iconType: 'illustrator' | 'photoshop' | 'indesign' | 'figma' | 'procreate' | 'aftereffects' | 'lightroom' | 'blender';
}

export const TOOLS: ToolItem[] = [
  { name: 'Adobe Illustrator', category: 'Vector & Identity', proficiency: 'Mastery', iconType: 'illustrator' },
  { name: 'Adobe Photoshop', category: 'Compositing & Retouch', proficiency: 'Mastery', iconType: 'photoshop' },
  { name: 'Adobe InDesign', category: 'Editorial & Books', proficiency: 'Advanced', iconType: 'indesign' },
  { name: 'Figma', category: 'Design Systems & UI', proficiency: 'Advanced', iconType: 'figma' },
  { name: 'Procreate', category: 'Sketching & Lettering', proficiency: 'Advanced', iconType: 'procreate' },
  { name: 'Adobe After Effects', category: 'Motion & Identity Stills', proficiency: 'Proficient', iconType: 'aftereffects' },
  { name: 'Adobe Lightroom', category: 'Color Grading', proficiency: 'Advanced', iconType: 'lightroom' },
  { name: 'Blender', category: '3D Mockups & Lighting', proficiency: 'Proficient', iconType: 'blender' },
];

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Ayshin possesses that rare ability to translate abstract architectural concepts into clean, timeless graphic forms. The Planex identity gave our firm an undeniable competitive edge.',
    author: 'Kaveh R.',
    role: 'Managing Principal',
    company: 'Planex Architecture',
    location: 'Tehran / Toronto',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote:
      'From the packaging die-cuts to the restaurant menus, Ayshin captured the true soul of Persian culinary tradition while keeping the design sharp, modern, and internationally celebrated.',
    author: 'Sepideh M.',
    role: 'Creative Director',
    company: 'Doran Restaurant Group',
    location: 'Istanbul, Turkey',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    quote:
      'Working across continents was effortless. Ayshin delivered our womenswear packaging and lookbook grids on time, with an exceptional editorial eye that our Canadian clientele constantly praises.',
    author: 'Geneviève L.',
    role: 'Brand Founder',
    company: 'Orco Meson',
    location: 'Montreal, Canada',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
];
