import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/** https://docs.astro.build/en/recipes/i18n/#use-collections-for-translated-content */

const trailsCollection = defineCollection({
  schema: z.object({
    number: z.number(),
    title: z.string(),
    date: z.date()
  })
});

export const collections = {
  'trails': trailsCollection
};