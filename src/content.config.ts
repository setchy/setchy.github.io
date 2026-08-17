import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    permalink: z.string(),
    cover: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { sections };
