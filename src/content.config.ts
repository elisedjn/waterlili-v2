import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { artworkTagIds } from "./config/artwork-tags";
import { printFormatIds } from "./config/print-formats";
import { workshopLocations } from "./config/locations";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    lang: z.enum(["en", "fr", "pt"]),
    slug: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

const workshops = defineCollection({
  loader: glob({ base: "./src/content/workshops", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["en", "fr", "pt"]),
    location: z.enum(workshopLocations),
    slug: z.string(),
    startDate: z.coerce.date().optional(),
    // Last day of a recurring workshop (e.g. "every Sunday"). Without it, the workshop stops showing after startDate.
    endDate: z.coerce.date().optional(),
    date: z.string().default("Date to be announced"),
    time: z.string().optional(),
    duration: z.string().optional(),
    durationDetails: z.string().optional(),
    price: z.string().optional(),
    priceDetails: z.string().optional(),
    place: z.string().optional(),
    address: z.string().optional(),
    bookingUrl: z.string().optional(),
    bookingMessage: z.string().optional(),
    images: z.array(z.string()).min(1),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

const localizedText = z.object({ en: z.string(), fr: z.string(), pt: z.string() });

const artworks = defineCollection({
  loader: glob({ base: "./src/content/artworks", pattern: "*.yaml" }),
  schema: z.object({
    title: localizedText,
    // Plain description of the picture: image alt text (accessibility) and SEO meta description.
    alt: localizedText,
    // Story shown on the artwork page.
    description: localizedText,
    formats: z.array(z.enum(printFormatIds)).min(1),
    // Themes used for the filters on the shop page (see src/config/artwork-tags.ts).
    tags: z.array(z.enum(artworkTagIds)).default([]),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, workshops, artworks };
