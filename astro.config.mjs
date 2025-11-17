// @ts-check
import {defineConfig} from 'astro/config';
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
import remarkCallout from "./plugin/remark/callout"
import remarkDirective from 'remark-directive';
import remarkPrase from "remark-parse"
import remarkEmoji from "remark-emoji"

//rehype
import rehypeMermaid from 'rehype-mermaid';
import tailwindcss from "@tailwindcss/vite";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
///@ts-ignore
const resolveFromBlog = (p) => path.resolve(__dirname, p);

export default defineConfig({
    site: 'https://blog.myogoo.me',
    integrations: [mdx(), sitemap(), robotsTxt(), pageInsight(), pagefind(), minify(), icon()],
    adapter: cloudflare({
        platformProxy: {
            enabled: true
        }
    }),

    vite: {
        plugins: [tailwindcss()],
        ssr: {
            noExternal: ["@myolog/components", "@myolog/layouts", "@myolog/libs"],
        },
        server: {
            fs: {
                allow: [
                    resolveFromBlog('..'),
                    resolveFromBlog('../components'),
                    resolveFromBlog('../layouts'),
                    resolveFromBlog('../markdown'),
                    resolveFromBlog('../libs')
                ]
            }
        },
        // node_modules 링크 대신 실제 소스 경로를 보도록 alias
        resolve: {
            alias: {
                '@myolog/components': resolveFromBlog('../components'),
                '@myolog/layouts': resolveFromBlog('../layouts'),
                '@myolog/markdown': resolveFromBlog('../markdown'),
                '@myolog/libs': resolveFromBlog('../libs'),
            }
        }
    },

    markdown: {
        remarkPlugins: [
            remarkPrase,
            remarkDirective,
            remarkCallout,
            remarkMermaid,
            remarkEmoji
        ],
        remarkRehype: {
            allowDangerousHtml: true,
        },
        syntaxHighlight: {
            excludeLangs: ['mermaid', 'math'],
        },
        rehypePlugins: [
            [rehypeMermaid, {strategy: 'img-svg'}]
        ]
    }
});