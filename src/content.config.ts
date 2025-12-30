import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/** https://docs.astro.build/en/recipes/i18n/#use-collections-for-translated-content */

const trailsCollection = defineCollection({
  schema: z.object({
    number: z.number(),
    title: z.string(),
    description: z.string(),
    distance: z.string(),
    duration: z.string(),
    difficulty: z.enum(['easy', 'moderate', 'hard']),
    elevation: z.string(),
    startPoint: z.string(),
    endPoint: z.string(),
    highlights: z.array(z.string()),
    image: z.string().optional(),
    date: z.date()
  })
});

const saintsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    church: z.string(),
    location: z.string(),
    description: z.string(),
    history: z.string(),
    feastDay: z.string().optional(),
    image: z.string().optional(),
    date: z.date()
  })
});

export const collections = {
  'trails': trailsCollection,
  'saints': saintsCollection
};