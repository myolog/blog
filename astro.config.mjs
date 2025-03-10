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

//remark

import remarkMermaid from './plugin/remark/mermaid';
import remarkAscii from "./plugin/remark/testAscii"
import remarkAstroIcon from "./plugin/remark/astroIcon"
import remarkDirective from 'remark-directive';
import remarkPrase from "remark-parse"
import remarkCallout from "./plugin/remark/callout"
import remarkNoSvgHeadId from "./plugin/remark/remarkNoSvgHeadId"

export default defineConfig({
  site: 'https://blog.myogoo.me',
  integrations: [mdx(), sitemap(), robotsTxt(), pageInsight(), pagefind(), minify(), icon()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  markdown: {
    remarkPlugins: [
      remarkPrase,
      remarkDirective,
      remarkNoSvgHeadId,
      remarkCallout,
      remarkMermaid,
      remarkAscii,
      remarkAstroIcon
    ],
    remarkRehype: {
      allowDangerousHtml: true,
    }
  }
});