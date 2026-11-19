/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        'surface-elevated': 'var(--bg-surface-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent-sage': 'var(--accent-sage)',
        'accent-velvet': 'var(--accent-velvet)',
        'border-hairline': 'var(--border-hairline)',
        'border-hairline-bright': 'var(--border-hairline-bright)',
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.25em',
      },
      boxShadow: {
        'glow-sage': '0 0 25px -5px rgba(139, 161, 147, 0.25)',
        'glow-velvet': '0 0 35px -5px rgba(124, 62, 68, 0.3)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
