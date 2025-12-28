// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { languages } from './src/i18n/languages';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales : Object.keys(languages),
    routing: {
      prefixDefaultLocale: true, // Consigliato per coerenza: /it/, /en/, /es/
      fallbackType: 'rewrite'    // Se manca una traduzione, mostra quella di default senza redirect
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});