import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    tldr: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    sourceUrl: z.string().url().optional(),
  }),
});

export const collections = { posts };
