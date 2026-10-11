import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // English posts live in content/blog/, German posts in content/blog/de/ (see seo/PLAYBOOK.md)
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        date: z.string(),
        lang: z.enum(['en', 'de']).default('en'),
        // Path of the same article in the other language, e.g. /blog/de/tiktok-rezepte-speichern
        translation: z.string().optional(),
        keyword: z.string().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
      }),
    }),
  },
})
