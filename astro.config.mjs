// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { defaultLang, languages } from './src/i18n/languages';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // site: 'https://fedegrad-asso360.github.io',
  // base: 'via-sette-santi',
  site: process.env.SITE || undefined,
  base: process.env.BASE || undefined,

  i18n: {
    defaultLocale: 'en',
    locales: Object.keys(languages),
    routing: {
      prefixDefaultLocale: true, // Consigliato per coerenza: /it/, /en/, /es/
      fallbackType: 'rewrite'    // Se manca una traduzione, mostra quella di default senza redirect
    }
  },

  vite: {
    logLevel: 'info',

    plugins: [tailwindcss()]
  },

  integrations: [sitemap({
    i18n: {
      defaultLocale: defaultLang,
      // map a dictionary of language like { en: 'en-GB', it: 'it-IT', ecc.}
      locales: Object.fromEntries(
        Object.entries(languages).map(([langKey, langObj]) => [
          langKey,
          langObj.locale,
        ])
      )
    },
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date('2025-12-30T00:00:00Z'),
    filter: (page) => !['/'].includes(page) // exclude homepage redirect
  })]
});