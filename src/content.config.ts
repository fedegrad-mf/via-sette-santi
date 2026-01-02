import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

/** https://docs.astro.build/en/recipes/i18n/#use-collections-for-translated-content */

const trailsCollection = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: z.object({
    order: z.number(),
    name: z.string(),
    church: z.string(),
    location: z.string(),
    description: z.string(),
    history: z.string(),
    feastDay: z.string().optional(),
    image: z.string().optional(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }).optional(),
    date: z.date()
  })
});

const hostsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['hotel', 'bnb', 'agriturismo', 'hostel', 'rifugio']),
    description: z.string(),
    services: z.array(z.enum(['restaurant', 'bar', 'rooms', 'parking', 'wifi', 'pool', 'spa', 'breakfast', 'dinner', 'packed-lunch', 'laundry', 'bike-rental', 'transfer', 'pets'])),
    location: z.string(),
    address: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    website: z.string().optional(),
    email: z.string().optional(),
    phone: z.string(),
    social: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      tripadvisor: z.string().optional()
    }).optional(),
    image: z.string().optional(),
    priceRange: z.enum(['budget', 'moderate', 'premium']).optional(),
    featured: z.boolean().default(false),
    date: z.date()
  })
});

export const collections = {
  'trails': trailsCollection,
  'saints': saintsCollection,
  'hosts': hostsCollection
};