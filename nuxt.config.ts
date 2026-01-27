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
  ssr: false,
  hooks: {
    'prerender:routes'({ routes }) {
      routes.clear() // don't generate route HTML snapshots
    }
  },
  app: {
    baseURL: '/',
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
})