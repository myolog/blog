// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import robotsTxt from 'astro-robots-txt';

import pageInsight from 'astro-page-insight';
import pagefind from 'astro-pagefind';
// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), robotsTxt(), pageInsight(),pagefind()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  vite: {
    plugins: [tailwindcss()],
  },

});