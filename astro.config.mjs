// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import minify from 'astro-minify-html-swc';
import cloudflare from '@astrojs/cloudflare';
import robotsTxt from 'astro-robots-txt';

import pageInsight from 'astro-page-insight';
import pagefind from 'astro-pagefind';
import icon from 'astro-icon';
// https://astro.build/config
export default defineConfig({
  site: 'https://blog.myogoo.me',
  integrations: [mdx(), sitemap(), robotsTxt(), pageInsight(), pagefind(), minify(), icon()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
});