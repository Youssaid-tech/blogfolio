import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CATEGORY_IDS = [
  'rhcsa',
  'kubernetes',
  'azure',
  'iac',
  'configuration-management',
  'monitoring-observability',
] as const;

const blog = defineCollection({
  // Markdown lives in src/content/blog/<category>/<post>.md
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORY_IDS),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
