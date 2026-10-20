// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/hints',
    '@nuxt/eslint',
    '@nuxt/a11y',
    '@nuxt/icon',
  ],
  runtimeConfig: {
    public: {
      siteUrl: 'https://talantiq.com',
      // Overridable at build time with NUXT_PUBLIC_API_BASE / NUXT_PUBLIC_TURNSTILE_SITE_KEY
      apiBase: 'https://eatplan-backend-607107386172.us-central1.run.app',
      turnstileSiteKey: '',
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sapid', '/sapid/recipe-extractor', '/blog', '/blog/de', '/privacy', '/terms', '/delete', '/contact', '/services', '/s', '/j', '/sitemap.xml', '/recipes/garlic-butter-seafood-pasta']
    }
  },
  app: {
    baseURL: '/',
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
})
