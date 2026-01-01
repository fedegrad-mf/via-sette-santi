/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      // Note: With Tailwind v4, most theme configuration is done in CSS @theme
      // This config file is primarily for content paths and plugins
      // Custom fonts are defined in src/styles/global.css using CSS variables
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
