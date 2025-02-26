import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const framework_astro = defineCollection({
	loader: glob({ base: "./src/content/framework/astro", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		heroImage: z.string().optional(),
		pubDate: z.coerce.date()
	})
})



export const collections = { framework_astro };
